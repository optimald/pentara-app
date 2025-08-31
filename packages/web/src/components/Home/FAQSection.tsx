interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {

  const faqs: FAQItem[] = [
    {
      question: "What is this?",
      answer: "Pentara creates your personal advisory council—five distinct voices that live on your device. You can consult individual advisors or your entire team for complex decisions. Ultra-private, personalized, and exclusively yours."
    },
    {
      question: "What do I get in onboarding?",
      answer: "A focused 45-minute conversation to understand your needs, followed by the creation of your personal advisory council of five voices, each tailored to your unique situation and goals."
    },
    {
      question: "What happens after?",
      answer: "You get ongoing access to your personal team of five trusted voices for just $15/month. All conversations remain exclusively on your device—we never store chat logs on our servers."
    },
    {
      question: "Is this therapy?",
      answer: "No. Pentara is a self-coaching tool, not therapy or crisis intervention. If you're in crisis, please contact a mental health professional immediately."
    },
    {
      question: "How private is this?",
      answer: "Completely private. All conversations happen on your device and are never sent to our servers. Your council and insights are yours alone—we can't access them even if we wanted to."
    },
    {
      question: "Can I change my council later?",
      answer: "Yes. Your council evolves with you. You can request adjustments during follow-up sessions to realign your advisors as your goals and needs change."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 30-day satisfaction guarantee. If Pentara isn't right for you, we'll refund your onboarding fee. Your transformation is our priority."
    }
  ];

  // Show only first 3 questions for now
  const displayedFaqs = faqs.slice(0, 3);

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-dark-100 to-dark-200 relative">
      {/* Subtle luxury texture - barely perceptible */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
              linear-gradient(45deg, transparent 49%, rgba(255, 215, 0, 0.02) 50%, transparent 51%)
            `,
            backgroundSize: '200px 200px, 300px 300px, 100px 100px'
          }}
        />
      </div>
      
      <div className="container-max relative">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-800 mb-4">
              Details
            </h2>
            <p className="text-xl text-dark-600">
              What you need to know
            </p>
          </div>

          {/* FAQ Items - Static */}
          <div className="space-y-4">
            {displayedFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-dark-200 border border-dark-300 rounded-xl overflow-hidden hover:border-gold-500 transition-colors"
              >
                <div className="w-full px-6 py-5 text-left flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-dark-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-dark-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="px-6 pb-5 border-t border-dark-300">
                  <p className="text-dark-600 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View More Hint */}
          <div className="text-center mt-8">
            <p className="text-dark-500 text-sm">
              Learn more about your council during your onboarding session
            </p>
          </div>

          {/* Enhanced CTA with Seductress Guide */}
          <div className="text-center mt-12">
            <div className="max-w-4xl mx-auto">
              {/* Seductress Guide Image - Full Impact */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-64 h-80 rounded-lg overflow-hidden border-2 border-amber-600/40 shadow-2xl shadow-amber-500/20">
                  <img 
                    src="/seductress-guide.jpeg" 
                    alt="Your Guide to the Council" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                    <p className="text-amber-200 text-sm font-medium text-center">
                      ✦ Your Personal Guide to the Council ✦
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Human Connection Narrative */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-serif font-bold text-amber-300 mb-2">
                  ✦ Meet Your Personal Guide ✦
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Your 45-minute onboarding session is led by an experienced facilitator who will help you 
                  discover your unique council of five archetypes. This personal consultation ensures your 
                  council is perfectly calibrated to your journey.
                </p>
              </div>
              
              {/* Enhanced CTA Button */}
              <div className="flex justify-center">
                <a
                  href="https://calendly.com/optimaldev/pentara-onboarding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-slate-900 via-amber-700 to-slate-900 text-white text-lg px-16 py-6 inline-flex items-center space-x-3 font-bold hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-amber-600 group"
                >
                  <span className="text-2xl font-bold tracking-wide mr-3">Book Your Onboarding</span>
                  <span className="text-amber-200 font-normal text-lg">($299)</span>
                  <svg className="w-6 h-6 text-amber-200 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 19l-8-8z"/>
                  </svg>
                </a>
              </div>
              
              {/* Professional Assurance */}
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm">
                  <span className="text-amber-400">✦</span> Professional guidance for your transformation <span className="text-amber-400">✦</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
