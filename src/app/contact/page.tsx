import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Contact Me
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have a question or want to work together? Fill out the form below.
        </p>
      </section>

      <section>
        <ContactForm />
      </section>
    </div>
  );
}
