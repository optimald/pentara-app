import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface WorkingHoursPageProps {
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

export default function WorkingHoursPage({ session }: WorkingHoursPageProps) {
  return (
    <>
      <Head>
        <title>Working Hours - Pentara Console</title>
        <meta name="description" content="Manage your availability and working hours" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/hours">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-white tracking-widest">Working Hours</h1>
              <p className="mt-1 text-sm text-white/60 font-light tracking-wide">
                Set your availability and manage your schedule preferences
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300">
                Reset to Default
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300">
                Save Schedule
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Working Hours */}
            <div className="lg:col-span-2 space-y-6">
              {/* Weekly Schedule */}
              <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-6 tracking-widest">
                    Weekly Schedule
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { day: 'Monday', short: 'Mon' },
                      { day: 'Tuesday', short: 'Tue' },
                      { day: 'Wednesday', short: 'Wed' },
                      { day: 'Thursday', short: 'Thu' },
                      { day: 'Friday', short: 'Fri' },
                      { day: 'Saturday', short: 'Sat' },
                      { day: 'Sunday', short: 'Sun' }
                    ].map((dayInfo) => (
                      <div key={dayInfo.day} className="flex items-center space-x-4 p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
                        <div className="w-24">
                          <span className="text-sm font-light text-white tracking-wide">
                            {dayInfo.day}
                          </span>
                        </div>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={dayInfo.day !== 'Sunday'}
                            className="rounded border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 bg-transparent"
                          />
                          <span className="ml-2 text-sm text-white/70 font-light tracking-wide">
                            Available
                          </span>
                        </label>
                        
                        <div className="flex items-center space-x-2 flex-1">
                          <input
                            type="time"
                            defaultValue="09:00"
                            className="px-2 py-1 bg-transparent border border-[#D4AF37]/30 text-white rounded text-sm focus:border-[#D4AF37] focus:outline-none font-light"
                          />
                          <span className="text-white/50">to</span>
                          <input
                            type="time"
                            defaultValue="17:00"
                            className="px-2 py-1 bg-transparent border border-[#D4AF37]/30 text-white rounded text-sm focus:border-[#D4AF37] focus:outline-none font-light"
                          />
                        </div>
                        
                        <button className="px-3 py-1 text-xs border border-[#D4AF37]/30 text-[#D4AF37] rounded hover:bg-[#D4AF37]/10 font-light tracking-wide transition-all duration-300">
                          Add Break
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Session Preferences */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-6 tracking-widest">
                    Session Preferences
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Buffer Time Between Sessions
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="0">No buffer</option>
                        <option value="15" selected>15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Maximum Sessions Per Day
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="3">3 sessions</option>
                        <option value="4">4 sessions</option>
                        <option value="5" selected>5 sessions</option>
                        <option value="6">6 sessions</option>
                        <option value="8">8 sessions</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Advance Booking Window
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="24">24 hours</option>
                        <option value="48" selected>48 hours</option>
                        <option value="72">3 days</option>
                        <option value="168">1 week</option>
                        <option value="336">2 weeks</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Zone & Location */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-6 tracking-widest">
                    Time Zone & Location Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Primary Time Zone
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="America/New_York">Eastern Time (EST/EDT)</option>
                        <option value="America/Chicago">Central Time (CST/CDT)</option>
                        <option value="America/Denver">Mountain Time (MST/MDT)</option>
                        <option value="America/Los_Angeles" selected>Pacific Time (PST/PDT)</option>
                        <option value="America/Anchorage">Alaska Time (AKST/AKDT)</option>
                        <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Session Format Preference
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="video" selected>Video calls only</option>
                        <option value="phone">Phone calls only</option>
                        <option value="both">Both video and phone</option>
                        <option value="in-person">In-person sessions</option>
                        <option value="flexible">Client preference</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-400/10 border border-blue-400/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-light text-blue-400 tracking-wide">Time Zone Display</p>
                        <p className="text-xs text-white/70 font-light tracking-wide mt-1">
                          Your availability will be displayed to clients in their local time zone automatically. 
                          Your schedule will always show times in your selected time zone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Break Times & Exceptions */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-6 tracking-widest">
                    Breaks & Time Off
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-[#E5E4E2]/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-light text-white tracking-wide">Daily Lunch Break</h4>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-[#E5E4E2]/30 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 bg-transparent"
                          />
                          <span className="ml-2 text-sm text-white/70 font-light tracking-wide">
                            Enabled
                          </span>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-light text-white/60 mb-1 tracking-wide">
                            Start Time
                          </label>
                          <input
                            type="time"
                            defaultValue="12:00"
                            className="w-full px-2 py-1 bg-transparent border border-[#E5E4E2]/30 text-white rounded text-sm focus:border-[#D4AF37] focus:outline-none font-light"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-light text-white/60 mb-1 tracking-wide">
                            End Time
                          </label>
                          <input
                            type="time"
                            defaultValue="13:00"
                            className="w-full px-2 py-1 bg-transparent border border-[#E5E4E2]/30 text-white rounded text-sm focus:border-[#D4AF37] focus:outline-none font-light"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-light text-white/60 mb-1 tracking-wide">
                            Duration
                          </label>
                          <select className="w-full px-2 py-1 bg-transparent border border-[#E5E4E2]/30 text-white rounded text-sm focus:border-[#D4AF37] focus:outline-none font-light">
                            <option value="30">30 min</option>
                            <option value="60" selected>1 hour</option>
                            <option value="90">1.5 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-yellow-400/20 bg-yellow-400/5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-light text-white tracking-wide">Upcoming Time Off</h4>
                        <button className="px-3 py-1 text-xs border border-yellow-400/30 text-yellow-400 rounded hover:bg-yellow-400/10 font-light tracking-wide transition-all duration-300">
                          Add Time Off
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-yellow-400/10 border border-yellow-400/20 rounded">
                          <div>
                            <p className="text-sm font-light text-white tracking-wide">Holiday Break</p>
                            <p className="text-xs text-white/60 font-light tracking-wide">Dec 23 - Jan 2</p>
                          </div>
                          <button className="text-xs text-red-400 hover:text-red-300 font-light tracking-wide">
                            Remove
                          </button>
                        </div>
                        
                        <div className="text-center py-4">
                          <p className="text-xs text-white/40 font-light tracking-wide">
                            No other time off scheduled
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Availability Summary */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    This Week's Availability
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70 font-light tracking-wide">Total Hours</span>
                      <span className="text-sm text-[#D4AF37] font-light tracking-wide">40 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70 font-light tracking-wide">Available Slots</span>
                      <span className="text-sm text-green-400 font-light tracking-wide">32 slots</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70 font-light tracking-wide">Booked Sessions</span>
                      <span className="text-sm text-blue-400 font-light tracking-wide">8 sessions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70 font-light tracking-wide">Utilization</span>
                      <span className="text-sm text-yellow-400 font-light tracking-wide">25%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 w-full bg-[#E5E4E2]/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <button className="w-full p-3 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 font-light tracking-wide transition-all duration-300 text-left">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm">Block Time Off</span>
                      </div>
                    </button>
                    
                    <button className="w-full p-3 border border-[#E5E4E2]/30 text-white/70 rounded-lg hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300 text-left">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zm-6 4a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <span className="text-sm">Copy Last Week</span>
                      </div>
                    </button>
                    
                    <button className="w-full p-3 border border-[#E5E4E2]/30 text-white/70 rounded-lg hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300 text-left">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-sm">Export Schedule</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Schedule Tips */}
              <div className="bg-transparent border border-blue-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-blue-400 tracking-wide">Scheduling Tips</h3>
                      <ul className="text-xs text-white/70 font-light tracking-wide mt-2 space-y-1">
                        <li>• Keep consistent hours for better client relationships</li>
                        <li>• Allow buffer time between sessions for notes</li>
                        <li>• Block lunch breaks to avoid back-to-back sessions</li>
                        <li>• Update time off requests at least 48 hours in advance</li>
                      </ul>
                    </div>
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
