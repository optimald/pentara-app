export default function HeroSection() {
  return (
    <section className="section-padding py-12 lg:py-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          id="hero-video"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-105 saturate-100"
        >
          <source src="/hero-background.webm" type="video/webm" />
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay so video is more visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/75"></div>
      </div>

      {/* Background decoration (kept for extra visual depth) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max relative w-full">
        <div className="text-center max-w-4xl mx-auto">
                     {/* Exclusive badge */}
           <div className="inline-flex items-center px-6 py-3 bg-slate-900/80 border border-slate-700/60 rounded-full mb-8 backdrop-blur-sm">
             <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
             <span className="text-slate-200 text-sm font-medium tracking-wide">Invitation Only</span>
           </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            <span className="text-gradient-gold text-glow">Your Trusted</span>
            <br />
            <span className="text-white">Advisory Council</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up drop-shadow-lg">
            Years of wisdom from your dream team, available whenever you need them. 
            Five distinct perspectives that merge into one clear directive.
          </p>

          {/* 3 Hard-Hitting Benefits */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-center space-x-3 text-slate-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-lg font-medium">A dedicated 45-minute initiation to establish your council</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-slate-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-lg font-medium">Your personal council of five trusted advisors</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-slate-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-lg font-medium">Ongoing wisdom whispers for just $15/month</span>
              </div>
            </div>
          </div>

          {/* Credibility Marker */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/60 border border-slate-700/40 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-slate-300 text-sm font-medium">Crafted by AI pioneers with deep expertise in personal development</span>
            </div>
          </div>



          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-slate-900 via-amber-700 to-slate-900 text-white text-xl px-16 py-6 inline-flex items-center justify-center shadow-xl hover:shadow-amber-900/30 transition-all duration-300 transform hover:-translate-y-0.5 font-bold border border-amber-600/60 hover:border-amber-500 backdrop-blur-sm"
            >
              <span className="text-2xl font-bold tracking-wide">Begin Your Initiation ($299)</span>
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
                  // Slow down video to 0.1x speed
                  video.playbackRate = 0.1;
                  
                  // Handle reverse loop when video ends
                  const handleVideoEnd = function() {
                    video.currentTime = video.duration;
                    video.playbackRate = -0.1; // Play in reverse
                    video.play();
                    
                    // When reverse playback ends, reset to normal forward playback
                    const handleReverseEnd = function() {
                      video.currentTime = 0;
                      video.playbackRate = 0.1;
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
