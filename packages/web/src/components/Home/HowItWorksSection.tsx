export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Book a 45-minute onboarding",
      description: "Schedule your personalized session with a trained coach who will guide you through our comprehensive questionnaire.",
      price: "$150",
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
      description: "During the session, we'll create your unique profile with five carefully selected voices that reflect your values and goals.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Use Pentara anytime. Private, on your device.",
      description: "Download the app, activate with your code, and start conversations with your personal council whenever you need guidance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
            Three simple steps to your personal council of voices
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
                  <div className="flex items-center justify-between">
                    <a
                      href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      {step.cta}
                    </a>
                    {step.price && (
                      <span className="text-lg font-semibold text-primary-600">
                        {step.price}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-secondary-600 mb-6">
            Ready to build your personal council?
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-3"
          >
            Schedule your onboarding
          </a>
        </div>
      </div>
    </section>
  );
}
