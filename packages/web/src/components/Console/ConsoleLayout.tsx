import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';

interface ConsoleLayoutProps {
  children: ReactNode;
  currentPath?: string;
  session?: {
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

export default function ConsoleLayout({ children, session, currentPath = '/console' }: ConsoleLayoutProps) {
  const userRole = session?.user?.role;
  const isGuide = userRole === 'GUIDE';
  const isGuardian = userRole === 'GUARDIAN';

  // Role-specific navigation
  const guideNavigation = [
    { name: 'Dashboard', href: '/console', current: currentPath === '/console' },
    { name: 'My Clients', href: '/console/profiles', current: currentPath === '/console/profiles' },
    { name: 'Schedule', href: '/console/schedule', current: currentPath === '/console/schedule' },
    { name: 'Profile', href: '/console/profile', current: currentPath === '/console/profile' },
    { name: 'Working Hours', href: '/console/hours', current: currentPath === '/console/hours' },
    { name: 'Compensation', href: '/console/compensation', current: currentPath === '/console/compensation' },
    { name: 'Tax', href: '/console/tax', current: currentPath === '/console/tax' },
  ];

  const guardianNavigation = [
    { name: 'Overview', href: '/console', current: currentPath === '/console' },
    { name: 'Guide Management', href: '/console/guides', current: currentPath === '/console/guides' },
    { name: 'Financials', href: '/console/financials', current: currentPath.startsWith('/console/financials') },
    { name: 'User Analytics', href: '/console/analytics', current: currentPath === '/console/analytics' },
    { name: 'System Settings', href: '/console/settings', current: currentPath === '/console/settings' },
  ];

  const navigation = isGuide ? guideNavigation : guardianNavigation;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="bg-[#0a0a0a] shadow-sm border-b border-[#E5E4E2]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <a href="/console" className="flex items-center space-x-2">
                <img 
                  src="/logo.jpeg" 
                  alt="Pentara" 
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-serif font-semibold text-white tracking-wider" style={{ fontWeight: '400', letterSpacing: '1px' }}>
                  Pentara Console
                </span>
              </a>

              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium tracking-wide ${
                      item.current
                        ? 'border-[#D4AF37] text-[#D4AF37]'
                        : 'border-transparent text-white/70 hover:text-white hover:border-[#E5E4E2]/30'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/70 tracking-wide">
                {session?.user?.email}
              </span>
              <button
                onClick={() => {
                  // Navigate to custom sign out confirmation page
                  window.location.href = '/auth/signout';
                }}
                className="text-sm text-white/60 hover:text-white tracking-wide transition-colors duration-300"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium tracking-wide ${
                  item.current
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-white/70 hover:text-white hover:bg-[#E5E4E2]/10 hover:border-[#E5E4E2]/30'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
