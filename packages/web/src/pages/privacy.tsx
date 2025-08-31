import Head from 'next/head';
import Layout from '../components/Layout/Layout';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Pentara</title>
        <meta name="description" content="Pentara's privacy policy. Your conversations stay on your device. We never store chat data on our servers." />
      </Head>

      <Layout>
        <div className="section-padding bg-white">
          <div className="container-max max-w-4xl">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-secondary-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-primary-900 mb-3">
                  Privacy-First Promise
                </h2>
                <p className="text-primary-800">
                  Your conversations with your Pentara voices are stored only on your device. 
                  We never store, read, or analyze your chat data on our servers. Your privacy 
                  is not just a policy—it's our architecture.
                </p>
              </div>

              <h2>Information We Collect</h2>
              
              <h3>During Onboarding</h3>
              <ul>
                <li>Email address (for activation code delivery)</li>
                <li>Questionnaire responses (to create your Personal Manual)</li>
                <li>Payment information (processed by Stripe, not stored by us)</li>
              </ul>

              <h3>In the App</h3>
              <ul>
                <li>Anonymous usage counters (number of conversations per day)</li>
                <li>Technical logs for debugging (no conversation content)</li>
                <li>Crash reports (no personal data)</li>
              </ul>

              <h3>What We Don't Collect</h3>
              <ul>
                <li><strong>Your conversations:</strong> All chats stay on your device</li>
                <li><strong>Personal identifiers:</strong> No tracking across devices</li>
                <li><strong>Location data:</strong> We don't track where you are</li>
                <li><strong>Behavioral data:</strong> No analytics on how you use the voices</li>
              </ul>

              <h2>How We Use Information</h2>
              
              <p>We use the limited information we collect to:</p>
              <ul>
                <li>Create and deliver your Personal Manual and voice profiles</li>
                <li>Send your activation code via email</li>
                <li>Provide customer support when requested</li>
                <li>Monitor system performance and costs</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Data Storage and Security</h2>
              
              <h3>On Your Device</h3>
              <ul>
                <li>All conversations are stored locally using encrypted SQLite</li>
                <li>Your voice profiles are stored in secure device storage</li>
                <li>You can delete all data at any time through the app</li>
              </ul>

              <h3>On Our Servers</h3>
              <ul>
                <li>Personal Manuals and voice profiles (encrypted at rest)</li>
                <li>Activation codes and redemption status</li>
                <li>Anonymous usage counters</li>
                <li>No conversation content ever</li>
              </ul>

              <h2>Third-Party Services</h2>
              
              <p>We use these trusted services:</p>
              <ul>
                <li><strong>Calendly:</strong> For booking onboarding sessions</li>
                <li><strong>Stripe:</strong> For payment processing</li>
                <li><strong>OpenAI:</strong> For generating voice responses (no data retention)</li>
                <li><strong>Vercel:</strong> For hosting our web application</li>
              </ul>

              <h2>Your Rights</h2>
              
              <p>You have the right to:</p>
              <ul>
                <li>Access your Personal Manual and profile data</li>
                <li>Request corrections to your profile</li>
                <li>Delete your account and all associated data</li>
                <li>Export your locally stored conversations</li>
                <li>Opt out of usage analytics</li>
              </ul>

              <h2>Children's Privacy</h2>
              
              <p>
                Pentara is not intended for children under 18. We do not knowingly 
                collect personal information from children under 18.
              </p>

              <h2>Changes to This Policy</h2>
              
              <p>
                We may update this privacy policy from time to time. We will notify 
                you of any changes by posting the new policy on this page and updating 
                the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              
              <p>
                If you have any questions about this privacy policy, please contact us at{' '}
                <a href="mailto:privacy@pentara.app" className="text-primary-600 hover:text-primary-700">
                  privacy@pentara.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}


