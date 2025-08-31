export default function RoyalCouncilSection() {
  const advisors = [
    {
      name: "The Sage",
      benefit: "Clarity for your next move",
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 10.28 9.69 10 9 10H4C2.9 10 2 10.9 2 12V22H4V12H9L12.5 15.5V22H14.5V14.5L12.5 12.5L15.5 9.5L18.33 12.33L19.83 10.83L21 9Z"/>
        </svg>
      ),
      description: "Deep wisdom and philosophical insight when you need perspective.",
      color: "from-indigo-600 to-purple-700"
    },
    {
      name: "The Warrior",
      benefit: "Discipline and decisive action",
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.92 5H5L6.5 2.5L8 5H6.92ZM19 5H17.08L18.5 2.5L20 5H19ZM12 2.5L13.5 5H10.5L12 2.5ZM12 8.5C10.62 8.5 9.5 9.62 9.5 11S10.62 13.5 12 13.5 14.5 12.38 14.5 11 13.38 8.5 12 8.5ZM12 15.5C9.52 15.5 7.5 17.52 7.5 20V22H16.5V20C16.5 17.52 14.48 15.5 12 15.5Z"/>
        </svg>
      ),
      description: "Strength and courage when you need to push through resistance.",
      color: "from-red-600 to-orange-600"
    },
    {
      name: "The Healer",
      benefit: "Balance, renewal, resilience",
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
        </svg>
      ),
      description: "Emotional wisdom and self-compassion when you need healing.",
      color: "from-green-600 to-emerald-600"
    },
    {
      name: "The Strategist",
      benefit: "Structure, foresight, execution",
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
        </svg>
      ),
      description: "Systematic thinking and planning when you need clarity.",
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "The Visionary",
      benefit: "Future insight and innovation",
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2L13.09,8.26L22,9L14.5,15.74L17.18,22L12,18.74L6.82,22L9.5,15.74L2,9L10.91,8.26L12,2Z"/>
        </svg>
      ),
      description: "Creative solutions and possibilities when you need breakthrough.",
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <section id="royal-council" className="section-padding bg-gradient-to-b from-dark-100 to-dark-200">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gold-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-800">
              Your Royal Council
            </h2>
            <svg className="w-10 h-10 text-gold-500 ml-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Five distinct sovereign advisors, each with their own personality, wisdom, and guidance style—
            <em className="text-gold-600"> meticulously calibrated to your unique values and aspirations</em>
          </p>
        </div>

        {/* Advisors Grid - Better Layout */}
        <div className="mb-16">
          {/* Top Row - 2 Advisors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
            {advisors.slice(0, 2).map((advisor) => (
              <div key={advisor.name} className="relative group">
                {/* Advisor Card */}
                <div className="relative bg-gradient-to-b from-dark-50 to-dark-100 p-8 rounded-3xl border-2 border-gold-500/20 hover:border-gold-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 backdrop-blur-sm group-hover:transform group-hover:-translate-y-2">
                  {/* Ornate border decoration */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/10 via-purple-500/10 to-gold-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  {/* Icon and Name */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${advisor.color} rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {advisor.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-dark-800 mb-2">
                      {advisor.name}
                    </h3>
                    <p className="text-gold-600 font-medium text-lg mb-2">
                      {advisor.benefit}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-dark-600 leading-relaxed text-center">
                    {advisor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Row - 1 Advisor (Centered) */}
          <div className="flex justify-center mb-8">
            <div className="relative group max-w-md w-full">
              {/* Advisor Card */}
              <div className="relative bg-gradient-to-b from-dark-50 to-dark-100 p-8 rounded-3xl border-2 border-gold-500/20 hover:border-gold-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 backdrop-blur-sm group-hover:transform group-hover:-translate-y-2">
                {/* Ornate border decoration */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/10 via-purple-500/10 to-gold-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                {/* Icon and Name */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${advisors[2].color} rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {advisors[2].icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-dark-800 mb-2">
                    {advisors[2].name}
                  </h3>
                  <p className="text-gold-600 font-medium text-lg mb-2">
                    {advisors[2].benefit}
                  </p>
                </div>

                {/* Description */}
                <p className="text-dark-600 leading-relaxed text-center">
                  {advisors[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row - 2 Advisors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.slice(3, 5).map((advisor) => (
              <div key={advisor.name} className="relative group">
                {/* Advisor Card */}
                <div className="relative bg-gradient-to-b from-dark-50 to-dark-100 p-8 rounded-3xl border-2 border-gold-500/20 hover:border-gold-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 backdrop-blur-sm group-hover:transform group-hover:-translate-y-2">
                  {/* Ornate border decoration */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/10 via-purple-500/10 to-gold-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  {/* Icon and Name */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${advisor.color} rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {advisor.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-dark-800 mb-2">
                      {advisor.name}
                    </h3>
                    <p className="text-gold-600 font-medium text-lg mb-2">
                      {advisor.benefit}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-dark-600 leading-relaxed text-center">
                    {advisor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Experience Preview */}
        <div className="bg-gradient-to-r from-purple-900/20 via-dark-100 to-purple-900/20 p-8 md:p-12 rounded-3xl border-2 border-gold-500/30 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif font-bold text-dark-800 mb-4">
              Experience Your Royal Court
            </h3>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Seamlessly switch between advisors or consult your entire council for complex decisions
            </p>
          </div>

          {/* Mock App Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-50 rounded-2xl border-2 border-gold-500/20 overflow-hidden shadow-2xl">
              {/* App Header */}
              <div className="bg-gradient-to-r from-purple-800 to-gold-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">Your Royal Council Session</h4>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="p-6 space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gold-500 text-white p-3 rounded-2xl rounded-br-md max-w-xs">
                    "I'm struggling with a major career decision. Should I take this risky opportunity?"
                  </div>
                </div>

                {/* Advisor Responses */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-sm">🧙‍♂️</div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md max-w-md">
                      <div className="font-medium text-sm text-purple-700 mb-1">The Sage</div>
                      <div className="text-sm">"What does your intuition tell you about this path? Sometimes the greatest risks lead to the most profound growth..."</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-sm">🎯</div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md max-w-md">
                      <div className="font-medium text-sm text-blue-700 mb-1">The Strategist</div>
                      <div className="text-sm">"Let's analyze the data. What's your risk tolerance? What are the measurable outcomes if this succeeds vs fails?"</div>
                    </div>
                  </div>
                </div>

                {/* Council Selection */}
                <div className="flex justify-center pt-4">
                  <div className="flex space-x-2 bg-gray-50 p-2 rounded-full">
                    <button className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full text-xs">🧙‍♂️</button>
                    <button className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-full text-xs opacity-50">⚔️</button>
                    <button className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full text-xs opacity-50">💚</button>
                    <button className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full text-xs">🎯</button>
                    <button className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full text-xs opacity-50">🌟</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="https://calendly.com/optimaldev/pentara-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-black via-gold-600 to-black text-white px-12 py-5 rounded-none font-bold hover:shadow-2xl hover:shadow-gold-500/40 transition-all duration-300 transform hover:-translate-y-1 border-2 border-gold-500"
            >
              <span>Claim Your Throne</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
