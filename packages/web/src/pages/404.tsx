import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Pentara</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a href="/" className="flex justify-center items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img
              src="/logo.jpeg"
              alt="Pentara"
              width={40}
              height={40}
              className="w-full h-full rounded-lg"
            />
          </div>
          <span className="text-2xl font-serif font-light text-white tracking-wider">
            Pentara
          </span>
        </a>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-transparent border border-[#E5E4E2]/20 py-8 px-4 backdrop-blur-luxury shadow-luxury-lg sm:rounded-xl sm:px-10 text-center">
          <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-serif font-light text-white mb-4 tracking-widest">
            Page Not Found
          </h2>
          
          <p className="text-white/70 mb-8 font-light tracking-wide">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <a 
            href="/"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center shadow-champagne-lg hover:shadow-champagne-xl transition-all duration-300 transform hover:scale-[1.02] font-medium tracking-wider"
          >
            <span className="font-medium tracking-wider">Return Home</span>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}


