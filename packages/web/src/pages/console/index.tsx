import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

export default function ConsoleDashboard() {
  const { data: session } = useSession();

  const stats = [
    { name: 'Total Profiles Created', value: '12', change: '+2 this week' },
    { name: 'Active Activation Codes', value: '3', change: '2 pending redemption' },
    { name: 'This Month Sessions', value: '8', change: '+4 from last month' },
    { name: 'Success Rate', value: '95%', change: 'Profile completion rate' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'profile_created',
      description: 'Created profile for sarah@example.com',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'code_redeemed',
      description: 'Activation code PNR-8X2-K7 redeemed',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'profile_created',
      description: 'Created profile for john@example.com',
      time: '1 day ago',
    },
  ];

  return (
    <>
      <Head>
        <title>Coach Dashboard - Pentara Console</title>
        <meta name="description" content="Pentara coach console dashboard" />
      </Head>

      <ConsoleLayout>
        <div className="px-4 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-secondary-900">
              Welcome back, {session?.user?.name || 'Coach'}
            </h1>
            <p className="mt-2 text-secondary-600">
              Here's what's happening with your Pentara onboarding sessions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-secondary-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-lg font-medium text-secondary-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-secondary-600">
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/console/onboarding"
                  className="block w-full text-left p-3 border border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">Start New Onboarding</div>
                      <div className="text-sm text-secondary-600">Begin questionnaire for new user</div>
                    </div>
                  </div>
                </Link>
                
                <Link
                  href="/console/codes"
                  className="block w-full text-left p-3 border border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2m0 0V3a2 2 0 00-2-2m2 2a2 2 0 012 2M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">Generate Activation Code</div>
                      <div className="text-sm text-secondary-600">Create new activation code for user</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-secondary-900">{activity.description}</p>
                      <p className="text-xs text-secondary-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-primary-800">
                  Need help with onboarding sessions?
                </h3>
                <div className="mt-2 text-sm text-primary-700">
                  <p>
                    Check out the onboarding guide or reach out to the team for support.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      type="button"
                      className="bg-primary-50 px-2 py-1.5 rounded-md text-sm font-medium text-primary-800 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-50 focus:ring-primary-600"
                    >
                      View Guide
                    </button>
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
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
