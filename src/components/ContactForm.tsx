"use client";
import { useState } from 'react';
import { sendEmailAction } from '@/app/actions/sendEmail';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleAction(formData: FormData) {
    setStatus('loading');
    setMessage('');
    
    // Call our Server Action
    const response = await sendEmailAction(formData);
    
    if (response?.error) {
      setStatus('error');
      setMessage(response.error);
    } else {
      setStatus('success');
      setMessage('Your message has been sent successfully!');
    }
  }

  return (
    <form action={handleAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          required 
          className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:outline-none dark:text-white" 
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:outline-none dark:text-white" 
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          required 
          className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:outline-none resize-y dark:text-white" 
          placeholder="What would you like to say?"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading' || status === 'success'}
        className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors shadow-sm"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {message && (
        <div className={`mt-4 p-4 rounded-md text-sm border ${
          status === 'error' 
            ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50' 
            : 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}
