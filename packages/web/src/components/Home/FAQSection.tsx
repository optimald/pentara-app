interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {

  const faqs: FAQItem[] = [
    {
      question: "What is this?",
      answer: "Pentara creates your personal advisory council—five distinct experts that live on your device. You can consult individual advisors or your entire team for complex decisions. Ultra-private, personalized, and exclusively yours."
    },
    {
      question: "What do I get in onboarding?",
      answer: "A focused 45-minute conversation to understand your needs, followed by the creation of your personal advisory council of five experts, each tailored to your unique situation and goals."
    },
    {
      question: "What happens after?",
      answer: "You get ongoing access to your personal team of five trusted experts for just $15/month. All conversations remain exclusively on your device—we never store chat logs on our servers."
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
    <section id="faq" className="section-padding bg-[#0a0a0a] py-32 stacked-panel panel-reveal stacked-3d" data-panel="5">
      <div className="container-max sticky-panel">
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="text-left mb-20">
            <div className="mb-8">
              <span className="text-[120px] font-light text-[#D4AF37] leading-none">05</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 tracking-widest">
              Details
            </h2>
            <p className="text-xl text-white font-light tracking-wide">
              What you need to know
            </p>
          </div>

          {/* FAQ Items - Static */}
          <div className="space-y-8">
            {displayedFaqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-[#E5E4E2]/20 pb-8"
              >
                <h3 className="text-xl font-light text-white mb-4 tracking-wide">
                  {faq.question}
                </h3>
                <p className="text-white leading-relaxed font-light tracking-wide">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Learn More Hint */}
          <div className="text-left mt-16">
            <p className="text-white/60 text-sm font-light tracking-wide">
              Learn more about your council during your onboarding session
            </p>
          </div>

          {/* Enhanced CTA with Seductress Guide */}
          <div className="mt-20">
            <div className="max-w-4xl">
              {/* Seductress Guide Image - Full Impact */}
              <div className="mb-12">
                <div className="relative w-64 h-80 rounded-xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-champagne-xl">
                  <img 
                    src="/seductress-guide.jpeg" 
                    alt="Your Guide to the Council" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent p-6">
                    <p className="text-[#D4AF37] text-sm font-light text-center tracking-wide">
                      Your Personal Guide to Strategic Mastery
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Human Connection Narrative */}
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-light text-[#D4AF37] mb-4 tracking-widest">
                  Curate Your Advisory Circle
                </h3>
                <p className="text-white text-lg leading-relaxed font-light tracking-wide">
                  Your exclusive 45-minute consultation is led by a master strategist who will architect your bespoke council of five perspectives. This private session ensures your advisory circle is precisely calibrated to your vision and values.
                </p>
              </div>
              
              {/* Enhanced CTA Button */}
              <div className="flex items-center">
                <a
                  href="https://calendly.com/optimaldev/pentara-onboarding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xl px-20 py-6 inline-flex items-center space-x-4 shadow-champagne-lg hover:shadow-champagne-xl transition-all duration-300 transform hover:scale-[1.02] font-medium tracking-wider"
                >
                  <span className="text-2xl font-medium tracking-widest">Book Your Onboarding</span>
                  <span className="text-[#D4AF37] font-light text-lg">($299)</span>
                </a>
              </div>
              
              {/* Professional Assurance */}
              <div className="mt-6">
                <p className="text-white/60 text-sm font-light tracking-wide">
                  Professional guidance for your transformation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
