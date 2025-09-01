export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Begin Your Initiation",
      description: "Sacred consultation to understand your journey and reveal your council.",
      price: "$299",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      number: "02", 
      title: "Your Council is Revealed",
      description: "Five archetypes emerge, calibrated to your essence and ready to guide.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      number: "03",
      title: "Receive Ongoing Wisdom",
      description: "Daily guidance, weekly insights, and monthly rituals that evolve with you.",
      price: "$15/mo",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-[#0a0a0a] py-32 stacked-panel panel-reveal stacked-3d" data-panel="3">
      <div className="container-max sticky-panel">
        {/* Section Header */}
        <div className="text-left mb-20">
          <div className="mb-8">
            <span className="text-[120px] font-light text-[#D4AF37] leading-none">03</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 tracking-widest">
            Your Ritual Journey
          </h2>
          <p className="text-xl text-white max-w-2xl font-light tracking-wide">
            Three simple steps to get your trusted advisory council.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Vertical gold bar */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#D4AF37]"></div>
              
              <div className="relative pl-8">
                {/* Step number */}
                <div className="text-[#D4AF37] text-4xl font-light mb-6 tracking-widest">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-[#D4AF37] mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif font-light text-white mb-4 tracking-wide">
                  {step.title}
                  {step.price && (
                    <span className="text-[#D4AF37] font-light ml-2">({step.price})</span>
                  )}
                </h3>
                <p className="text-white mb-8 leading-relaxed font-light tracking-wide">
                  {step.description}
                </p>

                {/* CTA for step 1 */}
                {step.number === "01" && (
                  <div className="flex items-center">
                    <a
                      href="https://calendly.com/optimaldev/pentara-onboarding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center shadow-champagne-lg hover:shadow-champagne-xl transition-all duration-300 transform hover:scale-[1.02] font-medium tracking-wider"
                    >
                      <span className="font-medium tracking-wider">Begin Your Initiation</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Learn More link */}
        <div className="text-left mt-20">
          <a href="#faq" className="text-[#D4AF37] hover:text-[#B8941F] font-light transition-colors border-b border-[#D4AF37]/30 hover:border-[#D4AF37] tracking-wide">
            Learn more about the process →
          </a>
        </div>
      </div>
    </section>
  );
}
