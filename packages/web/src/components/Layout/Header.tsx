export default function Header() {
  return (
    <header className="bg-dark-100/80 backdrop-blur-md border-b border-dark-200">
      <nav className="container-max section-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="logo">
            <div className="logo-symbol">
              <img
                src="/logo.jpeg"
                alt="Pentara"
                width={40}
                height={40}
                className="w-full h-full rounded-lg"
              />
            </div>
            <span className="logo-text">
              Pentara
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="nav-link"
            >
              How it works
            </a>
            <a 
              href="#faq" 
              className="nav-link"
            >
              FAQ
            </a>
            <a 
              href="/privacy" 
              className="nav-link"
            >
              Privacy
            </a>
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Onboarding
            </a>
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden p-2 text-dark-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}
