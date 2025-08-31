import Head from 'next/head';
import Link from 'next/link';

export default function VerifyRequest() {
  return (
    <>
      <Head>
        <title>Check your email - Pentara</title>
        <meta name="description" content="Check your email for a magic link to sign in" />
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
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
              Check your email
            </h2>
            
            <p className="text-secondary-600 mb-6">
              A sign in link has been sent to your email address. Click the link in the email to access the coach console.
            </p>
            
            <div className="bg-secondary-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-secondary-700">
                <strong>Didn't receive the email?</strong>
                <br />
                Check your spam folder or try signing in again.
              </p>
            </div>
            
            <Link 
              href="/auth/signin"
              className="btn-secondary"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Use static generation for the verify request page
export async function getStaticProps() {
  return {
    props: {},
  };
}


