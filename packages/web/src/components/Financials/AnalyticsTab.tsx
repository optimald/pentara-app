import React from 'react';

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
              Revenue Growth
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/60 font-light tracking-wide">Advanced Analytics</p>
                <p className="text-white/40 text-sm font-light tracking-wide mt-1">Detailed growth metrics and trends</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
              Guide Performance
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white/60 font-light tracking-wide">Performance Metrics</p>
                <p className="text-white/40 text-sm font-light tracking-wide mt-1">Individual guide analytics and KPIs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-md font-light text-[#D4AF37] mb-4 tracking-wide">
              Session Analytics
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Average Session Duration</span>
                <span className="text-sm text-white font-light tracking-wide">45 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Completion Rate</span>
                <span className="text-sm text-green-400 font-light tracking-wide">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Repeat Clients</span>
                <span className="text-sm text-white font-light tracking-wide">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">No-Show Rate</span>
                <span className="text-sm text-yellow-400 font-light tracking-wide">6%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-transparent border border-green-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-md font-light text-green-400 mb-4 tracking-wide">
              Revenue Metrics
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Revenue per Session</span>
                <span className="text-sm text-white font-light tracking-wide">$75</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Monthly Growth</span>
                <span className="text-sm text-green-400 font-light tracking-wide">+18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Guide Retention</span>
                <span className="text-sm text-white font-light tracking-wide">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Platform Margin</span>
                <span className="text-sm text-[#D4AF37] font-light tracking-wide">25%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-transparent border border-blue-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-md font-light text-blue-400 mb-4 tracking-wide">
              User Engagement
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Active Users</span>
                <span className="text-sm text-white font-light tracking-wide">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">New Signups</span>
                <span className="text-sm text-green-400 font-light tracking-wide">+156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">User Satisfaction</span>
                <span className="text-sm text-white font-light tracking-wide">4.8/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70 font-light tracking-wide">Referral Rate</span>
                <span className="text-sm text-blue-400 font-light tracking-wide">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Charts Section */}
      <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
            Performance Trends
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-48 flex items-center justify-center border border-[#E5E4E2]/20 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm font-light tracking-wide">Revenue Trends</p>
              </div>
            </div>
            <div className="h-48 flex items-center justify-center border border-[#E5E4E2]/20 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm font-light tracking-wide">User Distribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
