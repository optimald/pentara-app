import React from 'react';

interface TransactionsTabProps {
  recentTransactions: Array<{
    id: number;
    type: string;
    guide: string;
    amount: string;
    date: string;
    status: string;
    sessions: number;
  }>;
}

export default function TransactionsTab({ recentTransactions }: TransactionsTabProps) {
  return (
    <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg leading-6 font-light text-white tracking-widest">
            All Transactions
          </h3>
          <div className="flex space-x-3">
            <select className="bg-transparent border border-[#E5E4E2]/30 text-white rounded-md px-3 py-2 text-sm font-light tracking-wide">
              <option value="all">All Types</option>
              <option value="payout">Payouts</option>
              <option value="revenue">Revenue</option>
            </select>
            <select className="bg-transparent border border-[#E5E4E2]/30 text-white rounded-md px-3 py-2 text-sm font-light tracking-wide">
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#E5E4E2]/20">
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Guide</th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Sessions</th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E4E2]/20">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-[#E5E4E2]/5 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === 'payout' ? 'bg-blue-400/20' : 'bg-green-400/20'
                      }`}>
                        <svg className={`w-4 h-4 ${transaction.type === 'payout' ? 'text-blue-400' : 'text-green-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          {transaction.type === 'payout' ? (
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          ) : (
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          )}
                        </svg>
                      </div>
                      <span className="text-sm font-light text-white tracking-wide capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light tracking-wide">
                    {transaction.guide}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light tracking-wide">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                    {transaction.sessions}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light">
                    <div className="flex space-x-2">
                      <button className="text-[#D4AF37] hover:text-[#B8941F] tracking-wide transition-colors duration-200">
                        View
                      </button>
                      <button className="text-blue-400 hover:text-blue-300 tracking-wide transition-colors duration-200">
                        Download
                      </button>
                      {transaction.status === 'pending' && (
                        <button className="text-red-400 hover:text-red-300 tracking-wide transition-colors duration-200">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-white/60 font-light tracking-wide">
            Showing {recentTransactions.length} of {recentTransactions.length} transactions
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] rounded-md font-light tracking-wide">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
