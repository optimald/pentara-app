import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface TaxPageProps {
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

export default function TaxPage({ session }: TaxPageProps) {
  return (
    <>
      <Head>
        <title>Tax Information - Pentara Console</title>
        <meta name="description" content="Manage your tax information and W-9 documentation" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/tax">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-white tracking-widest">Tax Information</h1>
              <p className="mt-1 text-sm text-white/60 font-light tracking-wide">
                Manage your tax documentation and W-9 forms for compliance
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300">
                Save Tax Information
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tax Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* W-9 Status Overview */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Tax Compliance Status
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-red-400/5 border border-red-400/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-400/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-light text-white tracking-wide">W-9 Form</h4>
                          <p className="text-xs text-red-400 font-light tracking-wide">Required for payments</p>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-light leading-5 text-red-400 bg-red-400/10 rounded tracking-wide">
                        Not Submitted
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-light text-white tracking-wide">Tax Status</h4>
                          <p className="text-xs text-yellow-400 font-light tracking-wide">Pending verification</p>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-light leading-5 text-yellow-400 bg-yellow-400/10 rounded tracking-wide">
                        In Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Information Form */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Taxpayer Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          Legal Business Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                          placeholder="Enter your legal business name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          Tax Classification
                        </label>
                        <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                          <option value="">Select classification</option>
                          <option value="individual">Individual/Sole Proprietor</option>
                          <option value="single-llc">Single-member LLC</option>
                          <option value="multi-llc">Multi-member LLC</option>
                          <option value="corporation">C Corporation</option>
                          <option value="s-corporation">S Corporation</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          Tax ID Number (SSN/EIN)
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                          placeholder="XXX-XX-XXXX or XX-XXXXXXX"
                        />
                        <p className="text-xs text-white/40 mt-1 font-light tracking-wide">
                          This information is encrypted and secure
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          Backup Withholding
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="backup-withholding"
                              value="no"
                              className="text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 bg-transparent border-[#E5E4E2]/30"
                            />
                            <span className="ml-2 text-sm text-white/70 font-light tracking-wide">
                              Not subject to backup withholding
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="backup-withholding"
                              value="yes"
                              className="text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 bg-transparent border-[#E5E4E2]/30"
                            />
                            <span className="ml-2 text-sm text-white/70 font-light tracking-wide">
                              Subject to backup withholding
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Tax Address
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                        placeholder="Enter your street address"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                          placeholder="City"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          State
                        </label>
                        <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                          <option value="">Select state</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                          placeholder="ZIP"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* W-9 Upload */}
              <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-light text-[#D4AF37] tracking-widest">
                      W-9 Document Upload
                    </h3>
                    <a 
                      href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#D4AF37] hover:text-[#B8941F] font-light tracking-wide transition-colors duration-200 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download W-9 Form</span>
                    </a>
                  </div>
                  
                  <div className="border-2 border-dashed border-[#D4AF37]/30 rounded-lg p-8 text-center hover:border-[#D4AF37]/50 transition-colors duration-200">
                    <svg className="mx-auto h-16 w-16 text-[#D4AF37]/60" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4">
                      <label htmlFor="w9-upload" className="cursor-pointer">
                        <span className="mt-2 block text-lg font-light text-white tracking-wide">
                          Upload completed W-9 form
                        </span>
                        <span className="mt-2 block text-sm text-white/60 font-light tracking-wide">
                          Drag and drop your file here, or click to browse
                        </span>
                        <span className="mt-1 block text-xs text-white/40 font-light tracking-wide">
                          PDF, PNG, or JPG up to 10MB
                        </span>
                      </label>
                      <input id="w9-upload" name="w9-upload" type="file" className="sr-only" accept=".pdf,.png,.jpg,.jpeg" />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-light text-[#D4AF37] tracking-wide">Important</p>
                        <p className="text-xs text-white/70 font-light tracking-wide mt-1">
                          Please ensure all fields on the W-9 form are completed and the document is signed before uploading. 
                          This is required for tax reporting and payment processing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tax Resources */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Tax Resources
                  </h3>
                  
                  <div className="space-y-3">
                    <a 
                      href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-light text-white tracking-wide">W-9 Form</h4>
                          <p className="text-xs text-white/60 font-light tracking-wide">Download blank form</p>
                        </div>
                      </div>
                    </a>
                    
                    <a 
                      href="https://www.irs.gov/forms-pubs/about-form-w-9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 border border-[#E5E4E2]/20 rounded-lg hover:bg-[#E5E4E2]/5 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-light text-white tracking-wide">W-9 Instructions</h4>
                          <p className="text-xs text-white/60 font-light tracking-wide">How to complete</p>
                        </div>
                      </div>
                    </a>
                    
                    <div className="p-3 border border-[#E5E4E2]/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-light text-white tracking-wide">Need Help?</h4>
                          <p className="text-xs text-white/60 font-light tracking-wide">Contact support</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-transparent border border-green-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-green-400 tracking-wide">Secure & Encrypted</h3>
                      <p className="text-xs text-white/70 font-light tracking-wide mt-1">
                        Your tax information is encrypted using bank-level security and stored in compliance with IRS regulations. 
                        We use this information solely for tax reporting purposes as required by law.
                      </p>
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
