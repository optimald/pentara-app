import Head from 'next/head';
import Layout from '../components/Layout/Layout';

export default function CrisisResources() {
  const resources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      description: "Free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week.",
      website: "https://988lifeline.org"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 support for those in crisis. Text with a trained crisis counselor.",
      website: "https://www.crisistextline.org"
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 confidential support for domestic violence survivors and their loved ones.",
      website: "https://www.thehotline.org"
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service for mental health and substance use disorders.",
      website: "https://www.samhsa.gov/find-help/national-helpline"
    },
    {
      name: "Trans Lifeline",
      phone: "877-565-8860",
      description: "Peer support service run by and for trans people, for trans and questioning callers.",
      website: "https://translifeline.org"
    },
    {
      name: "The Trevor Project",
      phone: "1-866-488-7386",
      description: "Crisis support services for LGBTQ young people under 25.",
      website: "https://www.thetrevorproject.org"
    }
  ];

  return (
    <>
      <Head>
        <title>Crisis Resources - Pentara</title>
        <meta name="description" content="If you're in crisis, please reach out for professional help. Here are trusted resources available 24/7." />
      </Head>

      <Layout>
        <div className="section-padding bg-slate-900">
          <div className="container-max max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif font-bold text-white mb-6">
                Crisis Resources
              </h1>
              <div className="bg-red-900/30 border border-red-600/40 rounded-lg p-6 mb-8">
                <p className="text-red-200 text-lg font-medium">
                  If you're having thoughts of suicide or self-harm, or if you're in immediate danger, 
                  please call 911 or go to your nearest emergency room.
                </p>
              </div>
              <p className="text-xl text-slate-300">
                Pentara is a self-coaching tool, not therapy. If you're in crisis or need professional 
                mental health support, these resources are available 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-amber-600/40 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {resource.name}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-amber-400 mb-2">
                      {resource.phone}
                    </div>
                    {resource.phone.includes('988') && (
                      <a 
                        href="tel:988" 
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 mr-2 rounded-lg transition-colors"
                      >
                        Call Now
                      </a>
                    )}
                    {resource.phone.includes('741741') && (
                      <a 
                        href="sms:741741?body=HOME" 
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 mr-2 rounded-lg transition-colors"
                      >
                        Text Now
                      </a>
                    )}
                    {!resource.phone.includes('988') && !resource.phone.includes('741741') && (
                      <a 
                        href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} 
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 mr-2 rounded-lg transition-colors"
                      >
                        Call Now
                      </a>
                    )}
                    <a 
                      href={resource.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Website
                    </a>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-4">
                International Resources
              </h2>
              <p className="text-slate-300 mb-4">
                If you're outside the United States, please visit:
              </p>
              <ul className="space-y-2">
                <li className="text-slate-300">
                  <a 
                    href="https://findahelpline.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Find a Helpline
                  </a>
                  {' '}— International directory of crisis helplines
                </li>
                <li className="text-slate-300">
                  <a 
                    href="https://www.befrienders.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Befrienders Worldwide
                  </a>
                  {' '}— Global network of emotional support centers
                </li>
              </ul>
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-300 mb-6">
                Remember: You are not alone, and help is available.
              </p>
              <a 
                href="/" 
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Return to Pentara
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

// Use server-side rendering for the crisis resources page to avoid static generation issues
export async function getServerSideProps() {
  return {
    props: {},
  };
}


