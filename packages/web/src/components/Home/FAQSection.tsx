import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What exactly is Pentara?",
      answer: "Pentara is a self-coaching app that gives you access to five AI voices inspired by figures you admire. After a personalized onboarding session, you'll have a private council of voices tuned to your values and goals. It's not therapy—it's a tool for reflection, decision-making, and personal growth."
    },
    {
      question: "How does the onboarding work?",
      answer: "You'll book a 45-minute session with a trained coach who guides you through a comprehensive questionnaire. Together, you'll identify your values, inspirations, and goals to create your Personal Manual and configure five unique voices. After the session, you'll receive your activation code and Personal Manual PDF."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. Your conversations with the voices are stored only on your device—never on our servers. After your onboarding, even your coach cannot access your future conversations. We built Pentara with privacy as the foundation."
    },
    {
      question: "What's the difference between this and therapy?",
      answer: "Pentara is a self-coaching tool, not therapy. It's designed for reflection, decision-making, and gaining perspective on everyday challenges. If you're dealing with mental health issues, trauma, or crisis situations, please seek professional help from a licensed therapist or counselor."
    },
    {
      question: "How much does it cost?",
      answer: "There's a one-time $150 fee for the personalized onboarding session. After that, the app is completely free to use—no subscriptions, no in-app purchases. You own your council of voices."
    },
    {
      question: "Can I change my voices later?",
      answer: "Yes! If you want to swap out a voice or adjust your council, you can request changes through the app. This will connect you back with a coach to make the adjustments you need."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We want you to love your personal council. If you're not satisfied after your onboarding session, we'll work with you to refine your voices or provide a refund. Your growth and satisfaction are our priority."
    },
    {
      question: "How do I get started?",
      answer: "Simply book your onboarding session using the calendar link on this page. You'll receive a confirmation email with everything you need to prepare for your session. The whole process takes about 45 minutes, and you'll leave with your activation code ready to use."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-secondary-600">
              Everything you need to know about Pentara
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-secondary-200 rounded-xl overflow-hidden hover:border-primary-200 transition-colors"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-secondary-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-secondary-500 transition-transform duration-200 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
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
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-secondary-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-secondary-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book your onboarding session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
