import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import NotTherapySection from '../components/Home/NotTherapySection';
import FAQSection from '../components/Home/FAQSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pentara - Five voices. One circle. Clarity on demand.</title>
        <meta 
          name="description" 
          content="A private self-coaching app with five inspired-by voices tuned to your values. Book a 45-minute onboarding session to create your personal council. Not therapy." 
        />
        <meta name="keywords" content="self-coaching, personal development, AI voices, decision making, clarity, not therapy" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta property="og:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pentara.app" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Pentara - Five voices. One circle. Clarity on demand." />
        <meta name="twitter:description" content="A private self-coaching app with five inspired-by voices tuned to your values. Not therapy." />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Pentara",
              "description": "A private self-coaching app with five inspired-by voices tuned to your values",
              "url": "https://pentara.app",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "150",
                "priceCurrency": "USD",
                "description": "One-time onboarding session"
              }
            })
          }}
        />
      </Head>

      <Layout>
        <HeroSection />
        <HowItWorksSection />
        <NotTherapySection />
        <FAQSection />
      </Layout>
    </>
  );
}

// Force server-side rendering to avoid static generation issues
export async function getServerSideProps() {
  return {
    props: {
      // Empty props to force SSR
    },
  };
}
