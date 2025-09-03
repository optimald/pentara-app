import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface GuidesPageProps {
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

export default function GuidesPage({ session }: GuidesPageProps) {
  // Mock guide data - using static data to avoid SSR issues
  const guides = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@pentara.app',
      status: 'active',
      sessionsCompleted: 156,
      rating: 4.9,
      specialties: ['Anxiety', 'Career Transitions'],
      joinDate: '2024-01-15',
      lastActive: '2024-12-01',
      totalEarnings: '$11,700'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      email: 'marcus@pentara.app',
      status: 'active',
      sessionsCompleted: 134,
      rating: 4.8,
      specialties: ['Relationships', 'Self-Esteem'],
      joinDate: '2024-02-03',
      lastActive: '2024-12-01',
      totalEarnings: '$10,050'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      email: 'emma@pentara.app',
      status: 'pending',
      sessionsCompleted: 89,
      rating: 4.7,
      specialties: ['Stress Management', 'Mindfulness'],
      joinDate: '2024-03-12',
      lastActive: '2024-11-30',
      totalEarnings: '$6,675'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david@pentara.app',
      status: 'active',
      sessionsCompleted: 201,
      rating: 4.9,
      specialties: ['Life Coaching', 'Goal Setting'],
      joinDate: '2023-11-08',
      lastActive: '2024-12-01',
      totalEarnings: '$15,075'
    }
  ];

  // For now, show all guides without filtering to avoid state issues
  const filteredGuides = guides;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'inactive':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  return (
    <>
      <Head>
        <title>Guide Management - Pentara Console</title>
        <meta name="description" content="Manage guides, monitor performance, and oversee platform operations" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/guides">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-light text-white tracking-widest">
                Guide Management
              </h1>
              <p className="text-white/70 font-light tracking-wide">
                Oversee guide performance, manage applications, and monitor platform quality
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300">
                Export Data
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300">
                Invite New Guide
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Total Guides
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        {guides.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Active Guides
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        {guides.filter(g => g.status === 'active').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Pending Review
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        {guides.filter(g => g.status === 'pending').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Avg Rating
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        4.8
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search - Static for now */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <select className="bg-transparent border border-[#E5E4E2]/30 text-white rounded-md px-3 py-2 text-sm font-light tracking-wide">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full sm:w-64 px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
              />
            </div>
          </div>

          {/* Guides Table */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[#E5E4E2]/20">
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Guide</th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Sessions</th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Earnings</th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E4E2]/20">
                    {filteredGuides.map((guide) => (
                      <tr key={guide.id} className="hover:bg-[#E5E4E2]/5 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#B8941F]/30 flex items-center justify-center">
                                <span className="text-sm font-light text-[#D4AF37] tracking-wide">
                                  {guide.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-light text-white tracking-wide">{guide.name}</div>
                              <div className="text-sm text-white/60 font-light tracking-wide">{guide.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-light leading-5 rounded-full tracking-wide ${getStatusColor(guide.status)}`}>
                            {guide.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light tracking-wide">
                          {guide.sessionsCompleted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-white font-light tracking-wide">{guide.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light tracking-wide">
                          {guide.totalEarnings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                          {guide.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-light">
                          <div className="flex space-x-2">
                            <button className="text-[#D4AF37] hover:text-[#B8941F] tracking-wide transition-colors duration-200">
                              View
                            </button>
                            <button className="text-blue-400 hover:text-blue-300 tracking-wide transition-colors duration-200">
                              Edit
                            </button>
                            {guide.status === 'pending' && (
                              <button className="text-green-400 hover:text-green-300 tracking-wide transition-colors duration-200">
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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