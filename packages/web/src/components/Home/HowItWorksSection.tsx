export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Download Cursor",
      description: "Get the free AI-powered code editor that implements Vibe Code methodology. Install it on Windows, macOS, or Linux.",
      cta: "Download now",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "02", 
      title: "Open your project",
      description: "Cursor reads your entire codebase and understands your project structure, dependencies, and coding patterns.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Code through conversation",
      description: "Describe what you want in plain English and watch AI create the exact code you need. No more syntax hunting or memorization.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
            How Vibe Code works
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Three simple steps to AI-powered development
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
                      href="https://cursor.sh"
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
