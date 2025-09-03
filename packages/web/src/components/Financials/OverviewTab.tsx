import React from 'react';

interface OverviewTabProps {
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

export default function OverviewTab({ revenueMetrics, recentTransactions, monthlyBreakdown }: OverviewTabProps) {
  // Helper function to get icon for metrics
  const getMetricIcon = (iconType: string) => {
    const icons = {
      revenue: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
      payout: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
      margin: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      active: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      pending: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      projection: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[iconType as keyof typeof icons] || icons.revenue;
  };

  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {revenueMetrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg hover:border-[#E5E4E2]/30 transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  metric.changeType === 'positive' 
                    ? 'bg-gradient-to-br from-green-400/20 to-green-600/20 group-hover:from-green-400/30 group-hover:to-green-600/30' 
                    : metric.changeType === 'negative'
                    ? 'bg-gradient-to-br from-red-400/20 to-red-600/20 group-hover:from-red-400/30 group-hover:to-red-600/30'
                    : 'bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 group-hover:from-[#D4AF37]/30 group-hover:to-[#B8941F]/30'
                }`}>
                  {getMetricIcon(metric.icon)}
                </div>
                <div className={`flex items-center text-sm font-light tracking-wide ${
                  metric.changeType === 'positive' ? 'text-green-400' : 
                  metric.changeType === 'negative' ? 'text-red-400' : 'text-white/60'
                }`}>
                  {metric.changeType === 'positive' && (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {metric.changeType === 'negative' && (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {metric.change}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-light text-white/70 mb-2 tracking-wide">
                  {metric.name}
                </h3>
                <div className="text-3xl font-light text-white tracking-wider mb-1">
                  {metric.value}
                </div>
                <p className="text-xs text-white/50 font-light tracking-wide">
                  {metric.period}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
              Revenue Trend
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <p className="text-white/60 font-light tracking-wide">No revenue data available</p>
                <p className="text-white/40 text-sm font-light tracking-wide mt-1">Chart will appear when sessions generate revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payout Distribution */}
        <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
              Payout Distribution
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
                <p className="text-white/60 font-light tracking-wide">No payout data available</p>
                <p className="text-white/40 text-sm font-light tracking-wide mt-1">Distribution chart will appear with guide activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-light text-white tracking-widest">
              Recent Transactions
            </h3>
            <button className="text-[#D4AF37] hover:text-[#B8941F] text-sm font-light tracking-wide transition-colors duration-200">
              View All
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#E5E4E2]/20">
                  <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                    Guide
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4E2]/20">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-[#E5E4E2]/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-light text-white tracking-wide capitalize">{transaction.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                      {transaction.guide}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light tracking-wide">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                      {transaction.sessions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-light leading-5 rounded-full tracking-wide ${
                        transaction.status === 'completed' ? 'text-green-400 bg-green-400/10' :
                        transaction.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' :
                        'text-red-400 bg-red-400/10'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
            Monthly Financial Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#D4AF37]/20">
                  <th className="px-6 py-3 text-left text-xs font-light text-[#D4AF37] uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-[#D4AF37] uppercase tracking-wider">
                    Total Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-[#D4AF37] uppercase tracking-wider">
                    Guide Payouts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-[#D4AF37] uppercase tracking-wider">
                    Platform Margin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-[#D4AF37] uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-[#D4AF37] uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {monthlyBreakdown.map((month, index) => (
                  <tr key={index} className="hover:bg-[#D4AF37]/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white tracking-wide">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white tracking-wide">
                      {month.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white tracking-wide">
                      {month.payouts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-[#D4AF37] tracking-wide">
                      {month.margin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white/70 tracking-wide">
                      {month.sessions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-green-400 tracking-wide">
                      {month.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
