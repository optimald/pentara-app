export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white relative">
      {/* Subtle fade-out effect to bottom 100px */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
      
      <div className="container-max py-16">
        {/* Single line of essential links */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center space-x-8 mb-8">
            <a href="#how-it-works" className="text-white hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              Initiation
            </a>
            <a href="#royal-council" className="text-white hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              Council
            </a>
            <a href="#faq" className="text-white hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              FAQ
            </a>
            <a href="/privacy" className="text-white hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              Privacy
            </a>
            <a href="/terms" className="text-white hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              Terms
            </a>
            <a href="/crisis-resources" className="text-white hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              Crisis Resources
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-white/60 text-sm font-light tracking-wide">
            © 2025 Pentara. All rights reserved.
          </p>
          
          {/* Crisis warning */}
          <div className="mt-4 text-center">
            <p className="text-white/60 text-xs font-light tracking-wide">
              In crisis? Contact a mental health professional immediately or call 
              <a href="tel:988" className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors ml-1">988</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
