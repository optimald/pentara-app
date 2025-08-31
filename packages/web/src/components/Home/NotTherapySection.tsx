export default function NotTherapySection() {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          {/* Main disclaimer */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-secondary-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary-900 mb-4">
                  Why Vibe Code is different
                </h2>
                <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
                  Vibe Code isn't just another AI coding tool—it's a revolutionary approach that understands your entire project context, 
                  your coding style, and your intent. It's like having a senior developer beside you who actually gets your codebase.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Vibe Code goes beyond simple code completion to create solutions that actually fit your project's architecture and style.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-3">
                What makes Vibe Code special
              </h3>
              <div className="space-y-2 text-secondary-700">
                <div>
                  <strong>Context-aware AI</strong>
                  <br />
                  <span>Reads your entire codebase to understand your project</span>
                </div>
                <div>
                  <strong>Intent-based coding</strong>
                  <br />
                  <span>Understands what you want, not just what you type</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-3">
                What Vibe Code delivers
              </h3>
              <ul className="space-y-2 text-secondary-700">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Code that fits your architecture</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Natural language to code conversion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Project-specific suggestions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Faster development cycles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
