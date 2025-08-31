import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What exactly is Vibe Code?",
      answer: "Vibe Code is a revolutionary AI-powered approach to development that's changing how developers work. It's not just another coding method—it's your intelligent partnership that understands your vision, anticipates your needs, and creates code through conversation, not memorization."
    },
    {
      question: "How does Cursor implement Vibe Code?",
      answer: "Cursor is an AI-powered code editor that reads your entire codebase and suggests solutions that actually fit. It's like having a senior developer beside you—AI that understands your intent and creates the exact code you need through natural conversation."
    },
    {
      question: "Is my code private and secure?",
      answer: "Absolutely. Cursor processes your code locally and only sends necessary context to AI models for suggestions. Your intellectual property and proprietary code remain secure and private on your device."
    },
    {
      question: "What's the difference between Cursor and other AI coding tools?",
      answer: "Cursor goes beyond simple code completion. It implements Vibe Code methodology—understanding your entire project context, your coding style, and your intent. It's not just suggesting syntax, it's creating solutions that fit your specific needs and architecture."
    },
    {
      question: "How much does Cursor cost?",
      answer: "Cursor is completely free to use! There are no subscriptions, no in-app purchases, and no hidden fees. You get the full AI-powered development experience with Vibe Code methodology at no cost."
    },
    {
      question: "Can I use Cursor with my existing projects?",
      answer: "Yes! Cursor works seamlessly with your existing codebase. It reads and understands your project structure, dependencies, and coding patterns to provide contextually relevant suggestions that fit your project's architecture."
    },
    {
      question: "What programming languages does Cursor support?",
      answer: "Cursor supports all major programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, and many more. The AI understands the syntax and best practices for each language."
    },
    {
      question: "How do I get started with Cursor?",
      answer: "Simply download Cursor from cursor.sh, install it on your system, and open your existing project or create a new one. The AI will immediately start understanding your codebase and providing intelligent suggestions based on Vibe Code methodology."
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
              Everything you need to know about Cursor and Vibe Code
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
