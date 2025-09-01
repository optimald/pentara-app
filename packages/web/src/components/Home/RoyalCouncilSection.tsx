export default function RoyalCouncilSection() {
  return (
    <section id="royal-council" className="section-padding bg-[#0a0a0a] py-32 stacked-panel panel-reveal stacked-3d" data-panel="2">
      <div className="container-max sticky-panel">
        {/* Section Header */}
        <div className="text-left mb-20">
          <div className="mb-8">
            <span className="text-[120px] font-light text-[#D4AF37] leading-none">02</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 tracking-widest">
            Your Personal Support Circle
          </h2>
          <p className="text-xl text-white max-w-2xl font-light tracking-wide">
            Five compassionate experts who never judge, never get tired of listening, and never share your secrets.
          </p>
        </div>

        {/* Lonely Road - Left Aligned */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-96 rounded-xl overflow-hidden border border-[#E5E4E2]/30 shadow-luxury-lg">
                <img 
                  src="/lonely-road.jpeg" 
                  alt="Person walking alone on a dark road" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-serif font-light text-white mb-6 tracking-widest">
                The Higher You Rise, The Fewer Understand
              </h3>
              <p className="text-lg text-white leading-relaxed mb-6 font-light tracking-wide">
                Strategic decisions carry weight your inner circle can't grasp. Traditional advisors understand frameworks, not the nuanced reality of your position. You need perspectives that operate at your altitude.
              </p>
              <p className="text-lg text-[#D4AF37] font-light italic tracking-wide">
                What if you didn't have to choose between understanding and discretion?
              </p>
            </div>
          </div>
        </div>

        {/* The Thinker - Right Aligned */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-light text-white mb-6 tracking-widest">
                Share the Weight
              </h3>
              <p className="text-lg text-white leading-relaxed mb-6 font-light tracking-wide">
                Stop carrying complex decisions alone. Your council transforms spiraling thoughts into crystalline direction. Sophisticated minds require equally sophisticated counsel.
              </p>
              <p className="text-lg text-[#D4AF37] font-light italic tracking-wide">
                Turn contemplation into clarity.
              </p>
            </div>
            <div>
              <div className="h-96 rounded-xl overflow-hidden border border-[#E5E4E2]/30 shadow-luxury-lg">
                <img 
                  src="/thinker.jpeg" 
                  alt="The Thinker statue in contemplation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Philosophy Statement - Replaces Team Section */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-serif font-light text-white mb-8 tracking-widest leading-tight">
              We Believe in the Power of Collective Wisdom
            </h3>
            <p className="text-xl text-white leading-relaxed font-light tracking-wide" style={{ lineHeight: '1.8' }}>
              Every individual carries within them the seeds of greatness, but the path to realizing that potential 
              is often obscured by doubt, confusion, and the weight of isolation. Our philosophy is simple: 
              when you have access to the right experts at the right time, transformation becomes not just possible, 
              but inevitable. We don't create solutions—we reveal the wisdom that was always there, waiting to be heard.
            </p>
          </div>
        </div>

        {/* Council Formation - Left Aligned */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-96 rounded-xl overflow-hidden border border-[#E5E4E2]/30 shadow-luxury-lg">
                <img 
                  src="/council-team.jpeg" 
                  alt="Council of advisors" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-serif font-light text-white mb-6 tracking-widest">
                Your Council Awaits
              </h3>
              <p className="text-lg text-white leading-relaxed mb-6 font-light tracking-wide">
                Five distinct archetypes, each calibrated to your unique journey and ready to offer 
                the precise guidance you need. From the strategic clarity of The Sage to the bold 
                action of The Warrior, your council represents the full spectrum of wisdom.
              </p>
              <p className="text-lg text-[#D4AF37] font-light italic tracking-wide">
                How this works remains our carefully guarded secret.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="https://calendly.com/optimaldev/pentara-onboarding"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xl px-20 py-6 inline-flex items-center justify-center shadow-champagne-lg hover:shadow-champagne-xl transition-all duration-300 transform hover:scale-[1.02] font-medium tracking-wider"
          >
            <span className="text-2xl font-medium tracking-widest">Begin Your Initiation ($299)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
