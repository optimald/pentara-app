import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { useAnalytics } from '../hooks/useAnalytics';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
