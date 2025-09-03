'use client';

import CalendarComponent from './CalendarComponent';

interface ClientOnlyCalendarProps {
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

export default function ClientOnlyCalendar({ scheduleStats, upcomingSessions }: ClientOnlyCalendarProps) {
  // Only render on client side
  if (typeof window === 'undefined') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60 font-light tracking-wide">Loading calendar...</div>
      </div>
    );
  }

  return (
    <CalendarComponent
      scheduleStats={scheduleStats}
      upcomingSessions={upcomingSessions}
    />
  );
}
