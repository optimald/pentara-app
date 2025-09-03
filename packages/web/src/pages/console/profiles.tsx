import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface ProfilesPageProps {
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

export default function ProfilesPage({ session }: ProfilesPageProps) {
  // Simple modal state without React hooks - using DOM manipulation
  const showAddClientModal = () => {
    const modal = document.getElementById('add-client-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  };

  const hideAddClientModal = () => {
    const modal = document.getElementById('add-client-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  // Schedule session modal functions
  const showScheduleModal = (clientId: number, clientName: string) => {
    const modal = document.getElementById('schedule-session-modal');
    const clientNameElement = document.getElementById('schedule-client-name');
    const clientIdInput = document.getElementById('schedule-client-id') as HTMLInputElement;
    
    if (modal && clientNameElement && clientIdInput) {
      clientNameElement.textContent = clientName;
      clientIdInput.value = clientId.toString();
      modal.classList.remove('hidden');
    }
  };

  const hideScheduleModal = () => {
    const modal = document.getElementById('schedule-session-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  const handleScheduleSession = () => {
    const form = document.getElementById('schedule-session-form') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      const sessionData = {
        clientId: formData.get('clientId'),
        clientName: document.getElementById('schedule-client-name')?.textContent,
        sessionType: formData.get('sessionType'),
        date: formData.get('date'),
        time: formData.get('time'),
        duration: formData.get('duration'),
        notes: formData.get('notes')
      };
      
      console.log('Scheduling session:', sessionData);
      
      // In a real app, this would make an API call
      alert(`Session scheduled for ${sessionData.clientName}!\n\nType: ${sessionData.sessionType}\nDate: ${sessionData.date}\nTime: ${sessionData.time}\nDuration: ${sessionData.duration} minutes\n\n(This is a demo)`);
      
      // Reset form and close modal
      form.reset();
      hideScheduleModal();
    }
  };

  const handleAddClient = () => {
    // Get form values
    const form = document.getElementById('add-client-form') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      const clientData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        occupation: formData.get('occupation')
      };
      
      console.log('Adding new client:', clientData);
      
      // In a real app, this would make an API call
      alert(`Client ${clientData.name} added successfully! (This is a demo)`);
      
      // Reset form and close modal
      form.reset();
      hideAddClientModal();
    }
  };

  // Mock client data with nested sessions
  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'active',
      joinDate: '2024-01-10',
      lastSession: '2024-01-18',
      profileComplete: true,
      councilGenerated: true,
      totalSessions: 3,
      sessions: [
        {
          id: 1,
          date: '2024-01-10',
          type: 'Initial Consultation',
          duration: 45,
          status: 'completed',
          notes: 'Great first session, client is motivated and ready to work on leadership goals.'
        },
        {
          id: 2,
          date: '2024-01-15',
          type: 'Follow-up Session',
          duration: 45,
          status: 'completed',
          notes: 'Discussed progress on action items from previous session.'
        },
        {
          id: 3,
          date: '2024-01-18',
          type: 'Strategy Session',
          duration: 60,
          status: 'completed',
          notes: 'Developed comprehensive strategy for upcoming leadership challenges.'
        }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      status: 'pending',
      joinDate: '2024-01-12',
      lastSession: null,
      profileComplete: false,
      councilGenerated: false,
      totalSessions: 0,
      sessions: []
    }
  ];

  // For now, show all clients without filtering
  const filteredClients = clients;

  const profileStats = [
    { name: 'Total Clients', value: clients.length.toString(), change: '+0%', changeType: 'positive' },
    { name: 'Active Clients', value: clients.filter(c => c.status === 'active').length.toString(), change: '+0%', changeType: 'positive' },
    { name: 'Completed Profiles', value: clients.filter(c => c.profileComplete).length.toString(), change: '+0%', changeType: 'positive' },
    { name: 'Total Sessions', value: clients.reduce((sum, c) => sum + c.totalSessions, 0).toString(), change: '+0%', changeType: 'positive' },
  ];

  return (
    <>
      <Head>
        <title>My Clients - Pentara Console</title>
        <meta name="description" content="Manage your clients and their sessions" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/profiles">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-light text-white tracking-widest">
                My Clients
              </h1>
              <p className="text-white/70 font-light tracking-wide">
                Manage your clients and track their session progress
              </p>
            </div>
            <button 
              onClick={showAddClientModal}
              className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300"
            >
              Add New Client
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {profileStats.map((stat) => (
              <div
                key={stat.name}
                className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
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

          {/* Search and Filters - Static for now */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search clients by name or email..."
                      className="block w-full pl-10 pr-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <select className="bg-transparent border border-[#E5E4E2]/30 text-white rounded-md px-3 py-2 text-sm font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Clients List */}
          <div className="space-y-4">
            {filteredClients.length === 0 ? (
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E5E4E2]/20 to-[#C0C0C0]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white/60 font-light tracking-wide">No clients found</p>
                  <p className="text-white/40 text-sm font-light tracking-wide mt-1">
                    Clients will appear when they complete onboarding
                  </p>
                </div>
              </div>
            ) : (
              filteredClients.map((client) => (
                <div key={client.id} className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                  <div className="px-6 py-4">
                    {/* Client Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/30 to-[#B8941F]/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-white tracking-wide">{client.name}</h3>
                          <p className="text-white/60 text-sm font-light tracking-wide">{client.email}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-light leading-5 rounded-full tracking-wide ${
                              client.status === 'active' ? 'text-green-400 bg-green-400/10' :
                              client.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' :
                              'text-red-400 bg-red-400/10'
                            }`}>
                              {client.status}
                            </span>
                            <span className="text-xs text-white/50 font-light tracking-wide">
                              Joined {client.joinDate}
                            </span>
                            <span className="text-xs text-white/50 font-light tracking-wide">
                              {client.totalSessions} sessions
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <a
                          href={`/console/client/${client.id}`}
                          className="text-[#D4AF37] hover:text-[#B8941F] text-sm font-light tracking-wide transition-colors duration-200"
                        >
                          View Sessions
                        </a>
                        <button 
                          onClick={() => showScheduleModal(client.id, client.name)}
                          className="px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded text-sm font-light tracking-wide hover:bg-[#D4AF37]/20 transition-all duration-300"
                        >
                          Schedule Session
                        </button>
                      </div>
                    </div>


                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Client Modal */}
          <div id="add-client-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-light text-white tracking-widest">Add New Client</h3>
                <button 
                  onClick={hideAddClientModal}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <form id="add-client-form" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    placeholder="Enter client's full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    placeholder="client@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    placeholder="e.g., Product Manager, CEO, etc."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={hideAddClientModal}
                    className="flex-1 px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddClient}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300"
                  >
                    Add Client
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Schedule Session Modal */}
          <div id="schedule-session-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg p-6 w-full max-w-lg mx-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-serif font-light text-white tracking-widest">Schedule Session</h3>
                  <p className="text-sm text-white/60 font-light tracking-wide">
                    Client: <span id="schedule-client-name" className="text-[#D4AF37]"></span>
                  </p>
                </div>
                <button 
                  onClick={hideScheduleModal}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <form id="schedule-session-form" className="space-y-4">
                <input type="hidden" id="schedule-client-id" name="clientId" />
                
                <div>
                  <label htmlFor="sessionType" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Session Type *
                  </label>
                  <select
                    id="sessionType"
                    name="sessionType"
                    required
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-light tracking-wide"
                  >
                    <option value="">Select session type</option>
                    <option value="Initial Onboarding">Initial Onboarding Session</option>
                    <option value="Follow-up">Follow-up Session</option>
                    <option value="Strategy">Strategy Session</option>
                    <option value="Check-in">Check-in Session</option>
                    <option value="Crisis Support">Crisis Support Session</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-light tracking-wide"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      required
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-light tracking-wide"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Duration *
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    required
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-light tracking-wide"
                  >
                    <option value="">Select duration</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                    Session Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide resize-none"
                    placeholder="Add any preparation notes or agenda items..."
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={hideScheduleModal}
                    className="flex-1 px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleScheduleSession}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300"
                  >
                    Schedule Session
                  </button>
                </div>
              </form>
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