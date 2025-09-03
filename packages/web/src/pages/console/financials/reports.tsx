import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../../components/Console/ConsoleLayout';
import ReportsTab from '../../../components/Financials/ReportsTab';


interface ReportsPageProps {
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

export default function ReportsPage({ session }: ReportsPageProps) {
  return (
    <>
      <Head>
        <title>Reports - Pentara Console</title>
        <meta name="description" content="Financial reports and document generation" />
      </Head>

      <ConsoleLayout session={session}>
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

          {/* Tab Navigation */}
          <div className="border-b border-[#E5E4E2]/20">
            <nav className="-mb-px flex space-x-8">
              <a href="/console/financials" className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-white/60 hover:text-white/80 hover:border-[#E5E4E2]/30 font-light text-sm tracking-wide transition-all duration-200">
                <span className="mr-2 text-white/40 group-hover:text-white/60">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </span>
                Overview
              </a>
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
              <div className="group inline-flex items-center py-4 px-1 border-b-2 border-[#D4AF37] text-[#D4AF37] font-light text-sm tracking-wide">
                <span className="mr-2 text-[#D4AF37]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </span>
                Reports
              </div>
            </nav>
          </div>

          {/* Reports Content */}
          <ReportsTab />
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
