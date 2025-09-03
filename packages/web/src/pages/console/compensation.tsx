import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface CompensationPageProps {
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

export default function CompensationPage({ session }: CompensationPageProps) {
  // Mock compensation data
  const compensationStats = [
    { name: 'This Month', value: '$2,340', change: '+18%', changeType: 'positive', period: 'vs last month' },
    { name: 'Total Earned', value: '$18,750', change: '+22%', changeType: 'positive', period: 'all time' },
    { name: 'Sessions Completed', value: '47', change: '+12%', changeType: 'positive', period: 'this month' },
    { name: 'Average per Session', value: '$75', change: '+5%', changeType: 'positive', period: 'current rate' },
    { name: 'Pending Payout', value: '$1,125', change: '0%', changeType: 'neutral', period: 'awaiting payment' },
    { name: 'Next Payout', value: 'Dec 15', change: '', changeType: 'neutral', period: 'scheduled date' },
  ];

  const recentPayouts = [
    { id: 1, date: 'Nov 15, 2024', amount: '$2,250', sessions: 30, status: 'completed' },
    { id: 2, date: 'Oct 15, 2024', amount: '$1,875', sessions: 25, status: 'completed' },
    { id: 3, date: 'Sep 15, 2024', amount: '$2,100', sessions: 28, status: 'completed' },
    { id: 4, date: 'Aug 15, 2024', amount: '$1,650', sessions: 22, status: 'completed' },
    { id: 5, date: 'Jul 15, 2024', amount: '$1,950', sessions: 26, status: 'completed' },
  ];

  return (
    <>
      <Head>
        <title>Compensation - Pentara Console</title>
        <meta name="description" content="Track your earnings and compensation as a guide" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/compensation">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-white tracking-widest">Compensation</h1>
              <p className="mt-1 text-sm text-white/60 font-light tracking-wide">
                Track your earnings, payouts, and session compensation
              </p>
            </div>
            <div className="flex space-x-3">
              <select className="bg-transparent border border-[#E5E4E2]/30 text-white rounded-md px-3 py-2 text-sm font-light tracking-wide">
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>

          {/* Compensation Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {compensationStats.map((stat) => (
              <div
                key={stat.name}
                className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg hover:border-[#E5E4E2]/30 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      stat.changeType === 'positive' 
                        ? 'bg-gradient-to-br from-green-400/20 to-green-600/20 group-hover:from-green-400/30 group-hover:to-green-600/30' 
                        : stat.changeType === 'negative'
                        ? 'bg-gradient-to-br from-red-400/20 to-red-600/20 group-hover:from-red-400/30 group-hover:to-red-600/30'
                        : 'bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 group-hover:from-[#D4AF37]/30 group-hover:to-[#B8941F]/30'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {stat.change && (
                      <div className={`flex items-center text-sm font-light tracking-wide ${
                        stat.changeType === 'positive' ? 'text-green-400' : 
                        stat.changeType === 'negative' ? 'text-red-400' : 'text-white/60'
                      }`}>
                        {stat.changeType === 'positive' && (
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {stat.changeType === 'negative' && (
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {stat.change}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-light text-white/70 mb-2 tracking-wide">
                      {stat.name}
                    </h3>
                    <div className="text-3xl font-light text-white tracking-wider mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-white/50 font-light tracking-wide">
                      {stat.period}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Payouts */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-light text-white tracking-widest">
                  Recent Payouts
                </h3>
                <button className="text-[#D4AF37] hover:text-[#B8941F] text-sm font-light tracking-wide transition-colors duration-200">
                  View All
                </button>
              </div>
              
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[#E5E4E2]/20">
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Sessions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E4E2]/20">
                    {recentPayouts.map((payout) => (
                      <tr key={payout.id} className="hover:bg-[#E5E4E2]/5 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                          {payout.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light tracking-wide">
                          {payout.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                          {payout.sessions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-light leading-5 rounded-full tracking-wide text-green-400 bg-green-400/10">
                            {payout.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Compensation Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rate Structure */}
            <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
                  Rate Structure
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Base Session Rate</span>
                    <span className="text-sm text-white font-light tracking-wide">$75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Extended Session (+30min)</span>
                    <span className="text-sm text-white font-light tracking-wide">$100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Weekend Bonus</span>
                    <span className="text-sm text-green-400 font-light tracking-wide">+15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Performance Bonus</span>
                    <span className="text-sm text-[#D4AF37] font-light tracking-wide">Up to +20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  Payment Schedule
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Payment Frequency</span>
                    <span className="text-sm text-white font-light tracking-wide">Bi-weekly</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Next Payment</span>
                    <span className="text-sm text-green-400 font-light tracking-wide">Dec 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Payment Method</span>
                    <span className="text-sm text-white font-light tracking-wide">Direct Deposit</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70 font-light tracking-wide">Tax Documents</span>
                    <span className="text-sm text-blue-400 font-light tracking-wide">1099 Available</span>
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

  // Only allow Guide role
  if ((session.user as any)?.role !== 'GUIDE') {
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
