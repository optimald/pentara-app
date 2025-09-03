import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../../components/Console/ConsoleLayout';


interface GuideDetailPageProps {
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
  guideId: string;
}

export default function GuideDetailPage({ session, guideId }: GuideDetailPageProps) {

  // Mock guide data - in real app, this would be fetched based on guideId
  const guide = {
    id: guideId,
    name: 'Demo Guide',
    email: 'guide@pentara.app',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    avatar: null,
    specialties: ['Leadership Development', 'Strategic Planning', 'Team Building'],
    bio: 'Experienced guide specializing in leadership development and strategic planning. Passionate about helping individuals unlock their potential and achieve their goals.',
    certifications: ['Certified Life Coach', 'Leadership Development Specialist'],
    languages: ['English', 'Spanish'],
    timezone: 'PST (UTC-8)',
    performance: {
      totalSessions: 0,
      completedSessions: 0,
      cancelledSessions: 0,
      avgRating: 0.0,
      clientSatisfaction: 0,
      responseTime: 'N/A',
      completionRate: 0
    },
    clients: [],
    recentActivity: [
      { id: 1, action: 'Account created', date: '2024-01-15', type: 'system' },
      { id: 2, action: 'Profile completed', date: '2024-01-15', type: 'profile' },
      { id: 3, action: 'Certification verified', date: '2024-01-16', type: 'verification' }
    ],
    availability: {
      hoursPerWeek: 20,
      preferredTimes: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'],
      daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  };

  const performanceMetrics = [
    { name: 'Total Sessions', value: guide.performance.totalSessions.toString(), icon: 'sessions' },
    { name: 'Completion Rate', value: `${guide.performance.completionRate}%`, icon: 'completion' },
    { name: 'Avg Rating', value: guide.performance.avgRating.toFixed(1), icon: 'rating' },
    { name: 'Response Time', value: guide.performance.responseTime, icon: 'time' },
    { name: 'Client Satisfaction', value: `${guide.performance.clientSatisfaction}%`, icon: 'satisfaction' },
    { name: 'Active Clients', value: guide.clients.length.toString(), icon: 'clients' }
  ];

  return (
    <>
      <Head>
        <title>{guide.name} - Guide Details - Pentara Console</title>
        <meta name="description" content={`Detailed view of guide ${guide.name}`} />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/guides">
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/console/guides"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-light tracking-wide">Back to Guide Management</span>
              </a>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-yellow-400/30 text-yellow-400 bg-yellow-400/10 rounded-md hover:bg-yellow-400/20 font-light tracking-wide transition-all duration-300">
                Send Message
              </button>
              <button className="px-4 py-2 border border-red-400/30 text-red-400 bg-red-400/10 rounded-md hover:bg-red-400/20 font-light tracking-wide transition-all duration-300">
                Suspend Guide
              </button>
            </div>
          </div>

          {/* Guide Profile Header */}
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

                {/* Guide Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-serif font-light text-white tracking-widest">
                      {guide.name}
                    </h1>
                    <span className="inline-flex px-3 py-1 text-sm font-light leading-5 text-green-400 bg-green-400/10 rounded-full tracking-wide">
                      {guide.status}
                    </span>
                  </div>
                  <p className="text-white/70 font-light tracking-wide mb-4">{guide.email}</p>
                  <p className="text-white/60 font-light tracking-wide text-sm mb-4">{guide.bio}</p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Joined</p>
                      <p className="text-sm text-white font-light tracking-wide">{guide.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Last Active</p>
                      <p className="text-sm text-white font-light tracking-wide">{guide.lastActive}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Timezone</p>
                      <p className="text-sm text-white font-light tracking-wide">{guide.timezone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-light tracking-wide">Hours/Week</p>
                      <p className="text-sm text-white font-light tracking-wide">{guide.availability.hoursPerWeek}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {performanceMetrics.map((metric) => (
                  <div
                    key={metric.name}
                    className="bg-transparent border border-[#E5E4E2]/10 rounded-lg p-4"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-light text-white/70 tracking-wide">{metric.name}</p>
                        <p className="text-lg font-light text-white tracking-wider">{metric.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Specialties & Certifications */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  Expertise & Credentials
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-light text-white/80 mb-2 tracking-wide">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex px-3 py-1 text-xs font-light text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full tracking-wide"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-light text-white/80 mb-2 tracking-wide">Certifications</h4>
                    <div className="space-y-2">
                      {guide.certifications.map((cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-white/70 font-light tracking-wide">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-light text-white/80 mb-2 tracking-wide">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages.map((language) => (
                        <span
                          key={language}
                          className="inline-flex px-2 py-1 text-xs font-light text-blue-400 bg-blue-400/10 border border-blue-400/30 rounded tracking-wide"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  Availability Schedule
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-light text-white/80 mb-2 tracking-wide">Available Days</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.availability.daysAvailable.map((day) => (
                        <span
                          key={day}
                          className="inline-flex px-2 py-1 text-xs font-light text-green-400 bg-green-400/10 border border-green-400/30 rounded tracking-wide"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-light text-white/80 mb-2 tracking-wide">Preferred Times</h4>
                    <div className="space-y-2">
                      {guide.availability.preferredTimes.map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-white/70 font-light tracking-wide">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E4E2]/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-light text-white/70 tracking-wide">Weekly Capacity</span>
                      <span className="text-sm font-light text-white tracking-wide">{guide.availability.hoursPerWeek} hours</span>
                    </div>
                    <div className="mt-2 w-full bg-[#E5E4E2]/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-xs text-white/50 font-light tracking-wide mt-1">0% utilized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                Recent Activity
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {guide.recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== guide.recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-[#E5E4E2]/20"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-[#0a0a0a] ${
                              activity.type === 'system' ? 'bg-blue-400/20' :
                              activity.type === 'profile' ? 'bg-green-400/20' :
                              activity.type === 'verification' ? 'bg-[#D4AF37]/20' :
                              'bg-[#E5E4E2]/20'
                            }`}>
                              <svg className={`w-4 h-4 ${
                                activity.type === 'system' ? 'text-blue-400' :
                                activity.type === 'profile' ? 'text-green-400' :
                                activity.type === 'verification' ? 'text-[#D4AF37]' :
                                'text-white/70'
                              }`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-white/70 font-light tracking-wide">
                                {activity.action}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-white/60 font-light tracking-wide">
                              <time dateTime={activity.date}>{activity.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300">
              Export Guide Report
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md hover:from-blue-500 hover:to-blue-700 font-light tracking-wide transition-all duration-300">
              Assign New Clients
            </button>
          </div>
        </div>
      </ConsoleLayout>
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

  // Only allow Guardian role
  if ((session.user as any)?.role !== 'GUARDIAN') {
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
      guideId: id as string,
    },
  };
};
