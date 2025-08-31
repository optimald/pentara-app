export default function NotTherapySection() {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          {/* Main disclaimer */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-secondary-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary-900 mb-4">
                  Not therapy
                </h2>
                <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
                  Pentara offers reflective guidance, not medical or mental-health treatment. This is a self-coaching tool designed to help you gain clarity and perspective through conversation with your personal council.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 font-medium">
                    If you're in crisis, please use the crisis resources available in the app or contact a mental health professional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-3">
                What Pentara provides
              </h3>
              <div className="space-y-2 text-secondary-700">
                <div>
                  <strong>Reflective guidance</strong>
                  <br />
                  <span>Five perspectives to help you think through challenges</span>
                </div>
                <div>
                  <strong>Personal council</strong>
                  <br />
                  <span>Tailored voices inspired by your values and inspirations</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-3">
                What Pentara is not
              </h3>
              <ul className="space-y-2 text-secondary-700">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Medical or mental health treatment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Professional therapy or counseling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Diagnosis or medical advice</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Emergency crisis intervention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
