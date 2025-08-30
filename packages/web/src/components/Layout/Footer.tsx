import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-serif font-semibold">Pentara</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Five voices. One circle. Clarity on demand. A private self-coaching app 
              with five "inspired-by" voices tuned to your values.
            </p>
            <p className="text-sm text-secondary-400">
              Not therapy. Self-coaching tool.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-secondary-300">
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Book onboarding
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-secondary-300">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/crisis-resources" className="hover:text-white transition-colors">
                  Crisis Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-secondary-400 text-sm">
              © 2024 Pentara. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/pentaraapp"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <p className="text-secondary-400 text-sm">
                Made with care for your privacy and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
