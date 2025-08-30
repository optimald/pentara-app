import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="description" content="Five voices. One circle. Clarity on demand. A private self-coaching app with five inspired-by voices tuned to your values." />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta property="og:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta name="twitter:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://calendly.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
