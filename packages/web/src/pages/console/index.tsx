import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

export default function ConsoleDashboard() {
  const stats = [
    { name: 'Total Users', value: '0', change: '+0%', changeType: 'positive' },
    { name: 'Active This Month', value: '0', change: '+0%', changeType: 'positive' },
    { name: 'Onboarding Sessions', value: '0', change: '+0%', changeType: 'positive' },
    { name: 'Revenue', value: '$0', change: '+0%', changeType: 'positive' },
  ];

  const recentActivity = [
    { id: 1, user: 'No users yet', action: 'No activity', time: 'N/A' },
  ];

  return (
    <>
      <Head>
        <title>Coach Dashboard - Pentara</title>
        <meta name="description" content="Pentara coach dashboard" />
      </Head>

      <ConsoleLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-serif font-bold text-secondary-900">
              Dashboard
            </h1>
            <p className="text-secondary-600">
              Welcome back, Coach
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">📊</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-secondary-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-secondary-900">
                            {stat.value}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
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

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/console/onboarding"
                  className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">👥</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-secondary-900">
                      New Onboarding
                    </p>
                    <p className="text-sm text-secondary-500">
                      Start a new user onboarding session
                    </p>
                  </div>
                </Link>

                <Link
                  href="/admin/coaches"
                  className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">👨‍💼</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-secondary-900">
                      Manage Coaches
                    </p>
                    <p className="text-sm text-secondary-500">
                      View and manage coach accounts
                    </p>
                  </div>
                </Link>

                <Link
                  href="/admin/profiles"
                  className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📋</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-secondary-900">
                      View Profiles
                    </p>
                    <p className="text-sm text-secondary-500">
                      Browse user profiles and manuals
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">
                Recent Activity
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-secondary-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-secondary-400 flex items-center justify-center ring-8 ring-white">
                              <span className="text-white text-sm">👤</span>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-secondary-500">
                                {activity.action} by{' '}
                                <span className="font-medium text-secondary-900">
                                  {activity.user}
                                </span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-secondary-500">
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
