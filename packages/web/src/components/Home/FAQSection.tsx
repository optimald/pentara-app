import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqs: FAQItem[] = [
    {
      question: "What is Pentara?",
      answer: "Pentara is your exclusive Personal Court of Wisdom—five sovereign advisors (The Sage, Warrior, Healer, Strategist, and Visionary) crafted by master coaches and calibrated to your unique values. This invitation-only royal council provides elite self-coaching guidance on your private device. Not therapy."
    },
    {
      question: "Who are the five sovereign advisors?",
      answer: "Your royal council consists of The Sage (ancient wisdom & reflection), The Warrior (bold action & courage), The Healer (compassion & emotional intelligence), The Strategist (logic & planning), and The Visionary (creativity & possibility). Each advisor has a distinct personality and guidance style, all tuned to your specific profile."
    },
    {
      question: "Who qualifies for Pentara?",
      answer: "Pentara is designed for accomplished individuals seeking elite-level personal development. During our private consultation, we assess your candidacy based on your commitment to growth, values alignment, and readiness for this exclusive experience."
    },
    {
      question: "What makes Pentara different from other coaching services?",
      answer: "Unlike mass-market solutions, Pentara creates your personal royal council—five distinct advisor personalities that live on your device. You can consult individual advisors or your entire council for complex decisions. Ultra-private, bespoke, and exclusively yours through a single curated onboarding."
    },
    {
      question: "How does the process work?",
      answer: "A focused 45-minute assessment determines fit for our exclusive process. Upon acceptance, master coaches craft your bespoke council of five advisors, each calibrated to your unique leadership context and decision-making style."
    },
    {
      question: "Is my data completely private and secure?",
      answer: "Absolutely. All conversations remain exclusively on your device. We never store chat logs on our servers. Your personal council is encrypted and accessible only to you—the ultimate in privacy and discretion."
    },
    {
      question: "What's the investment?",
      answer: "The assessment and council creation is $299, plus $10/month for ongoing access to your advisors. A single investment for lifetime access to your personal council of five sophisticated perspectives."
    },
    {
      question: "Can I modify my council after creation?",
      answer: "Yes. As a Pentara member, you can request refinements through private tune-up sessions with your assigned master coach. We ensure your council evolves with your growth and changing needs."
    },
    {
      question: "What if I'm experiencing a crisis?",
      answer: "Pentara is an elite self-coaching tool, not crisis intervention. If you're in crisis, please contact a mental health professional immediately or use the crisis resources available in the app."
    },
    {
      question: "How do I request access?",
      answer: "Request your private consultation through our exclusive booking system. Following your assessment, qualified candidates receive an activation code and lifetime access to their bespoke personal council."
    }
  ];

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

          {/* FAQ Items - Static version */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                <div className="px-6 pb-5">
                  <p className="text-dark-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="text-center mt-12">
            <p className="text-dark-600 mb-6">
              Ready for examination?
            </p>
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-black via-gold-600 to-black text-white text-lg px-12 py-5 inline-flex items-center space-x-3 rounded-none font-bold hover:shadow-2xl hover:shadow-gold-500/40 transition-all duration-300 transform hover:-translate-y-1 border-2 border-gold-500"
            >
              <span>Claim Your Throne</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
