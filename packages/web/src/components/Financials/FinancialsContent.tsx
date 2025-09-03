import React from 'react';
import OverviewTab from './OverviewTab';
import TransactionsTab from './TransactionsTab';
import AnalyticsTab from './AnalyticsTab';
import ReportsTab from './ReportsTab';

interface FinancialsContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  revenueMetrics: Array<{
    name: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    period: string;
    icon: string;
  }>;
  recentTransactions: Array<{
    id: number;
    type: string;
    guide: string;
    amount: string;
    date: string;
    status: string;
    sessions: number;
  }>;
  monthlyBreakdown: Array<{
    month: string;
    revenue: string;
    payouts: string;
    margin: string;
    sessions: number;
    growth: string;
  }>;
}

export default function FinancialsContent({ activeTab, setActiveTab, revenueMetrics, recentTransactions, monthlyBreakdown }: FinancialsContentProps) {

  // Tab configuration
  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'chart' },
    { id: 'transactions', name: 'Transactions', icon: 'list' },
    { id: 'analytics', name: 'Analytics', icon: 'graph' },
    { id: 'reports', name: 'Reports', icon: 'document' },
  ];

  // Helper function to get tab icons
  const getTabIcon = (iconType: string) => {
    const icons = {
      chart: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      list: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      graph: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      ),
      document: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[iconType as keyof typeof icons] || icons.chart;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            revenueMetrics={revenueMetrics}
            recentTransactions={recentTransactions}
            monthlyBreakdown={monthlyBreakdown}
          />
        );
      case 'transactions':
        return <TransactionsTab recentTransactions={recentTransactions} />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return (
          <OverviewTab
            revenueMetrics={revenueMetrics}
            recentTransactions={recentTransactions}
            monthlyBreakdown={monthlyBreakdown}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-[#E5E4E2]/20">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-light text-sm tracking-wide transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-white/60 hover:text-white/80 hover:border-[#E5E4E2]/30'
              }`}
            >
              <span className={`mr-2 transition-colors duration-200 ${
                activeTab === tab.id ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-white/60'
              }`}>
                {getTabIcon(tab.icon)}
              </span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
