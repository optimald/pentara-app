'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error - Cursor</title>
        <meta name="description" content="Something went wrong on our end" />
      </Head>

      <div className="min-h-screen bg-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-2xl font-serif font-semibold text-secondary-900">
              Cursor
            </span>
          </Link>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
              Server Error
            </h2>
            
            <p className="text-secondary-600 mb-6">
              Something went wrong on our end. Please try again later.
            </p>
            
            <div className="space-y-3">
              <Link 
                href="/"
                className="btn-primary block w-full"
              >
                Go Home
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="btn-secondary block w-full"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


