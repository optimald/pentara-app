export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Book a 45-minute onboarding",
      description: "Schedule your personalized session with a coach. We'll craft your Personal Manual and five voices together.",
      cta: "Book now",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "02", 
      title: "We craft your Personal Manual and five voices together",
      description: "During the session, we'll identify your values, inspirations, and create five tailored voices for your personal council.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Use Pentara anytime. Private, on your device.",
      description: "After activation, you'll have your own private council of five voices. All conversations stay on your device.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Three simple steps to your personal council
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent transform translate-x-6 -translate-y-1/2 z-0" />
              )}
              
              <div className="relative bg-white p-8 rounded-2xl border border-secondary-100 hover:border-primary-200 transition-all duration-300 hover:shadow-lg">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-primary-600 mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* CTA for step 1 */}
                {step.cta && (
                  <div className="flex items-center justify-center">
                    <a
                      href="https://calendly.com/optimaldev/pentara-onboarding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      {step.cta}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
