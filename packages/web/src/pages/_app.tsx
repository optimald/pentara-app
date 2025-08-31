import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import '../styles/globals.css';

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-orange-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
