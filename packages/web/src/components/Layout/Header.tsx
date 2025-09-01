export default function Header() {
  return (
    <header className="bg-transparent backdrop-blur-luxury">
      <nav className="container-max py-4">
        <div className="flex flex-col items-center">
          {/* Centered Logo */}
          <div className="mb-4">
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
          </div>

          {/* Minimal Navigation - Text Only */}
          <div className="flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="nav-link text-sm"
            >
              Initiation
            </a>
            <a 
              href="#royal-council" 
              className="nav-link text-sm"
            >
              Council
            </a>
            <a 
              href="#faq" 
              className="nav-link text-sm"
            >
              FAQ
            </a>
            <a 
              href="/privacy" 
              className="nav-link text-sm"
            >
              Privacy
            </a>
          </div>
        </div>
      </nav>
      
      {/* Thin horizontal line below header */}
      <div className="w-full h-px bg-[#333]"></div>
    </header>
  );
}
