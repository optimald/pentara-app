export default function NotTherapySection() {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          {/* Main disclaimer */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-secondary-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary-900 mb-4">
                  Not therapy
                </h2>
                <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
                  Pentara offers reflective guidance, not medical or mental-health treatment. 
                  This is a self-coaching tool designed to help you think through decisions 
                  and gain clarity on your path forward.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">
                    If you're in crisis or experiencing thoughts of self-harm, 
                    please reach out for professional help immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis resources */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-3">
                Crisis Support (US)
              </h3>
              <div className="space-y-2 text-secondary-700">
                <div>
                  <strong>988 Suicide & Crisis Lifeline</strong>
                  <br />
                  <a href="tel:988" className="text-primary-600 hover:text-primary-700">
                    Call or text 988
                  </a>
                </div>
                <div>
                  <strong>Crisis Text Line</strong>
                  <br />
                  <a href="sms:741741" className="text-primary-600 hover:text-primary-700">
                    Text HOME to 741741
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-3">
                What Pentara is for
              </h3>
              <ul className="space-y-2 text-secondary-700">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Decision-making support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Perspective and clarity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Goal setting and planning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Self-reflection and growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
