import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'My Personal Site',
  description: 'A personal site with dark mode support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12 w-full max-w-4xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
