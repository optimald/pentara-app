'use client';

import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

interface CalendarComponentProps {
  scheduleStats: Array<{
    name: string;
    value: string;
    subtitle: string;
  }>;
  upcomingSessions: Array<{
    id: number;
    client: string;
    type: string;
    date: string;
    time: string;
  }>;
}

export default function CalendarComponent({ scheduleStats, upcomingSessions }: CalendarComponentProps) {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [showSessionModal, setShowSessionModal] = useState(false);

  // Convert upcoming sessions to calendar events
  const events = upcomingSessions.map((session, index) => {
    const sessionDate = new Date();
    if (session.date === 'Today') {
      sessionDate.setHours(parseInt(session.time.split(':')[0]), parseInt(session.time.split(':')[1].split(' ')[0]));
    } else if (session.date === 'Tomorrow') {
      sessionDate.setDate(sessionDate.getDate() + 1);
      sessionDate.setHours(parseInt(session.time.split(':')[0]), parseInt(session.time.split(':')[1].split(' ')[0]));
    } else {
      // For "Dec 5" format, we'll use a placeholder date
      sessionDate.setMonth(11); // December
      sessionDate.setDate(5);
      sessionDate.setHours(parseInt(session.time.split(':')[0]), parseInt(session.time.split(':')[1].split(' ')[0]));
    }

    return {
      id: session.id,
      title: `${session.type} - ${session.client}`,
      start: sessionDate,
      end: new Date(sessionDate.getTime() + 60 * 60 * 1000), // 1 hour duration
      resource: session
    };
  });

  // Add some mock availability events
  const availabilityEvents = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + i);
    
    // Add availability slots for some days
    if (eventDate.getDate() % 3 === 0 || eventDate.getDate() % 7 === 1) {
      availabilityEvents.push({
        id: `available-${i}-1`,
        title: 'Available',
        start: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 9, 0),
        end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 10, 0),
        resource: { type: 'availability' }
      });
      availabilityEvents.push({
        id: `available-${i}-2`,
        title: 'Available',
        start: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 14, 0),
        end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 15, 0),
        resource: { type: 'availability' }
      });
    }
  }

  const allEvents = [...events, ...availabilityEvents];

  const handleSelectSlot = useCallback(({ start, end }) => {
    // Handle slot selection for scheduling
    console.log('Selected slot:', start, end);
    setShowSessionModal(true);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    // Handle event selection
    console.log('Selected event:', event);
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#D4AF37';
    let borderColor = '#B8941F';
    
    if (event.resource?.type === 'availability') {
      backgroundColor = '#3B82F6';
      borderColor = '#2563EB';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        fontSize: '12px',
        padding: '2px 4px'
      }
    };
  };

  return (
    <>
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
                  onClick={() => setView(Views.WEEK)}
                  className={`px-3 py-1 text-sm border rounded-md font-light tracking-wide transition-all duration-200 ${
                    view === Views.WEEK
                      ? 'border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-[#E5E4E2]/30 text-white/70 hover:bg-[#E5E4E2]/10'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView(Views.MONTH)}
                  className={`px-3 py-1 text-sm border rounded-md font-light tracking-wide transition-all duration-200 ${
                    view === Views.MONTH
                      ? 'border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-[#E5E4E2]/30 text-white/70 hover:bg-[#E5E4E2]/10'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Calendar Navigation */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setDate(moment(date).subtract(1, view === Views.WEEK ? 'week' : 'month').toDate())}
                  className="p-2 text-white/70 hover:text-white hover:bg-[#E5E4E2]/10 rounded-md transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <h4 className="text-lg font-light text-white tracking-wide min-w-[200px] text-center">
                  {moment(date).format(view === Views.WEEK ? 'MMM D - MMM D, YYYY' : 'MMMM YYYY')}
                </h4>
                <button
                  onClick={() => setDate(moment(date).add(1, view === Views.WEEK ? 'week' : 'month').toDate())}
                  className="p-2 text-white/70 hover:text-white hover:bg-[#E5E4E2]/10 rounded-md transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setDate(new Date())}
                className="px-3 py-1 text-sm border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-200"
              >
                Today
              </button>
            </div>

            {/* Calendar */}
            <div className="h-96">
              <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                view={view}
                date={date}
                onView={setView}
                onNavigate={setDate}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                eventPropGetter={eventStyleGetter}
                style={{ 
                  height: '100%',
                  color: 'white'
                }}
                className="custom-calendar"
              />
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
                onClick={() => setShowSessionModal(true)}
                className="mt-4 w-full px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 rounded-md hover:bg-[#D4AF37]/20 font-light tracking-wide transition-all duration-300"
              >
                Schedule New Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
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
                onClick={() => setShowSessionModal(false)}
                className="flex-1 px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Session scheduled successfully!');
                  setShowSessionModal(false);
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
