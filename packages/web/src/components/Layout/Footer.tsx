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

        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © 2024 Pentara. All rights reserved.
          </p>
          <p className="text-secondary-400 text-sm mt-2 md:mt-0">
            Made with care for your privacy and growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
