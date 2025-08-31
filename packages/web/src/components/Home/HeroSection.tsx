export default function HeroSection() {
  return (
    <section className="section-padding py-20 lg:py-32 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-125 saturate-110"
        >
          <source src="/hero-background.webm" type="video/webm" />
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Background decoration (kept for extra visual depth) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Royal badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-900/30 via-gold-500/20 to-purple-900/30 border-2 border-gold-400/50 rounded-full mb-8 backdrop-blur-sm">
            <svg className="w-5 h-5 text-gold-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16L3 14l5.5-5.5L10 10l4-4 6 6-4 4-1.5-1.5L9 20l-4-4zm2.5-2.5L6 12l1.5-1.5L9 12l-1.5 1.5z"/>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-gold-300 text-sm font-semibold tracking-wide">✦ BY ROYAL INVITATION ONLY ✦</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            <span className="text-gradient-gold text-glow">Ascend to Your Throne</span>
            <br />
            <span className="text-white">of Self-Mastery</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-up drop-shadow-lg">
            Your Personal Court of Wisdom awaits—five <em className="text-gold-300 font-medium">inspired-by</em> sovereign advisors 
            crafted by master coaches to guide your royal destiny.
          </p>

          {/* 5 Voices Highlight */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-lg text-gold-200 mb-4 font-medium">
              Harness the Wisdom of Your Inner Royal Council
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 bg-slate-900/40 px-5 py-3 border border-amber-700/40 backdrop-blur-sm">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 10.28 9.69 10 9 10H4C2.9 10 2 10.9 2 12V22H4V12H9L12.5 15.5V22H14.5V14.5L12.5 12.5L15.5 9.5L18.33 12.33L19.83 10.83L21 9Z"/>
                </svg>
                <span className="text-amber-100 text-sm font-semibold tracking-wide">The Sage</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/40 px-5 py-3 border border-amber-700/40 backdrop-blur-sm">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.92 5H5L6.5 2.5L8 5H6.92ZM19 5H17.08L18.5 2.5L20 5H19ZM12 2.5L13.5 5H10.5L12 2.5ZM12 8.5C10.62 8.5 9.5 9.62 9.5 11S10.62 13.5 12 13.5 14.5 12.38 14.5 11 13.38 8.5 12 8.5ZM12 15.5C9.52 15.5 7.5 17.52 7.5 20V22H16.5V20C16.5 17.52 14.48 15.5 12 15.5Z"/>
                </svg>
                <span className="text-amber-100 text-sm font-semibold tracking-wide">The Warrior</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/40 px-5 py-3 border border-amber-700/40 backdrop-blur-sm">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
                <span className="text-amber-100 text-sm font-semibold tracking-wide">The Healer</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/40 px-5 py-3 border border-amber-700/40 backdrop-blur-sm">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>
                <span className="text-amber-100 text-sm font-semibold tracking-wide">The Strategist</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/40 px-5 py-3 border border-amber-700/40 backdrop-blur-sm">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2L13.09,8.26L22,9L14.5,15.74L17.18,22L12,18.74L6.82,22L9.5,15.74L2,9L10.91,8.26L12,2Z"/>
                </svg>
                <span className="text-amber-100 text-sm font-semibold tracking-wide">The Visionary</span>
              </div>
            </div>
          </div>

          {/* 3 Bullet Benefits */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 text-slate-200">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                <span className="text-lg font-medium">A sacred 45-minute council session designed to align your archetypes</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-200">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                <span className="text-lg font-medium">Lifetime access to your personal Royal Council</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-200">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                <span className="text-lg font-medium">Ongoing whispers of wisdom for only $10/mo</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-slate-900 via-amber-700 to-slate-900 text-white text-xl px-16 py-6 inline-flex flex-col items-center space-y-2 shadow-xl hover:shadow-amber-900/30 transition-all duration-300 transform hover:-translate-y-0.5 font-bold border border-amber-600/60 hover:border-amber-500 backdrop-blur-sm"
            >
              <span className="text-2xl font-bold tracking-wide">Claim Your Throne</span>
              <span className="text-amber-200 font-medium text-lg tracking-wide">Begin with 45-Minute Royal Onboarding ($299)</span>
            </a>
          </div>

          {/* Authority indicators */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 text-sm text-slate-300">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
              <span className="font-medium tracking-wide">Founded by former McKinsey partners</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
              <span className="font-medium tracking-wide">127 executives transformed</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
              <span className="font-medium tracking-wide">$2.3B in client value created</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
