export default function NotTherapySection() {
  return (
    <section className="section-padding bg-[#0a0a0a] py-32 stacked-panel panel-reveal stacked-3d" data-panel="4">
      <div className="container-max sticky-panel">
        <div className="max-w-4xl mx-auto">
          {/* Value Proposition Statement */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="text-[120px] font-light text-[#D4AF37] leading-none">04</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-8 tracking-widest">
              Curated for Discerning Individuals
            </h2>
            <p className="text-xl text-white font-light tracking-wide leading-relaxed max-w-3xl mx-auto">
              Who demand excellence in personal development and strategic life design.
            </p>
          </div>

          {/* Key Features - Left Aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="relative">
              {/* Vertical gold bar */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#D4AF37]"></div>
              
              <div className="pl-8">
                <h3 className="text-2xl font-serif font-light text-white mb-6 tracking-widest">
                  What Pentara Provides
                </h3>
                <div className="space-y-4 text-white font-light tracking-wide">
                  <div>
                    <p className="text-[#D4AF37] font-medium mb-2">Elite Reflective Guidance</p>
                    <p className="text-white/80">Five master-crafted perspectives for sophisticated thinking</p>
                  </div>
                  <div>
                    <p className="text-[#D4AF37] font-medium mb-2">Exclusive Personal Council</p>
                    <p className="text-white/80">Bespoke perspectives inspired by your unique values and aspirations</p>
                  </div>
                  <div>
                    <p className="text-[#D4AF37] font-medium mb-2">Strategic Life Design</p>
                    <p className="text-white/80">Sophisticated frameworks for high-achieving individuals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Vertical gold bar */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#D4AF37]"></div>
              
              <div className="pl-8">
                <h3 className="text-2xl font-serif font-light text-white mb-6 tracking-widest">
                  Our Approach
                </h3>
                <div className="space-y-4 text-white font-light tracking-wide">
                  <div>
                    <p className="text-[#D4AF37] font-medium mb-2">Not Medical Treatment</p>
                    <p className="text-white/80">We focus on strategic personal development, not healthcare</p>
                  </div>
                  <div>
                    <p className="text-[#D4AF37] font-medium mb-2">Not Professional Therapy</p>
                    <p className="text-white/80">Our guidance is for high-achievers seeking excellence</p>
                  </div>
                  <div>
                    <p className="text-[#D4AF37] font-medium mb-2">Not Crisis Intervention</p>
                    <p className="text-white/80">Contact mental health professionals for crisis support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Resources - Minimal */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-transparent border border-[#E5E4E2]/20 rounded-full backdrop-blur-luxury shadow-luxury-sm">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
              <span className="text-white/70 text-sm font-light tracking-wide">
                In crisis? Contact a mental health professional immediately or call 
                <a href="tel:988" className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors ml-1">988</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
