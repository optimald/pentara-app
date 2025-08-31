import { NextPage } from 'next';
import Head from 'next/head';
import AdminLayout from '@/components/Admin/AdminLayout';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  KeyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: NextPage = () => {
  // Mock data - in real app, fetch from API
  const stats = {
    totalCoaches: 3,
    totalProfiles: 47,
    activeActivationCodes: 12,
    thisMonthOnboardings: 23,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'profile_created',
      message: 'New profile created by Coach Sarah',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'coach_added',
      message: 'New coach account created: Mike Johnson',
      timestamp: '1 day ago',
    },
    {
      id: 3,
      type: 'activation_code_used',
      message: 'Activation code PNR-8X2-K7 redeemed',
      timestamp: '2 days ago',
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - Pentara</title>
        <meta name="description" content="Pentara Admin Dashboard" />
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-dark-800">
              Admin Dashboard
            </h1>
            <p className="text-dark-600 mt-2">
              Manage coaches, profiles, and monitor system health
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-600">Total Coaches</p>
                  <p className="text-2xl font-bold text-dark-800">{stats.totalCoaches}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-600">Total Profiles</p>
                  <p className="text-2xl font-bold text-dark-800">{stats.totalProfiles}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gold-100 rounded-lg">
                  <KeyIcon className="h-6 w-6 text-gold-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-600">Active Codes</p>
                  <p className="text-2xl font-bold text-dark-800">{stats.activeActivationCodes}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-600">This Month</p>
                  <p className="text-2xl font-bold text-dark-800">{stats.thisMonthOnboardings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="px-6 py-4 border-b border-dark-200">
              <h2 className="text-xl font-serif font-semibold text-dark-800">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-dark-800 font-medium">{activity.message}</p>
                      <p className="text-sm text-dark-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-dark-800 mb-4">
                Coach Management
              </h3>
              <p className="text-dark-600 mb-4">
                Add new coaches, manage permissions, and view coach activity.
              </p>
              <a
                href="/admin/coaches"
                className="btn-primary inline-flex items-center"
              >
                Manage Coaches
              </a>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-dark-800 mb-4">
                Profile Overview
              </h3>
              <p className="text-dark-600 mb-4">
                View all user profiles, activation codes, and usage statistics.
              </p>
              <a
                href="/admin/profiles"
                className="btn-primary inline-flex items-center"
              >
                View Profiles
              </a>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-dark-800 mb-4">
                System Analytics
              </h3>
              <p className="text-dark-600 mb-4">
                Monitor system performance, costs, and user engagement metrics.
              </p>
              <a
                href="/admin/analytics"
                className="btn-primary inline-flex items-center"
              >
                View Analytics
              </a>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;

// Force server-side rendering to avoid static generation issues
export async function getServerSideProps() {
  return {
    props: {
      // Empty props to force SSR
    },
  };
}
