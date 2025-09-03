import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface SchedulePageProps {
  session: {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
    expires: string;
  };
}

export default function SchedulePage({ session }: SchedulePageProps) {
  // Mock data for schedule stats
  const scheduleStats = [
    { name: 'Today\'s Sessions', value: '3', subtitle: '2 confirmed, 1 pending' },
    { name: 'This Week', value: '12', subtitle: '8 completed, 4 upcoming' },
    { name: 'Available Hours', value: '24', subtitle: 'Next 7 days' },
    { name: 'Completion Rate', value: '94%', subtitle: 'Last 30 days' },
  ];

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      type: 'Initial Consultation',
      client: 'Sarah M.',
      date: 'Today',
      time: '2:00 PM',
    },
    {
      id: 2,
      type: 'Follow-up Session',
      client: 'Michael R.',
      date: 'Tomorrow',
      time: '10:00 AM',
    },
    {
      id: 3,
      type: 'Initial Consultation',
      client: 'Emma L.',
      date: 'Dec 5',
      time: '3:30 PM',
    },
  ];

  return (
    <>
      <Head>
        <title>Schedule - Pentara Console</title>
        <meta name="description" content="Manage your session schedule and availability" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/schedule">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-white tracking-widest">
                Schedule
              </h1>
              <p className="text-white/70 font-light tracking-wide">
                Manage your session schedule and availability
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300">
                Block Time
              </button>
            </div>
          </div>

          {/* Schedule Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {scheduleStats.map((stat) => (
              <div
                key={stat.name}
                className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
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
                        </dd>
                        <dd className="text-xs text-white/50 font-light tracking-wide mt-1">
                          {stat.subtitle}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Schedule Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2 bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-light text-white tracking-widest">
                    Calendar View
                  </h3>
                  <div className="flex space-x-2">
                    <button 
                      id="week-view-btn"
                      className="px-3 py-1 text-sm border border-[#E5E4E2]/30 text-white/70 rounded-md font-light tracking-wide hover:bg-[#E5E4E2]/10 transition-all duration-200"
                    >
                      Week
                    </button>
                    <button 
                      id="month-view-btn"
                      className="px-3 py-1 text-sm border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded-md font-light tracking-wide"
                    >
                      Month
                    </button>
                  </div>
                </div>

                {/* Calendar Navigation */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      id="prev-btn"
                      className="p-2 text-white/70 hover:text-white hover:bg-[#E5E4E2]/10 rounded-md transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <h4 id="date-display" className="text-lg font-light text-white tracking-wide min-w-[200px] text-center">
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button 
                      id="next-btn"
                      className="p-2 text-white/70 hover:text-white hover:bg-[#E5E4E2]/10 rounded-md transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <button 
                    id="today-btn"
                    className="px-3 py-1 text-sm border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-200"
                  >
                    Today
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="border border-[#E5E4E2]/20 rounded-lg p-4">
                  <div className="h-96">
                    <div id="calendar-grid" className="grid grid-cols-7 gap-1 h-full">
                      {/* Days of week header */}
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-light text-white/60 p-2 tracking-wide">
                          {day}
                        </div>
                      ))}

                      {/* Calendar days - static initial content */}
                      {Array.from({ length: 35 }, (_, i) => (
                        <div
                          key={i}
                          className="p-1 text-xs font-light tracking-wide border border-[#E5E4E2]/10 cursor-pointer transition-all duration-200 text-white/70 hover:bg-[#E5E4E2]/5"
                        >
                          <div className="h-full flex flex-col">
                            <span className="text-center">
                              {i > 6 && i < 32 ? i - 6 : ''}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="space-y-6">
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Upcoming Sessions
                  </h3>

                  <div className="space-y-3">
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-white/60 font-light tracking-wide">No sessions scheduled</div>
                        <div className="text-white/40 text-sm font-light tracking-wide mt-1">
                          Schedule your first session to get started
                        </div>
                      </div>
                    ) : (
                      upcomingSessions.map((session) => (
                        <div key={session.id} className="p-3 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm font-light text-white tracking-wide">
                                {session.type}
                              </div>
                              <div className="text-xs text-white/60 font-light tracking-wide">
                                with {session.client}
                              </div>
                            </div>
                            <div className="text-xs text-white/50 font-light tracking-wide text-right">
                              {session.date} at {session.time}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <button 
                    id="schedule-session-btn"
                    className="mt-4 w-full px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded-md hover:bg-[#D4AF37]/20 font-light tracking-wide transition-all duration-300"
                  >
                    Schedule New Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConsoleLayout>

      {/* Session Modal */}
      <div id="session-modal" className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden">
        <div className="bg-[#0a0a0a] border border-[#E5E4E2]/20 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-light text-white mb-4 tracking-widest">Schedule New Session</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                Session Type
              </label>
              <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                <option value="initial">Initial Consultation</option>
                <option value="followup">Follow-up Session</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                Date
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                Time
              </label>
              <input 
                type="time" 
                className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                Client Name
              </label>
              <input 
                type="text" 
                placeholder="Enter client name"
                className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button 
              id="cancel-session-btn"
              className="flex-1 px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              id="confirm-session-btn"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Simple JavaScript for basic interactivity */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Simple button click handlers
            const weekBtn = document.getElementById('week-view-btn');
            const monthBtn = document.getElementById('month-view-btn');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const todayBtn = document.getElementById('today-btn');
            const scheduleBtn = document.getElementById('schedule-session-btn');
            const cancelBtn = document.getElementById('cancel-session-btn');
            const confirmBtn = document.getElementById('confirm-session-btn');
            const modal = document.getElementById('session-modal');

            if (weekBtn) {
              weekBtn.onclick = function() {
                alert('Week view - coming soon!');
              };
            }

            if (monthBtn) {
              monthBtn.onclick = function() {
                alert('Month view is currently active');
              };
            }

            if (prevBtn) {
              prevBtn.onclick = function() {
                alert('Previous month - coming soon!');
              };
            }

            if (nextBtn) {
              nextBtn.onclick = function() {
                alert('Next month - coming soon!');
              };
            }

            if (todayBtn) {
              todayBtn.onclick = function() {
                alert('Jump to today - coming soon!');
              };
            }

            if (scheduleBtn) {
              scheduleBtn.onclick = function() {
                if (modal) modal.classList.remove('hidden');
              };
            }

            if (cancelBtn) {
              cancelBtn.onclick = function() {
                if (modal) modal.classList.add('hidden');
              };
            }

            if (confirmBtn) {
              confirmBtn.onclick = function() {
                alert('Session scheduled successfully!');
                if (modal) modal.classList.add('hidden');
              };
            }

            if (modal) {
              modal.onclick = function(e) {
                if (e.target === this) {
                  this.classList.add('hidden');
                }
              };
            }
          });
        `
      }} />
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