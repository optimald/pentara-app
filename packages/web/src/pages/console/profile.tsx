import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface ProfilePageProps {
  session: {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    } | null;
    expires?: string;
  } | null;
}

export default function ProfilePage({ session }: ProfilePageProps) {
  return (
    <>
      <Head>
        <title>Profile - Pentara Console</title>
        <meta name="description" content="Manage your profile, details, and working hours" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/profile">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-white tracking-widest">Profile</h1>
              <p className="mt-1 text-sm text-white/60 font-light tracking-wide">
                Manage your personal details, specializations, and working hours
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Full Name
                      </label>
                      <div className="w-full px-3 py-2 bg-[#E5E4E2]/5 border border-[#E5E4E2]/20 text-white/60 rounded-md font-light tracking-wide">
                        {session?.user?.name || 'Not set'}
                      </div>
                      <p className="text-xs text-white/40 mt-1 font-light tracking-wide">
                        Contact support to change your name
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Email Address
                      </label>
                      <div className="w-full px-3 py-2 bg-[#E5E4E2]/5 border border-[#E5E4E2]/20 text-white/60 rounded-md font-light tracking-wide">
                        {session?.user?.email || 'Not set'}
                      </div>
                      <p className="text-xs text-white/40 mt-1 font-light tracking-wide">
                        Contact support to change your email
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide"
                        placeholder="City, State/Country"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                      Bio / About Me
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide resize-none"
                      placeholder="Tell clients about yourself, your experience, and your approach..."
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Years of Experience
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="">Select experience level</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                        Primary Language
                      </label>
                      <select className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/30 text-white rounded-md focus:border-[#D4AF37] focus:outline-none font-light tracking-wide">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                      Specializations
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Anxiety & Stress',
                        'Depression',
                        'Relationships',
                        'Career Guidance',
                        'Life Transitions',
                        'Self-Esteem',
                        'Grief & Loss',
                        'Mindfulness',
                        'Personal Growth'
                      ].map((specialization) => (
                        <label key={specialization} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-[#E5E4E2]/30 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 bg-transparent"
                          />
                          <span className="ml-2 text-sm text-white/70 font-light tracking-wide">
                            {specialization}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Profile Summary & Actions */}
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                    Profile Photo
                  </h3>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <button className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/10 font-light tracking-wide transition-all duration-300 text-sm">
                      Upload Photo
                    </button>
                    
                    <p className="text-xs text-white/50 mt-2 text-center font-light tracking-wide">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Status */}
              <div className="bg-transparent border border-green-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-light text-green-400 mb-4 tracking-widest">
                    Profile Status
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70 font-light tracking-wide">Profile Complete</span>
                      <span className="text-sm text-green-400 font-light tracking-wide">85%</span>
                    </div>
                    
                    <div className="w-full bg-[#E5E4E2]/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-white/60 font-light tracking-wide">Basic info complete</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        <span className="text-white/60 font-light tracking-wide">Add profile photo</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        <span className="text-white/60 font-light tracking-wide">Complete bio</span>
                      </div>
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
