import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../../components/Console/ConsoleLayout';

interface ClientDetailPageProps {
  session: {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    } | null;
    expires?: string;
  } | null;
  clientId: string;
}

export default function ClientDetailPage({ session, clientId }: ClientDetailPageProps) {
  // Mock client data - in real app, this would be fetched based on clientId
  const client = {
    id: clientId,
    name: clientId === '1' ? 'Sarah Johnson' : 'Michael Chen',
    email: clientId === '1' ? 'sarah.j@example.com' : 'michael.c@example.com',
    status: clientId === '1' ? 'active' : 'pending',
    joinDate: clientId === '1' ? '2024-01-10' : '2024-01-12',
    lastSession: clientId === '1' ? '2024-01-18' : null,
    avatar: null,
    phone: clientId === '1' ? '+1 (555) 123-4567' : '+1 (555) 987-6543',
    location: clientId === '1' ? 'San Francisco, CA' : 'New York, NY',
    occupation: clientId === '1' ? 'Senior Product Manager' : 'Marketing Director',
    goals: clientId === '1' ? [
      'Develop stronger leadership presence',
      'Improve team communication',
      'Navigate career advancement',
      'Work-life balance optimization'
    ] : [
      'Build confidence in public speaking',
      'Strategic thinking development',
      'Team management skills'
    ],
    profileComplete: clientId === '1' ? true : false,
    councilGenerated: clientId === '1' ? true : false,
    totalSessions: clientId === '1' ? 3 : 0,
    // Mock council of 5 advisors
    council: [
      {
        id: 1,
        name: 'Marcus Aurelius',
        title: 'Stoic Emperor & Philosopher',
        specialty: 'Leadership & Self-Discipline',
        avatar: '👑',
        description: 'Guides you in developing inner strength, rational decision-making, and principled leadership.'
      },
      {
        id: 2,
        name: 'Maya Angelou',
        title: 'Poet & Civil Rights Activist',
        specialty: 'Communication & Resilience',
        avatar: '✨',
        description: 'Helps you find your authentic voice and communicate with courage and grace.'
      },
      {
        id: 3,
        name: 'Steve Jobs',
        title: 'Visionary Entrepreneur',
        specialty: 'Innovation & Vision',
        avatar: '🍎',
        description: 'Challenges you to think differently and pursue excellence in everything you do.'
      },
      {
        id: 4,
        name: 'Oprah Winfrey',
        title: 'Media Mogul & Philanthropist',
        specialty: 'Empathy & Growth',
        avatar: '🌟',
        description: 'Encourages personal growth through self-reflection and meaningful connections.'
      },
      {
        id: 5,
        name: 'Leonardo da Vinci',
        title: 'Renaissance Master',
        specialty: 'Creativity & Learning',
        avatar: '🎨',
        description: 'Inspires curiosity, creative problem-solving, and lifelong learning.'
      }
    ],
    sessions: clientId === '1' ? [
      {
        id: 1,
        date: '2024-01-10',
        type: 'Initial Consultation',
        duration: 45,
        status: 'completed',
        notes: 'Great first session, client is motivated and ready to work on leadership goals. Discussed current challenges with team dynamics and identified key areas for development.',
        outcomes: ['Established rapport', 'Identified core challenges', 'Set initial goals']
      },
      {
        id: 2,
        date: '2024-01-15',
        type: 'Follow-up Session',
        duration: 45,
        status: 'completed',
        notes: 'Discussed progress on action items from previous session. Client has started implementing daily reflection practices and reported improved self-awareness.',
        outcomes: ['Reviewed progress', 'Refined strategies', 'Assigned new exercises']
      },
      {
        id: 3,
        date: '2024-01-18',
        type: 'Strategy Session',
        duration: 60,
        status: 'completed',
        notes: 'Developed comprehensive strategy for upcoming leadership challenges. Focused on communication techniques and stakeholder management.',
        outcomes: ['Created action plan', 'Practiced scenarios', 'Set milestone goals']
      }
    ] : []
  };

  const clientStats = [
    { name: 'Total Sessions', value: client.totalSessions.toString(), icon: 'sessions' },
    { name: 'Council Members', value: client.council.length.toString(), icon: 'advisors' },
    { name: 'Active Goals', value: client.goals.length.toString(), icon: 'goals' },
    { name: 'Days Active', value: client.totalSessions > 0 ? '8' : '0', icon: 'days' }
  ];

  return (
    <>
      <Head>
        <title>{client.name} - Client Profile - Pentara Console</title>
        <meta name="description" content={`Detailed profile for client ${client.name}`} />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/profiles">
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/console/profiles"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-light tracking-wide">Back to My Clients</span>
              </a>
            </div>
            <div className="flex space-x-3">
              <div className="relative inline-block text-left">
                <button 
                  className="px-4 py-2 border border-blue-400/30 text-blue-400 bg-blue-400/10 rounded-md hover:bg-blue-400/20 font-light tracking-wide transition-all duration-300 flex items-center space-x-2"
                  onClick={() => {
                    const dropdown = document.getElementById('session-dropdown');
                    if (dropdown) {
                      dropdown.classList.toggle('hidden');
                    }
                  }}
                >
                  <span>Schedule Session</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div 
                  id="session-dropdown"
                  className="hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#1a1a1a] border border-[#E5E4E2]/20 backdrop-blur-luxury z-10"
                >
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-[#E5E4E2]/10 hover:text-white font-light tracking-wide transition-colors duration-200">
                      Initial Onboarding Session
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-[#E5E4E2]/10 hover:text-white font-light tracking-wide transition-colors duration-200">
                      Follow-up Session
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-[#E5E4E2]/10 hover:text-white font-light tracking-wide transition-colors duration-200">
                      Strategy Session
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-[#E5E4E2]/10 hover:text-white font-light tracking-wide transition-colors duration-200">
                      Check-in Session
                    </button>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded-md hover:bg-[#D4AF37]/20 font-light tracking-wide transition-all duration-300">
                Generate Report
              </button>
            </div>
          </div>

          {/* Client Profile Header */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-6 py-8">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37]/30 to-[#B8941F]/30 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-serif font-light text-white tracking-widest">
                      {client.name}
                    </h1>
                    <span className={`inline-flex px-3 py-1 text-sm font-light leading-5 rounded-full tracking-wide ${
                      client.status === 'active' ? 'text-green-400 bg-green-400/10' :
                      client.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-red-400 bg-red-400/10'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                  <p className="text-white/70 font-light tracking-wide mb-4">{client.email}</p>
                  
                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Joined</p>
                      <p className="text-sm text-white font-light tracking-wide">{client.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Location</p>
                      <p className="text-sm text-white font-light tracking-wide">{client.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Occupation</p>
                      <p className="text-sm text-white font-light tracking-wide">{client.occupation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Last Session</p>
                      <p className="text-sm text-white font-light tracking-wide">{client.lastSession || 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex space-x-8 border-b border-[#E5E4E2]/20">
                <button
                  id="overview-tab"
                  className="px-1 py-4 text-sm font-light tracking-wide border-b-2 border-[#D4AF37] text-[#D4AF37] transition-colors duration-200"
                >
                  Overview
                </button>
                <button
                  id="ai-training-tab"
                  className="px-1 py-4 text-sm font-light tracking-wide border-b-2 border-transparent text-white/70 hover:text-white hover:border-[#E5E4E2]/30 transition-colors duration-200"
                >
                  AI Training
                </button>
                <button
                  id="sessions-tab"
                  className="px-1 py-4 text-sm font-light tracking-wide border-b-2 border-transparent text-white/70 hover:text-white hover:border-[#E5E4E2]/30 transition-colors duration-200"
                >
                  Session History
                </button>
              </div>
            </div>
          </div>
          {/* Tab Content */}
          <div id="tab-content">
            {/* Overview Tab Content */}
            <div id="overview-content" className="space-y-6">
              {/* Client Stats */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {clientStats.map((stat) => (
                  <div
                    key={stat.name}
                    className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-md flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-light text-white/70 tracking-wide">{stat.name}</p>
                          <p className="text-lg font-light text-white tracking-wider">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Goals & Objectives */}
                <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                      Goals & Objectives
                    </h3>
                    <div className="space-y-3">
                      {client.goals.map((goal, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                          </div>
                          <p className="text-sm text-white/70 font-light tracking-wide">{goal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Status */}
                <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                      Profile Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-white/70 tracking-wide">Profile Complete</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-light leading-5 rounded tracking-wide ${
                          client.profileComplete ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'
                        }`}>
                          {client.profileComplete ? 'Complete' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-white/70 tracking-wide">Council Generated</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-light leading-5 rounded tracking-wide ${
                          client.councilGenerated ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'
                        }`}>
                          {client.councilGenerated ? 'Generated' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-white/70 tracking-wide">Contact Info</span>
                        <span className="inline-flex px-2 py-1 text-xs font-light leading-5 text-green-400 bg-green-400/10 rounded tracking-wide">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Council */}
              <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
                    Personal Council of Advisors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {client.council.map((advisor) => (
                      <div key={advisor.id} className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full flex items-center justify-center text-xl">
                              {advisor.avatar}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-light text-white mb-1 tracking-wide">{advisor.name}</h4>
                            <p className="text-xs text-[#D4AF37] font-light tracking-wide mb-1">{advisor.title}</p>
                            <p className="text-xs text-white/60 font-light tracking-wide mb-2">{advisor.specialty}</p>
                            <p className="text-xs text-white/50 font-light tracking-wide">{advisor.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Training Tab Content */}
            <div id="ai-training-content" className="space-y-6" style={{display: 'none'}}>
              {/* AI Training Prompt */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-light text-white tracking-widest">
                      AI Training Prompt
                    </h3>
                    <button 
                      id="copy-prompt-btn"
                      className="px-3 py-1 text-sm border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded-md hover:bg-[#D4AF37]/20 font-light tracking-wide transition-all duration-300"
                    >
                      Copy Prompt
                    </button>
                  </div>
                  
                  <div className="bg-[#0a0a0a] border border-[#E5E4E2]/10 rounded-lg p-4">
                    <pre className="text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
{`You are an AI assistant designed to provide guidance and counsel to ${client.name}, a ${client.occupation} based in ${client.location}. You will embody the wisdom and approach of their personal council of advisors, adapting your responses based on the context and question asked.

CLIENT PROFILE:
- Name: ${client.name}
- Occupation: ${client.occupation}
- Location: ${client.location}
- Goals: ${client.goals.join(', ')}
- Status: ${client.status}
- Total Sessions: ${client.totalSessions}

PERSONAL COUNCIL OF ADVISORS:

1. MARCUS AURELIUS (Stoic Emperor & Philosopher)
   - Specialty: Leadership & Self-Discipline
   - Approach: Focus on rational decision-making, inner strength, and principled leadership
   - Voice: Calm, measured, philosophical, emphasizes virtue and duty
   - Key themes: Stoicism, self-control, rational thinking, leadership principles

2. MAYA ANGELOU (Poet & Civil Rights Activist)
   - Specialty: Communication & Resilience
   - Approach: Emphasizes authentic voice, courage, and graceful communication
   - Voice: Poetic, inspiring, warm, emphasizes personal growth and authenticity
   - Key themes: Finding your voice, resilience, courage, authentic communication

3. STEVE JOBS (Visionary Entrepreneur)
   - Specialty: Innovation & Vision
   - Approach: Challenges conventional thinking, pursues excellence, focuses on vision
   - Voice: Direct, challenging, visionary, emphasizes innovation and excellence
   - Key themes: Innovation, vision, excellence, thinking differently, execution

4. OPRAH WINFREY (Media Mogul & Philanthropist)
   - Specialty: Empathy & Growth
   - Approach: Encourages self-reflection, meaningful connections, and personal growth
   - Voice: Warm, empathetic, encouraging, emphasizes self-discovery and connection
   - Key themes: Self-reflection, personal growth, empathy, meaningful relationships

5. LEONARDO DA VINCI (Renaissance Master)
   - Specialty: Creativity & Learning
   - Approach: Inspires curiosity, creative problem-solving, and lifelong learning
   - Voice: Curious, creative, analytical, emphasizes learning and exploration
   - Key themes: Curiosity, creativity, learning, interdisciplinary thinking, innovation

RESPONSE GUIDELINES:
- Adapt your response style based on which advisor's perspective would be most helpful
- Maintain the authentic voice and approach of the chosen advisor
- Reference the client's specific goals and context when relevant
- Provide practical, actionable advice while staying true to the advisor's philosophy
- Use the advisor's characteristic language patterns and key themes
- Be supportive but challenging when appropriate
- Focus on long-term growth and development

Remember: You are not just giving advice as an AI, but embodying the wisdom and approach of these historical figures to provide ${client.name} with the most relevant and impactful guidance for their specific situation and goals.`}
                    </pre>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-400/10 border border-blue-400/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-400 font-light tracking-wide mb-1">Usage Instructions</p>
                        <p className="text-xs text-blue-300/80 font-light tracking-wide">
                          This prompt is generated from {client.name}'s onboarding survey responses and personal council selection. 
                          Use this exact prompt when configuring the AI/LLM to ensure responses are tailored to their specific goals, 
                          background, and chosen advisors. The AI will adapt its response style based on which advisor's perspective 
                          would be most helpful for each question.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Council Details */}
              <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
                    Council Member Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {client.council.map((advisor) => (
                      <div key={advisor.id} className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full flex items-center justify-center text-xl">
                              {advisor.avatar}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-light text-white mb-1 tracking-wide">{advisor.name}</h4>
                            <p className="text-xs text-[#D4AF37] font-light tracking-wide mb-1">{advisor.title}</p>
                            <p className="text-xs text-white/60 font-light tracking-wide mb-2">{advisor.specialty}</p>
                            <p className="text-xs text-white/50 font-light tracking-wide">{advisor.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions Tab Content */}
            <div id="sessions-content" className="space-y-6" style={{display: 'none'}}>
              {/* Session History */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Session History
                  </h3>
                  {client.sessions.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E5E4E2]/20 to-[#C0C0C0]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white/60 font-light tracking-wide">No sessions yet</p>
                      <p className="text-white/40 text-sm font-light tracking-wide mt-1">Schedule the first session to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {client.sessions.map((session) => (
                        <div key={session.id} className="bg-[#E5E4E2]/5 border border-[#E5E4E2]/10 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-sm font-light text-white tracking-wide">{session.type}</h4>
                                <span className={`inline-flex px-2 py-1 text-xs font-light leading-5 rounded tracking-wide ${
                                  session.status === 'completed' ? 'text-green-400 bg-green-400/10' :
                                  session.status === 'scheduled' ? 'text-blue-400 bg-blue-400/10' :
                                  'text-yellow-400 bg-yellow-400/10'
                                }`}>
                                  {session.status}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-white/60 font-light tracking-wide">
                                <span>{session.date}</span>
                                <span>{session.duration} minutes</span>
                              </div>
                            </div>
                          </div>
                          
                          {session.notes && (
                            <div className="mb-4">
                              <h5 className="text-xs font-light text-white/80 mb-2 tracking-wide">Session Notes</h5>
                              <p className="text-sm text-white/70 font-light tracking-wide">{session.notes}</p>
                            </div>
                          )}
                          
                          {session.outcomes && session.outcomes.length > 0 && (
                            <div>
                              <h5 className="text-xs font-light text-white/80 mb-2 tracking-wide">Key Outcomes</h5>
                              <div className="flex flex-wrap gap-2">
                                {session.outcomes.map((outcome, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex px-2 py-1 text-xs font-light text-blue-400 bg-blue-400/10 border border-blue-400/30 rounded tracking-wide"
                                  >
                                    {outcome}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConsoleLayout>

      {/* JavaScript for tab switching and copy functionality */}
      <script dangerouslySetInnerHTML={{
        __html: `
          function showTab(tabName) {
            // Hide all tab contents
            document.getElementById('overview-content').style.display = 'none';
            document.getElementById('ai-training-content').style.display = 'none';
            document.getElementById('sessions-content').style.display = 'none';
            
            // Remove active class from all tabs
            document.getElementById('overview-tab').className = 'px-1 py-4 text-sm font-light tracking-wide border-b-2 border-transparent text-white/70 hover:text-white hover:border-[#E5E4E2]/30 transition-colors duration-200';
            document.getElementById('ai-training-tab').className = 'px-1 py-4 text-sm font-light tracking-wide border-b-2 border-transparent text-white/70 hover:text-white hover:border-[#E5E4E2]/30 transition-colors duration-200';
            document.getElementById('sessions-tab').className = 'px-1 py-4 text-sm font-light tracking-wide border-b-2 border-transparent text-white/70 hover:text-white hover:border-[#E5E4E2]/30 transition-colors duration-200';
            
            // Show selected tab content
            document.getElementById(tabName + '-content').style.display = 'block';
            
            // Add active class to selected tab
            document.getElementById(tabName + '-tab').className = 'px-1 py-4 text-sm font-light tracking-wide border-b-2 border-[#D4AF37] text-[#D4AF37] transition-colors duration-200';
          }
          
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize with overview tab
            showTab('overview');
            
            // Add event listeners to tab buttons
            const overviewTab = document.getElementById('overview-tab');
            const aiTrainingTab = document.getElementById('ai-training-tab');
            const sessionsTab = document.getElementById('sessions-tab');
            
            if (overviewTab) {
              overviewTab.addEventListener('click', function() {
                showTab('overview');
              });
            }
            
            if (aiTrainingTab) {
              aiTrainingTab.addEventListener('click', function() {
                showTab('ai-training');
              });
            }
            
            if (sessionsTab) {
              sessionsTab.addEventListener('click', function() {
                showTab('sessions');
              });
            }
            
            // Copy prompt functionality
            const copyBtn = document.getElementById('copy-prompt-btn');
            if (copyBtn) {
              copyBtn.addEventListener('click', function() {
                const promptText = document.querySelector('pre').textContent;
                navigator.clipboard.writeText(promptText).then(function() {
                  // Show success feedback
                  const originalText = copyBtn.textContent;
                  copyBtn.textContent = 'Copied!';
                  copyBtn.className = 'px-3 py-1 text-sm border border-green-400/30 text-green-400 bg-green-400/10 rounded-md font-light tracking-wide transition-all duration-300';
                  
                  setTimeout(function() {
                    copyBtn.textContent = originalText;
                    copyBtn.className = 'px-3 py-1 text-sm border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded-md hover:bg-[#D4AF37]/20 font-light tracking-wide transition-all duration-300';
                  }, 2000);
                }).catch(function(err) {
                  console.error('Failed to copy text: ', err);
                  alert('Failed to copy prompt. Please select and copy manually.');
                });
              });
            }
          });
        `
      }} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Only allow Guide role (or Guardian for oversight)
  if ((session.user as any)?.role !== 'GUIDE' && (session.user as any)?.role !== 'GUARDIAN') {
    return {
      redirect: {
        destination: '/console',
        permanent: false,
      },
    };
  }

  const { id } = context.params!;

  // Clean up session object to avoid serialization issues
  const cleanSession = {
    user: {
      id: session.user?.id || null,
      name: session.user?.name || null,
      email: session.user?.email || null,
      image: session.user?.image || null,
      role: (session.user as any)?.role || null,
    },
    expires: session.expires,
  };

  return {
    props: {
      session: cleanSession,
      clientId: id as string,
    },
  };
};
