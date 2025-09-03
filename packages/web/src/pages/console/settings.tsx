import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface SettingsPageProps {
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

export default function SettingsPage({ session }: SettingsPageProps) {
  // Static values to avoid SSR issues - can be enhanced with client-side state later
  const maxConcurrentSessions = '5';
  const defaultSessionDuration = '45';
  const guideOnboardingPeriod = '30';
  const clientWaitingListLimit = '100';
  const sessionTimeout = '24';
  const adminEmail = 'guardian@pentara.app';
  
  // Static toggle values
  const autoApproveGuides = false;
  const requireEmailVerification = true;
  const enablePublicRegistration = false;
  const twoFactorAuth = true;
  const auditLogging = true;
  const emailNotifications = true;
  const smsAlerts = false;

  const handleSaveChanges = () => {
    // In a real app, this would make an API call to save settings
    alert('Settings saved successfully!');
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to their default values?')) {
      alert('Settings reset to defaults!');
    }
  };
  return (
    <>
      <Head>
        <title>System Settings - Pentara Console</title>
        <meta name="description" content="Configure platform settings and policies" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/settings">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-serif font-light text-white tracking-widest">
              System Settings
            </h1>
            <p className="text-white/70 font-light tracking-wide">
              Configure platform settings, policies, and system parameters
            </p>
          </div>

          {/* Settings Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Configuration */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  Platform Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Max Concurrent Sessions per Guide
                    </label>
                    <input
                      type="number"
                      value={maxConcurrentSessions}
                      onChange={(e) => setMaxConcurrentSessions(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Default Session Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={defaultSessionDuration}
                      onChange={(e) => setDefaultSessionDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Guide Onboarding Period (days)
                    </label>
                    <input
                      type="number"
                      value={guideOnboardingPeriod}
                      onChange={(e) => setGuideOnboardingPeriod(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Client Waiting List Limit
                    </label>
                    <input
                      type="number"
                      value={clientWaitingListLimit}
                      onChange={(e) => setClientWaitingListLimit(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] backdrop-blur-sm font-light tracking-wide"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* User Management */}
            <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                  User Management
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">Auto-approve new guides</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Automatically approve guide applications</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#E5E4E2]/20 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2">
                      <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">Require email verification</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Users must verify email before access</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#D4AF37] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">Enable public registration</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Allow users to register without invitation</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#E5E4E2]/20 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2">
                      <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-transparent border border-red-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-red-400 mb-4 tracking-widest">
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Session Timeout (hours)
                    </label>
                    <input
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 backdrop-blur-sm font-light tracking-wide"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">Two-factor authentication</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Require 2FA for all admin accounts</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-red-400 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">Audit logging</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Log all administrative actions</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-red-400 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-transparent border border-blue-400/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-light text-blue-400 mb-4 tracking-widest">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">Email notifications</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Send system alerts via email</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-400 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-white tracking-wide">SMS alerts</p>
                      <p className="text-xs text-white/60 font-light tracking-wide">Send critical alerts via SMS</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#E5E4E2]/20 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                      <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-white/80 mb-2 tracking-wide">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm font-light tracking-wide"
                      placeholder="admin@pentara.app"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-transparent border border-[#D4AF37]/30 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-[#D4AF37] mb-4 tracking-widest">
                System Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-light text-white/70 tracking-wide">Platform Version</p>
                  <p className="text-lg font-light text-white tracking-wider">v1.0.0</p>
                </div>
                <div>
                  <p className="text-sm font-light text-white/70 tracking-wide">Database Status</p>
                  <p className="text-lg font-light text-green-400 tracking-wider">Connected</p>
                </div>
                <div>
                  <p className="text-sm font-light text-white/70 tracking-wide">Last Backup</p>
                  <p className="text-lg font-light text-white tracking-wider">Never</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button 
              onClick={handleResetToDefaults}
              className="px-4 py-2 border border-[#E5E4E2]/30 text-white/70 rounded-md hover:bg-[#E5E4E2]/10 font-light tracking-wide transition-all duration-300"
            >
              Reset to Defaults
            </button>
            <button 
              onClick={handleSaveChanges}
              className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300"
            >
              Save Changes
            </button>
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

  // Only allow Guardian role
  if ((session.user as any)?.role !== 'GUARDIAN') {
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
