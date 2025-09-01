export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center panel-3d parallax-panel stacked-panel panel-reveal stacked-3d" style={{ paddingTop: '80px', paddingBottom: '60px' }} data-depth="1" data-panel="1">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          id="hero-video"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.8] contrast-105 saturate-100"
        >
          <source src="/hero-background.webm" type="video/webm" />
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/50 to-black/70"></div>
        {/* Left side darkening gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent"></div>
        {/* Gold focal points */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#D4AF37] rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#B8941F] rounded-full blur-xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container-max relative w-full sticky-panel">
        <div className="text-left max-w-4xl">
          {/* Numerical Callout */}
          <div className="mb-6">
            <span className="text-[80px] font-light text-[#D4AF37] leading-none text-3d-gold">01</span>
          </div>

          {/* Main Headline - Sophisticated Tagline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 animate-fade-in drop-shadow-2xl tracking-widest leading-none text-3d">
            <span className="font-extralight">Curated wisdom.</span>
            <br />
            <span className="font-bold">Decisive action.</span>
            <br />
            <span className="font-light">Uncompromising results.</span>
          </h1>

          {/* Sophisticated Sub-headline */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl leading-relaxed animate-slide-up drop-shadow-lg font-light tracking-wide text-3d">
            Master-crafted perspectives for the strategically ambitious. Five distinct voices converging into singular clarity.
          </p>

          {/* 3 Hard-Hitting Benefits */}
          <div className="mb-8 animate-slide-up text-3d" style={{ animationDelay: '0.1s' }}>
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center space-x-4 text-white">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <span className="text-base font-light tracking-wide">A dedicated 45-minute initiation to establish your council</span>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <span className="text-base font-light tracking-wide">Your personal council of five trusted advisors</span>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <span className="text-base font-light tracking-wide">Ongoing wisdom whispers for just $15/month</span>
              </div>
            </div>
          </div>

          {/* Credibility Marker */}
          <div className="mb-8 animate-slide-up text-3d" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center px-6 py-3 bg-transparent border border-[#E5E4E2]/20 rounded-full backdrop-blur-luxury shadow-luxury-sm">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
              <span className="text-white/70 text-sm font-light tracking-wide">Crafted by AI pioneers with deep expertise in personal development</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up text-3d" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-16 py-5 inline-flex items-center justify-center shadow-champagne-lg hover:shadow-champagne-xl transition-all duration-300 transform hover:scale-[1.02] font-medium tracking-wider"
            >
              <span className="text-xl font-medium tracking-widest">Begin Your Initiation ($299)</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Video Enhancement Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const video = document.getElementById('hero-video');
              if (video) {
                // Wait for video to be ready
                video.addEventListener('loadedmetadata', function() {
                  // Speed up video to 0.5x speed
                  video.playbackRate = 0.5;
                  
                  // Handle reverse loop when video ends
                  const handleVideoEnd = function() {
                    video.currentTime = video.duration;
                    video.playbackRate = -0.5; // Play in reverse
                    video.play();
                    
                    // When reverse playback ends, reset to normal forward playback
                    const handleReverseEnd = function() {
                      video.currentTime = 0;
                      video.playbackRate = 0.5;
                      video.play();
                    };
                    
                    video.addEventListener('ended', handleReverseEnd, { once: true });
                  };
                  
                  video.addEventListener('ended', handleVideoEnd);
                });
              }
            })();
          `
        }}
      />
    </section>
  );
}
