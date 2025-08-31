export default function HowItWorksSection() {
  const steps = [
    {
      number: "I",
      title: "The Assessment",
      description: "A focused 45-minute consultation to understand your leadership context and determine fit for our exclusive process.",
      cta: "Request Assessment",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      number: "II", 
      title: "The Crafting",
      description: "Master coaches create your bespoke council—five distinct advisors calibrated to your values, goals, and decision-making style.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L9 9l-8 0 6.5 4.7L5 22l7-5.2L19 22l-2.5-8.3L23 9l-8 0L12 1z"/>
        </svg>
      )
    },
    {
      number: "III",
      title: "The Council",
      description: "Your personal advisory council is delivered to your device. Five sophisticated perspectives, available whenever you need clarity.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 14l5.5-5.5L10 10l4-4 6 6-4 4-1.5-1.5L9 20l-4-4zm2.5-2.5L6 12l1.5-1.5L9 12l-1.5 1.5z"/>
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
            The Process
          </h2>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Three steps to your personal council of advisors.
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
                      className="btn-primary text-sm px-6 py-2"
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
