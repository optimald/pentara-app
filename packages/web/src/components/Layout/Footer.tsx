export default function Footer() {
  return (
    <footer className="bg-dark-50 text-dark-800">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src="/logo.jpeg"
                  alt="Pentara"
                  width={32}
                  height={32}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <span className="text-xl font-serif font-semibold">Pentara</span>
            </div>
            <p className="text-dark-600 mb-4 max-w-md">
              See your path from every angle. A private self-coaching app with five 
              inspired-by perspectives tuned to your values. Not therapy.
            </p>
            <p className="text-sm text-dark-500">
              Private self-coaching tool.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-dark-800">Quick Links</h3>
            <ul className="space-y-2 text-dark-600">
              <li>
                <a href="#how-it-works" className="hover:text-gold-500 transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/optimaldev/pentara-onboarding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-500 transition-colors"
                >
                  Book Onboarding
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-dark-800">Legal</h3>
            <ul className="space-y-2 text-dark-600">
              <li>
                <a href="/privacy" className="hover:text-gold-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gold-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/crisis-resources" className="hover:text-gold-500 transition-colors">
                  Crisis Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-dark-500 text-sm">
              © 2025 Pentara. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a
                href="https://facebook.com/pentaraapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-500 hover:text-gold-500 transition-colors"
                aria-label="Visit Pentara on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <p className="text-dark-500 text-sm">
                Made with care for personal growth and clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
