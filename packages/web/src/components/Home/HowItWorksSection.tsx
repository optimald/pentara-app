export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Begin Your Initiation ($299)",
      description: "Sacred consultation to understand your journey and reveal your council.",
      cta: "Begin Your Initiation ($299)",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    },
    {
      number: "2", 
      title: "Your Council is Revealed",
      description: "Five archetypes emerge, calibrated to your essence and ready to guide.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-3c0-1.1.9-2 2-2h2V7H9.5C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4h5c.83 0 1.5.67 1.5 1.5S15.33 7 14.5 7H13v2h2c1.1 0 2 .9 2 2v3h3v4H4z"/>
        </svg>
      )
    },
    {
      number: "3",
      title: "Receive Ongoing Wisdom ($10/mo)",
      description: "Daily guidance, weekly insights, and monthly rituals that evolve with you.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-dark-100">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Three simple steps to get your trusted advisory council.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gold-200 to-transparent transform translate-x-6 -translate-y-1/2 z-0" />
              )}
              
              <div className="relative bg-gradient-to-b from-purple-900/20 to-dark-200 p-8 rounded-2xl border-2 border-gold-500/30 hover:border-gold-400 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/20 backdrop-blur-sm">
                {/* Ornate border decoration */}
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-gold-500/20 via-purple-500/20 to-gold-500/20 rounded-2xl -z-10"></div>
                
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-800 via-gold-500 to-purple-800 text-white font-bold text-xl rounded-full mb-6 border-2 border-gold-400 shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-gold-400 mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-dark-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-dark-600 mb-6 leading-relaxed font-medium">
                  {step.description}
                </p>

                {/* CTA for step 1 */}
                {step.cta && (
                  <div className="flex items-center justify-center">
                    <a
                      href="https://calendly.com/optimaldev/pentara-onboarding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-slate-900 via-amber-700 to-slate-900 text-white px-6 py-2 font-bold border border-amber-600/60 hover:border-amber-500 transition-all duration-300"
                    >
                      {step.cta}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Learn More link */}
        <div className="text-center mt-12">
          <a href="#faq" className="text-gold-500 hover:text-gold-400 font-medium transition-colors border-b border-gold-500/30 hover:border-gold-400">
            Questions? Read the details below.
          </a>
        </div>
      </div>
    </section>
  );
}
