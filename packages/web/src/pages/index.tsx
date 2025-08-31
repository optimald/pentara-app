import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import RoyalCouncilSection from '../components/Home/RoyalCouncilSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import NotTherapySection from '../components/Home/NotTherapySection';
import FAQSection from '../components/Home/FAQSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pentara - Ascend to Your Throne of Self-Mastery</title>
        <meta 
          name="description" 
          content="By royal invitation only. Your Personal Court of Wisdom awaits - five sovereign advisors crafted by master coaches to guide your destined path to greatness." 
        />
        <meta name="keywords" content="pentara, royal coaching, sovereign advisors, throne of self-mastery, royal destiny, exclusive court of wisdom, master coaches" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Pentara - Ascend to Your Throne of Self-Mastery" />
        <meta property="og:description" content="By royal invitation only. Your Personal Court of Wisdom awaits - five sovereign advisors crafted by master coaches to guide your destined path to greatness." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pentara.app" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Pentara - Ascend to Your Throne of Self-Mastery" />
        <meta name="twitter:description" content="By royal invitation only. Your Personal Court of Wisdom awaits - five sovereign advisors crafted by master coaches to guide your destined path to greatness." />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Pentara",
              "description": "A private self-coaching app with five inspired-by perspectives tuned to your values",
              "url": "https://pentara.app",
              "applicationCategory": "HealthApplication",
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
        <RoyalCouncilSection />
        <HowItWorksSection />
        <NotTherapySection />
        <FAQSection />
      </Layout>
    </>
  );
}


