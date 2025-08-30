import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <nav className="container-max section-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-serif font-semibold text-secondary-900">
              Pentara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#how-it-works" 
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              How it works
            </Link>
            <Link 
              href="#faq" 
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              FAQ
            </Link>
            <Link 
              href="/privacy" 
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              Privacy
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book onboarding
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
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
          <div className="md:hidden mt-4 py-4 border-t border-secondary-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="#how-it-works" 
                className="text-secondary-600 hover:text-secondary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it works
              </Link>
              <Link 
                href="#faq" 
                className="text-secondary-600 hover:text-secondary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/privacy" 
                className="text-secondary-600 hover:text-secondary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </Link>
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                Book onboarding
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
