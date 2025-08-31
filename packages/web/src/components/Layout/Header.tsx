'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-100/80 backdrop-blur-md border-b border-dark-200">
      <nav className="container-max section-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-symbol">
              <Image
                src="/logo.jpeg"
                alt="Pentara"
                width={40}
                height={40}
                className="w-full h-full rounded-lg"
                priority
              />
            </div>
            <span className="logo-text">
              Pentara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#how-it-works" 
              className="nav-link"
            >
              How it works
            </Link>
            <Link 
              href="#faq" 
              className="nav-link"
            >
              FAQ
            </Link>
            <Link 
              href="/privacy" 
              className="nav-link"
            >
              Privacy
            </Link>
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Onboarding
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-dark-600 hover:text-gold-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-dark-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="#how-it-works" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                How it works
              </Link>
              <Link 
                href="#faq" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/privacy" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </Link>
              <a
                href="https://calendly.com/optimaldev/pentara-onboarding"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Onboarding
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
