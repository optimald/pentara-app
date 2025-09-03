import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface AnalyticsPageProps {
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

export default function AnalyticsPage({ session }: AnalyticsPageProps) {
  const platformMetrics = [
    { name: 'Total Users', value: '0', change: '+0%', changeType: 'positive', period: 'vs last month' },
    { name: 'Active Sessions', value: '0', change: '+0%', changeType: 'positive', period: 'this week' },
    { name: 'Completion Rate', value: '0%', change: '+0%', changeType: 'neutral', period: 'avg this month' },
    { name: 'User Satisfaction', value: '0.0', change: '+0%', changeType: 'neutral', period: 'avg rating' },
    { name: 'Revenue Growth', value: '$0', change: '+0%', changeType: 'positive', period: 'vs last month' },
    { name: 'Guide Utilization', value: '0%', change: '+0%', changeType: 'neutral', period: 'capacity used' },
  ];

  return (
    <>
      <Head>
        <title>System Analytics - Pentara Console</title>
        <meta name="description" content="Platform-wide performance metrics and analytics" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/analytics">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-light text-white tracking-widest">
                System Analytics
              </h1>
              <p className="text-white/70 font-light tracking-wide">
                Platform-wide performance metrics and insights
              </p>
            </div>
            <div className="flex space-x-3">
              <select className="bg-transparent border border-[#E5E4E2]/30 text-white rounded-md px-3 py-2 text-sm font-light tracking-wide">
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300">
                Export Report
              </button>
            </div>
          </div>

          {/* Platform Metrics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformMetrics.map((metric) => (
              <div
                key={metric.name}
                className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                          {metric.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-light text-white tracking-wider">
                            {metric.value}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-light tracking-wide ${
                            metric.changeType === 'positive' ? 'text-green-400' : metric.changeType === 'negative' ? 'text-red-400' : 'text-white/60'
                          }`}>
                            {metric.change}
                          </div>
                        </dd>
                        <dd className="text-xs text-white/50 font-light tracking-wide mt-1">
                          {metric.period}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  User Growth Trend
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <p className="text-white/60 font-light tracking-wide">No user data available</p>
                    <p className="text-white/40 text-sm font-light tracking-wide mt-1">Chart will appear when data is collected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Analytics */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  Session Analytics
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white/60 font-light tracking-wide">No session data available</p>
                    <p className="text-white/40 text-sm font-light tracking-wide mt-1">Analytics will appear when sessions are conducted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
                Performance Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Top Performing Guides */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-light text-white mb-1 tracking-wide">Top Performers</h4>
                  <p className="text-xs text-white/60 font-light tracking-wide">No performance data yet</p>
                </div>

                {/* Most Popular Sessions */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-light text-white mb-1 tracking-wide">Popular Sessions</h4>
                  <p className="text-xs text-white/60 font-light tracking-wide">No session data yet</p>
                </div>

                {/* User Satisfaction */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-light text-white mb-1 tracking-wide">Satisfaction</h4>
                  <p className="text-xs text-white/60 font-light tracking-wide">No feedback data yet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                System Activity Log
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#E5E4E2]/20 to-[#C0C0C0]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white/60 font-light tracking-wide">No recent system activity</p>
                    <p className="text-white/40 text-sm font-light tracking-wide mt-1">Activity log will appear as users interact with the platform</p>
                  </div>
                </div>
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
