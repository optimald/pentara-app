import React from 'react';

export default function ReportsTab() {
  return (
    <div className="space-y-6">
      {/* Report Generation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg p-6 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-light text-[#D4AF37] tracking-wide">Monthly Report</h4>
            <svg className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-white/60 text-sm font-light tracking-wide mb-4">Comprehensive monthly financial summary with revenue, payouts, and growth metrics</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-light tracking-wide">Last Generated:</span>
              <span className="text-white/70 font-light tracking-wide">Dec 1, 2024</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-light tracking-wide">Format:</span>
              <span className="text-white/70 font-light tracking-wide">PDF, Excel</span>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/20 font-light tracking-wide transition-all duration-300">
            Generate Report
          </button>
        </div>
        
        <div className="bg-transparent border border-green-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg p-6 hover:border-green-400/50 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-light text-green-400 tracking-wide">Tax Report</h4>
            <svg className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
          </div>
          <p className="text-white/60 text-sm font-light tracking-wide mb-4">Annual tax documentation with 1099 forms, deductions, and compliance summaries</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-light tracking-wide">Tax Year:</span>
              <span className="text-white/70 font-light tracking-wide">2024</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-light tracking-wide">Status:</span>
              <span className="text-green-400 font-light tracking-wide">Ready</span>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-green-400/10 border border-green-400/30 text-green-400 rounded-md hover:bg-green-400/20 font-light tracking-wide transition-all duration-300">
            Generate Report
          </button>
        </div>
        
        <div className="bg-transparent border border-blue-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg p-6 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-light text-blue-400 tracking-wide">Custom Report</h4>
            <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-white/60 text-sm font-light tracking-wide mb-4">Build custom reports with specific date ranges, metrics, and filtering options</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-light tracking-wide">Templates:</span>
              <span className="text-white/70 font-light tracking-wide">5 Available</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-light tracking-wide">Export:</span>
              <span className="text-white/70 font-light tracking-wide">PDF, CSV, JSON</span>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-blue-400/10 border border-blue-400/30 text-blue-400 rounded-md hover:bg-blue-400/20 font-light tracking-wide transition-all duration-300">
            Create Custom
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
            Recent Reports
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-light text-white tracking-wide">November 2024 Monthly Report</h4>
                  <p className="text-xs text-white/60 font-light tracking-wide">Generated on Dec 1, 2024 • 2.3 MB</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs border border-[#D4AF37]/30 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/10 font-light tracking-wide transition-all duration-300">
                  Download
                </button>
                <button className="px-3 py-1 text-xs border border-blue-400/30 text-blue-400 rounded-md hover:bg-blue-400/10 font-light tracking-wide transition-all duration-300">
                  Share
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-light text-white tracking-wide">Q3 2024 Tax Summary</h4>
                  <p className="text-xs text-white/60 font-light tracking-wide">Generated on Oct 15, 2024 • 1.8 MB</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs border border-[#D4AF37]/30 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/10 font-light tracking-wide transition-all duration-300">
                  Download
                </button>
                <button className="px-3 py-1 text-xs border border-blue-400/30 text-blue-400 rounded-md hover:bg-blue-400/10 font-light tracking-wide transition-all duration-300">
                  Share
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-light text-white tracking-wide">Custom Guide Performance Report</h4>
                  <p className="text-xs text-white/60 font-light tracking-wide">Generated on Oct 1, 2024 • 945 KB</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs border border-[#D4AF37]/30 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/10 font-light tracking-wide transition-all duration-300">
                  Download
                </button>
                <button className="px-3 py-1 text-xs border border-blue-400/30 text-blue-400 rounded-md hover:bg-blue-400/10 font-light tracking-wide transition-all duration-300">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
            Report Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <h4 className="text-sm font-light text-white mb-2 tracking-wide">Financial Summary Template</h4>
              <p className="text-xs text-white/60 font-light tracking-wide mb-3">Revenue, expenses, and profit analysis with visual charts</p>
              <button className="text-xs text-[#D4AF37] hover:text-[#B8941F] font-light tracking-wide transition-colors duration-200">
                Use Template
              </button>
            </div>
            <div className="p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <h4 className="text-sm font-light text-white mb-2 tracking-wide">Guide Performance Template</h4>
              <p className="text-xs text-white/60 font-light tracking-wide mb-3">Individual guide metrics, ratings, and earnings breakdown</p>
              <button className="text-xs text-[#D4AF37] hover:text-[#B8941F] font-light tracking-wide transition-colors duration-200">
                Use Template
              </button>
            </div>
            <div className="p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <h4 className="text-sm font-light text-white mb-2 tracking-wide">User Analytics Template</h4>
              <p className="text-xs text-white/60 font-light tracking-wide mb-3">User engagement, retention, and satisfaction metrics</p>
              <button className="text-xs text-[#D4AF37] hover:text-[#B8941F] font-light tracking-wide transition-colors duration-200">
                Use Template
              </button>
            </div>
            <div className="p-4 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200">
              <h4 className="text-sm font-light text-white mb-2 tracking-wide">Compliance Report Template</h4>
              <p className="text-xs text-white/60 font-light tracking-wide mb-3">Regulatory compliance, audit trails, and documentation</p>
              <button className="text-xs text-[#D4AF37] hover:text-[#B8941F] font-light tracking-wide transition-colors duration-200">
                Use Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
