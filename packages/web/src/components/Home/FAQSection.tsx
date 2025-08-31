'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is Pentara?",
      answer: "Pentara is a private self-coaching app with five 'inspired-by' voices. We do a one-time 45-minute onboarding to tailor the council to you. After that, it's your private space. Not therapy."
    },
    {
      question: "How does the onboarding work?",
      answer: "During your 45-minute session, a coach will help you identify your values, inspirations, and create five tailored voices for your personal council. We'll craft your Personal Manual and five voices together."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. All conversations stay on your device. We never store chat logs on our servers. Your personal council is encrypted and private to you."
    },
    {
      question: "What's the difference between Pentara and therapy?",
      answer: "Pentara offers reflective guidance, not medical or mental-health treatment. This is a self-coaching tool designed to help you gain clarity and perspective through conversation with your personal council."
    },
    {
      question: "How much does Pentara cost?",
      answer: "There's a one-time $150 fee for the 45-minute onboarding session. After that, the app is completely free to use. No subscriptions or ongoing fees."
    },
    {
      question: "Can I change my voices after onboarding?",
      answer: "Yes! You can request voice changes by booking a tune-up session with your coach. We'll help you adjust your council as your needs evolve."
    },
    {
      question: "What if I'm in crisis?",
      answer: "Pentara is not a crisis intervention tool. If you're in crisis, please contact a mental health professional or use the crisis resources available in the app."
    },
    {
      question: "How do I get started?",
      answer: "Simply book your 45-minute onboarding session through Calendly. After the session, you'll receive an activation code to download the app and start using your personal council."
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
        </div>
      </div>
    </section>
  );
}
