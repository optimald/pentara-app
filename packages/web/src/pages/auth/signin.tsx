import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import SocialLoginButton from '../../components/Auth/SocialLoginButton';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.error) {
        setMessage('Error sending magic link. Please try again.');
      } else {
        setMessage('Check your email for a magic link to sign in.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Coach Sign In - Pentara</title>
        <meta name="description" content="Sign in to the Pentara coach console" />
      </Head>

      <div className="min-h-screen bg-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-2xl font-serif font-semibold text-secondary-900">
              Pentara
            </span>
          </Link>
          
          <h2 className="text-center text-3xl font-serif font-bold text-secondary-900">
            Coach Console
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            Sign in with your coach email address
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <SocialLoginButton 
                provider="google" 
                disabled={isLoading}
                callbackUrl="/console"
              />
              <SocialLoginButton 
                provider="facebook" 
                disabled={isLoading}
                callbackUrl="/console"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="coach@pentara.app"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send magic link'}
                </button>
              </div>
            </form>

            {message && (
              <div className={`mt-4 p-4 rounded-md ${
                message.includes('Check your email') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                <p className="text-sm">{message}</p>
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">
                    Need access?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-secondary-600">
                  Contact an admin to get coach access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/console',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
