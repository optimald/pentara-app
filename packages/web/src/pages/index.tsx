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
        <title>Cursor - Why Vibe Code? AI-Powered Development</title>
        <meta 
          name="description" 
          content="Discover why Vibe Code with Cursor is revolutionizing development. AI-powered coding that understands your intent and creates code through conversation, not memorization." 
        />
        <meta name="keywords" content="cursor, vibe code, AI coding, development, programming, AI assistant, code generation" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Cursor - Why Vibe Code? AI-Powered Development" />
        <meta property="og:description" content="Discover why Vibe Code with Cursor is revolutionizing development. AI-powered coding that understands your intent and creates code through conversation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cursor.sh" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Cursor - Why Vibe Code? AI-Powered Development" />
        <meta name="twitter:description" content="Discover why Vibe Code with Cursor is revolutionizing development. AI-powered coding that understands your intent and creates code through conversation." />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Cursor",
              "description": "AI-powered code editor with Vibe Code methodology",
              "url": "https://cursor.sh",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Windows, macOS, Linux",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free AI-powered code editor"
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

// Use server-side rendering for the home page to avoid static generation issues
export async function getServerSideProps() {
  return {
    props: {},
  };
}


