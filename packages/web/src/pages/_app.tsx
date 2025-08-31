import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import dynamic from 'next/dynamic';

// Dynamically import analytics component to avoid SSR issues
const Analytics = dynamic(() => import('../components/Analytics'), {
  ssr: false
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
