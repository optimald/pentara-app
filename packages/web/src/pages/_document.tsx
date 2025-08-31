import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="description" content="Five voices. One circle. Clarity on demand. A private self-coaching app with five inspired-by voices tuned to your values." />
        
        {/* Favicons - Use actual logo file */}
        <link rel="icon" type="image/jpeg" href="/favicon.jpeg" />
        <link rel="apple-touch-icon" href="/favicon.jpeg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta property="og:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta property="og:image" content="/logo.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta name="twitter:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta name="twitter:image" content="/logo.jpeg" />
        
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
        
        {/* Preload critical assets - Use actual logo */}
        <link rel="preload" href="/logo.jpeg" as="image" type="image/jpeg" />
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-67S63E3C14'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-67S63E3C14'}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Plausible Analytics */}
        <script 
          defer 
          data-domain="pentara" 
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function() { 
                (window.plausible.q = window.plausible.q || []).push(arguments) 
              }
            `,
          }}
        />
      </Head>
      <body className="bg-dark-50 text-dark-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
