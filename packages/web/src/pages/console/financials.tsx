import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';
import OverviewTab from '../../components/Financials/OverviewTab';

interface FinancialsPageProps {
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

export default function FinancialsPage({ session }: FinancialsPageProps) {
  // Mock financial data with more realistic values for demo
  const revenueMetrics = [
    { name: 'Monthly Revenue', value: '$12,450', change: '+18%', changeType: 'positive' as const, period: 'vs last month', icon: 'revenue' },
    { name: 'Total Payouts', value: '$9,338', change: '+15%', changeType: 'positive' as const, period: 'this month', icon: 'payout' },
    { name: 'Platform Margin', value: '25%', change: '+0%', changeType: 'neutral' as const, period: 'commission rate', icon: 'margin' },
    { name: 'Active Revenue', value: '$8,920', change: '+22%', changeType: 'positive' as const, period: 'from active guides', icon: 'active' },
    { name: 'Pending Payouts', value: '$2,115', change: '+5%', changeType: 'neutral' as const, period: 'awaiting payment', icon: 'pending' },
    { name: 'Annual Projection', value: '$149,400', change: '+28%', changeType: 'positive' as const, period: 'based on current', icon: 'projection' },
  ];

  const recentTransactions = [
    { id: 1, type: 'payout', guide: 'Sarah Chen', amount: '$450', date: 'Dec 1, 2024', status: 'completed', sessions: 6 },
    { id: 2, type: 'revenue', guide: 'Marcus Rodriguez', amount: '$225', date: 'Nov 30, 2024', status: 'completed', sessions: 3 },
    { id: 3, type: 'payout', guide: 'Emily Watson', amount: '$675', date: 'Nov 29, 2024', status: 'pending', sessions: 9 },
    { id: 4, type: 'revenue', guide: 'David Kim', amount: '$300', date: 'Nov 28, 2024', status: 'completed', sessions: 4 },
    { id: 5, type: 'payout', guide: 'Lisa Thompson', amount: '$525', date: 'Nov 27, 2024', status: 'completed', sessions: 7 },
    { id: 6, type: 'revenue', guide: 'James Wilson', amount: '$375', date: 'Nov 26, 2024', status: 'completed', sessions: 5 },
    { id: 7, type: 'payout', guide: 'Anna Martinez', amount: '$600', date: 'Nov 25, 2024', status: 'failed', sessions: 8 },
    { id: 8, type: 'revenue', guide: 'Michael Brown', amount: '$150', date: 'Nov 24, 2024', status: 'completed', sessions: 2 },
    { id: 9, type: 'payout', guide: 'Jennifer Davis', amount: '$750', date: 'Nov 23, 2024', status: 'completed', sessions: 10 },
    { id: 10, type: 'revenue', guide: 'Robert Johnson', amount: '$450', date: 'Nov 22, 2024', status: 'completed', sessions: 6 },
  ];

  const monthlyBreakdown = [
    { month: 'November 2024', revenue: '$12,450', payouts: '$9,338', margin: '$3,112', sessions: 156, growth: '+18%' },
    { month: 'October 2024', revenue: '$10,550', payouts: '$7,913', margin: '$2,637', sessions: 132, growth: '+12%' },
    { month: 'September 2024', revenue: '$9,420', payouts: '$7,065', margin: '$2,355', sessions: 118, growth: '+8%' },
    { month: 'August 2024', revenue: '$8,730', payouts: '$6,548', margin: '$2,182', sessions: 109, growth: '+15%' },
    { month: 'July 2024', revenue: '$7,590', payouts: '$5,693', margin: '$1,897', sessions: 95, growth: '+22%' },
    { month: 'June 2024', revenue: '$6,220', payouts: '$4,665', margin: '$1,555', sessions: 78, growth: '+9%' },
  ];

  return (
    <>
      <Head>
        <title>Financial Overview - Pentara Console</title>
        <meta name="description" content="Platform revenue, guide payouts, and financial analytics" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/financials">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-white tracking-widest">Financial Overview</h1>
              <p className="mt-1 text-sm text-white/60 font-light tracking-wide">
                Platform revenue, guide payouts, and financial analytics
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

          {/* Financial Overview - Static for now to avoid SSR issues */}
          <div className="space-y-6">
            {/* Tab Navigation with Working Links */}
            <div className="border-b border-[#E5E4E2]/20">
              <nav className="-mb-px flex space-x-8">
                <div className="group inline-flex items-center py-4 px-1 border-b-2 border-[#D4AF37] text-[#D4AF37] font-light text-sm tracking-wide">
                  <span className="mr-2 text-[#D4AF37]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </span>
                  Overview
                </div>
                <a href="/console/financials/transactions" className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-white/60 hover:text-white/80 hover:border-[#E5E4E2]/30 font-light text-sm tracking-wide transition-all duration-200">
                  <span className="mr-2 text-white/40 group-hover:text-white/60">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Transactions
                </a>
                <a href="/console/financials/analytics" className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-white/60 hover:text-white/80 hover:border-[#E5E4E2]/30 font-light text-sm tracking-wide transition-all duration-200">
                  <span className="mr-2 text-white/40 group-hover:text-white/60">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Analytics
                </a>
                <a href="/console/financials/reports" className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-white/60 hover:text-white/80 hover:border-[#E5E4E2]/30 font-light text-sm tracking-wide transition-all duration-200">
                  <span className="mr-2 text-white/40 group-hover:text-white/60">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Reports
                </a>
              </nav>
            </div>

            {/* Overview Tab Content */}
            <OverviewTab
              revenueMetrics={revenueMetrics}
              recentTransactions={recentTransactions}
              monthlyBreakdown={monthlyBreakdown}
            />
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
