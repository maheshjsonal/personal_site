"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-nav-bg border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">PersonalSite</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors hover:no-underline">Home</Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors hover:no-underline">Blog</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors hover:no-underline">Contact</Link>
            <ThemeToggle />
          </nav>
          
          {/* Hamburger Menu Icon */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="/" className="text-base font-medium py-2 hover:text-primary hover:no-underline" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/blog" className="text-base font-medium py-2 hover:text-primary hover:no-underline" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link href="/contact" className="text-base font-medium py-2 hover:text-primary hover:no-underline" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
