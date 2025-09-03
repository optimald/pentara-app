import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

interface SignOutPageProps {
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

export default function SignOut({ session }: SignOutPageProps) {
  const handleSignOut = async () => {
    // Use NextAuth signOut function
    await signOut({
      callbackUrl: '/auth/signin',
      redirect: true
    });
  };

  const handleCancel = () => {
    // Go back to console
    window.location.href = '/console';
  };

  return (
    <>
      <Head>
        <title>Sign Out - Pentara</title>
        <meta name="description" content="Sign out of your Pentara account" />
      </Head>

      <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/" className="flex justify-center items-center space-x-2 mb-8">
            <img
              src="/logo.jpeg"
              alt="Pentara"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-serif text-white tracking-wider" style={{ fontWeight: '400', letterSpacing: '1px' }}>
              Pentara
            </span>
          </a>

          <h2 className="text-center text-3xl font-serif font-light text-white tracking-widest">
            Sign Out
          </h2>
          <p className="mt-2 text-center text-sm text-white/70 font-light tracking-wide">
            Are you sure you want to leave the council?
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-transparent border border-[#E5E4E2]/20 py-8 px-4 backdrop-blur-luxury shadow-luxury-lg sm:rounded-xl sm:px-10">
            {session?.user && (
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/30 to-[#B8941F]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white font-light tracking-wide">{session.user.name}</p>
                <p className="text-white/60 text-sm font-light tracking-wide">{session.user.email}</p>
                <p className="text-[#D4AF37] text-xs font-light tracking-wide mt-1 capitalize">
                  {session.user.role?.toLowerCase()}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleSignOut}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-champagne-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-[1.02] tracking-wider"
              >
                Yes, Sign Me Out
              </button>

              <button
                onClick={handleCancel}
                className="w-full flex justify-center py-3 px-4 border border-[#E5E4E2]/30 rounded-md text-sm font-medium text-white/70 bg-transparent hover:bg-[#E5E4E2]/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5E4E2] transition-all duration-300 tracking-wider"
              >
                Cancel
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-white/50 font-light tracking-wide">
                You will be redirected to the sign-in page
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-white/60 hover:text-white/80 font-light tracking-wide transition-colors duration-300"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Clean up session object to avoid serialization issues
  const cleanSession = session ? {
    user: {
      id: session.user?.id || null,
      name: session.user?.name || null,
      email: session.user?.email || null,
      image: session.user?.image || null,
      role: (session.user as any)?.role || null,
    },
    expires: session.expires,
  } : null;

  return {
    props: {
      session: cleanSession,
    },
  };
};
