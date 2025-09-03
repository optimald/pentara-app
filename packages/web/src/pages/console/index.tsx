import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
// import Link from 'next/link'; // Removed to avoid React context issues
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface ConsoleDashboardProps {
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
}

export default function ConsoleDashboard({ session }: ConsoleDashboardProps) {
  const userRole = session?.user?.role;
  const isGuide = userRole === 'GUIDE';
  const isGuardian = userRole === 'GUARDIAN';

  // Role-specific stats
  const guideStats = [
    { name: 'Active Clients', value: '0', change: '+0%', changeType: 'positive' },
    { name: 'Sessions This Month', value: '0', change: '+0%', changeType: 'positive' },
    { name: 'Completed Profiles', value: '0', change: '+0%', changeType: 'positive' },
    { name: 'Avg. Session Rating', value: '0.0', change: '+0%', changeType: 'positive' },
  ];

  const guardianStats = [
    { name: 'Total System Users', value: '0', change: '+0%', changeType: 'positive', icon: 'users' },
    { name: 'Active Guides', value: '0', change: '+0%', changeType: 'positive', icon: 'guides' },
    { name: 'Pending Approvals', value: '0', change: '+0%', changeType: 'neutral', icon: 'pending' },
    { name: 'Monthly Revenue', value: '$0', change: '+0%', changeType: 'positive', icon: 'revenue' },
    { name: 'System Uptime', value: '99.9%', change: '+0.1%', changeType: 'positive', icon: 'uptime' },
    { name: 'Active Sessions', value: '0', change: '+0%', changeType: 'positive', icon: 'sessions' },
  ];

  const stats = isGuide ? guideStats : guardianStats;

  // Role-specific activity
  const guideActivity = [
    { id: 1, user: 'No clients yet', action: 'No sessions completed', time: 'N/A' },
  ];

  const guardianActivity = [
    { id: 1, user: 'System', action: 'No guide management activity', time: 'N/A', type: 'system' },
    { id: 2, user: 'Admin', action: 'No user approvals pending', time: 'N/A', type: 'approval' },
    { id: 3, user: 'Monitor', action: 'All systems operational', time: 'N/A', type: 'status' },
  ];

  const recentActivity = isGuide ? guideActivity : guardianActivity;

  return (
    <>
      <Head>
        <title>{isGuide ? 'Guide Portal' : 'Guardian Portal'} - Pentara</title>
        <meta name="description" content={`Pentara ${isGuide ? 'guide' : 'guardian'} portal dashboard`} />
      </Head>

      <ConsoleLayout session={session} currentPath="/console">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-serif font-light text-white tracking-widest">
              {isGuide ? 'Guide Dashboard' : 'Guardian Command Center'}
            </h1>
            <p className="text-white/70 font-light tracking-wide">
              Welcome back, {isGuide ? 'Guide' : 'Guardian'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-1 gap-5 ${isGuide ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {stats.map((stat) => (
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
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-light text-white tracking-wider">
                            {stat.value}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-light tracking-wide ${
                            stat.changeType === 'positive' ? 'text-[#D4AF37]' : 'text-red-400'
                          }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions - Guide Only */}
          {isGuide && (
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  Guide Actions
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <a
                    href="/console/profiles"
                    className="relative rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#D4AF37] transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-light text-[#D4AF37] tracking-wide">
                        Add New Client
                      </p>
                      <p className="text-sm text-white/70 font-light tracking-wide">
                        Onboard a new client to your practice
                      </p>
                    </div>
                  </a>

                  <a
                    href="/console/profiles"
                    className="relative rounded-lg border border-green-400/30 bg-green-400/10 px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-green-400/20 hover:border-green-400/50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-400 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V5zm8 5H8v2h4v-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-light text-green-400 tracking-wide">
                        My Client Profiles
                      </p>
                      <p className="text-sm text-white/70 font-light tracking-wide">
                        View and manage your client profiles
                      </p>
                    </div>
                  </a>

                  <a
                    href="/console/schedule"
                    className="relative rounded-lg border border-blue-400/30 bg-blue-400/10 px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-blue-400/20 hover:border-blue-400/50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-400 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-light text-blue-400 tracking-wide">
                        Schedule & Calendar
                      </p>
                      <p className="text-sm text-white/70 font-light tracking-wide">
                        Manage your session schedule
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}



          {/* Guardian-specific Guide Management Section */}
          {isGuardian && (
            <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
                  Guide Management Overview
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Guide Performance */}
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-light text-[#D4AF37] tracking-wide">Top Performing Guide</p>
                        <p className="text-xs text-white/60 font-light">No data available</p>
                      </div>
                    </div>
                  </div>

                  {/* Pending Reviews */}
                  <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-light text-yellow-400 tracking-wide">Pending Guide Reviews</p>
                        <p className="text-xs text-white/60 font-light">0 reviews pending</p>
                      </div>
                    </div>
                  </div>

                  {/* System Alerts */}
                  <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-light text-red-400 tracking-wide">System Alerts</p>
                        <p className="text-xs text-white/60 font-light">All systems normal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                {isGuide ? 'Recent Client Activity' : 'System Activity'}
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-[#E5E4E2]/20"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#E5E4E2]/30 to-[#C0C0C0]/30 flex items-center justify-center ring-8 ring-[#0a0a0a]">
                              <span className="text-white/70 text-sm">👤</span>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-white/70 font-light tracking-wide">
                                {activity.action} by{' '}
                                <span className="font-light text-white">
                                  {activity.user}
                                </span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-white/60 font-light tracking-wide">
                              <time dateTime={activity.time}>{activity.time}</time>
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
        </div>
      </ConsoleLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Debug logging
  console.log('Console page - Session:', session);
  console.log('Console page - Cookies:', context.req.headers.cookie);

  if (!session) {
    console.log('Console page - No session found, redirecting to signin');
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  console.log('Console page - Session found, allowing access');
  
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
    },
  };
};
