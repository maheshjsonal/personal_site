"use server";
import { Resend } from 'resend';
import { z } from 'zod';

// We initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define schema to validate incoming form data (never trust client input)
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long').max(5000),
});

export async function sendEmailAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    // 1. Validate payload securely on the Server
    const validatedData = ContactSchema.safeParse(rawData);

    if (!validatedData.success) {
      // Return a human-readable error from the schema
      return {
        error: validatedData.error.issues.map(err => err.message).join(', ')
      };
    }

    const { name, email, message } = validatedData.data;

    // 2. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [process.env.CONTACT_EMAIL || 'delivered@resend.dev'],
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email, // This allows you to hit "Reply" and email the user back directly
    });

    if (error) {
      console.error('Resend Error:', error);
      return { error: 'Failed to send email. Please try again later.' };
    }

    // 3. Return success state back to client
    return { success: true };
    
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return { error: 'An unexpected error occurred while sending the email.' };
  }
}
