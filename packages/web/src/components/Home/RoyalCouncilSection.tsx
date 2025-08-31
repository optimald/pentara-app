export default function RoyalCouncilSection() {
  const advisors = [
    {
      name: "The Sage",
      benefit: "Ancient wisdom for clarity"
    },
    {
      name: "The Warrior",
      benefit: "Courage for decisive action"
    },
    {
      name: "The Healer",
      benefit: "Deep healing and renewal"
    },
    {
      name: "The Strategist",
      benefit: "Strategic mastery and order"
    },
    {
      name: "The Visionary",
      benefit: "Visionary clarity and possibility"
    }
  ];

  return (
    <section id="royal-council" className="section-padding bg-slate-900">
      <div className="container-max">
        {/* Lonely Road - Isolation Slide */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* Lonely Road Image */}
              <div className="h-80 rounded-lg mb-8 overflow-hidden border border-slate-700/50">
                <img 
                  src="/lonely-road.jpeg" 
                  alt="Person walking alone on a dark road" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                The Journey Can Feel Lonely
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Whether you're climbing toward success or just trying to make it through another day, 
                the path forward can feel isolating. Important decisions weigh heavily when you can't 
                share your deepest concerns or show vulnerability.
              </p>
              <p className="text-lg text-slate-400 italic">
                But what if you didn't have to walk alone?
              </p>
            </div>
          </div>
        </div>

        {/* The Thinker - Contemplation Frame */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* The Thinker Image */}
              <div className="h-64 rounded-lg mb-8 overflow-hidden border border-slate-700/50">
                <img 
                  src="/thinker.jpeg" 
                  alt="The Thinker statue in contemplation" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                When Life Feels Heavy
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Life can feel overwhelming. Whether you're facing tough decisions, feeling stuck, or just need 
                someone who truly listens without judgment. Sometimes you need guidance but don't want to 
                burden friends or family with your deepest thoughts.
              </p>
              <p className="text-lg text-slate-400 italic">
                What if you had wise voices who were always there for you?
              </p>
            </div>
          </div>
        </div>

        {/* Transition to Council */}
        <div className="text-center mb-20">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-12"></div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Your Personal Support Circle
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Five compassionate voices who never judge, never get tired of listening, and never share your secrets. 
            When you need clarity, they offer divergent wisdom that converges into a single, powerful truth.
          </p>
          <p className="text-lg text-amber-400 font-medium">
            How this works remains our carefully guarded secret.
          </p>
        </div>

        {/* Responsive Advisor Layout */}
        <div className="mb-20">
          {/* Desktop: Circular Layout */}
          <div className="hidden md:block relative w-full max-w-5xl mx-auto h-[600px]">
            {advisors.map((advisor, index) => {
              // Calculate position for each advisor in a circle
              const angle = (index * 72) - 90; // 72 degrees apart (360/5), start from top
              const radius = 180; // Distance from center
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div 
                  key={advisor.name} 
                  className="absolute group"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  {/* Circular Advisor Card */}
                  <div className="w-56 h-56 bg-gradient-to-br from-slate-800/90 to-black border-2 border-amber-600/40 rounded-full hover:border-amber-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 flex flex-col items-center justify-center text-center p-6 group-hover:scale-125 backdrop-blur-sm">
                    
                    {/* Silhouette Area - Circular */}
                    <div className="w-20 h-20 bg-gradient-to-b from-amber-600/30 to-amber-700/40 rounded-full flex items-center justify-center mb-4 border border-amber-600/20">
                      <svg className="w-10 h-10 text-amber-600/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {advisor.name}
                    </h3>
                    
                    {/* Benefit - Condensed */}
                    <p className="text-amber-400 font-medium text-xs uppercase tracking-wide text-center leading-tight">
                      {advisor.benefit}
                    </p>

                    {/* Enhanced Details - On Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/95 rounded-full flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-amber-500/60">
                      <h4 className="text-white font-semibold text-lg mb-2">{advisor.name}</h4>
                      <p className="text-amber-400 text-sm mb-3 uppercase tracking-wide font-medium leading-tight">{advisor.benefit}</p>
                      <p className="text-xs text-slate-300 text-center leading-relaxed px-2">
                        Timeless wisdom from history's greatest minds.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Center Element - Council Symbol */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600/30 to-amber-700/40 rounded-full flex items-center justify-center border-2 border-amber-600/50 backdrop-blur-sm">
                <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile: Grid Layout */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
              {advisors.map((advisor, index) => (
                <div 
                  key={advisor.name} 
                  className="bg-gradient-to-br from-slate-800/90 to-black border-2 border-amber-600/40 rounded-lg p-6 backdrop-blur-sm hover:border-amber-500/60 transition-all duration-300"
                >
                  {/* Mobile Advisor Card */}
                  <div className="flex items-center space-x-4">
                    {/* Silhouette Area - Square */}
                    <div className="w-16 h-16 bg-gradient-to-b from-amber-600/30 to-amber-700/40 rounded-lg flex items-center justify-center border border-amber-600/20 flex-shrink-0">
                      <svg className="w-8 h-8 text-amber-600/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {advisor.name}
                      </h3>
                      <p className="text-amber-400 font-medium text-sm uppercase tracking-wide leading-tight">
                        {advisor.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
