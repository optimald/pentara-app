export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-dark-50 via-dark-100 to-dark-50 section-padding py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-dark-800 mb-6 animate-fade-in">
            <span className="text-gradient-gold text-glow">Five voices.</span>
            <br />
            <span className="text-gradient-gold text-glow">One circle.</span>
            <br />
            <span className="text-dark-800">Clarity on demand.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-dark-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            A coach helps you set up a personal council—five{' '}
            <em className="text-gold-400 font-medium">inspired-by</em> voices 
            tuned to your values. Not therapy; self-coaching.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Book your onboarding</span>
              <span className="text-primary-200">($150)</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-dark-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>45-minute session</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Private on your device</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Not therapy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
