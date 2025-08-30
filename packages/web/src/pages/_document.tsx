import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="description" content="Five voices. One circle. Clarity on demand. A private self-coaching app with five inspired-by voices tuned to your values." />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta property="og:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta name="twitter:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* App manifest */}
        <meta name="application-name" content="Pentara" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Pentara" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#18181b" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://calendly.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo-symbol.svg" as="image" type="image/svg+xml" />
      </Head>
      <body className="bg-dark-50 text-dark-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
