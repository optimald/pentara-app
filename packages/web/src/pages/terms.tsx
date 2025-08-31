import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';

const TermsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Pentara</title>
        <meta
          name="description"
          content="Terms of Service for Pentara - Self-coaching app with five inspired-by voices"
        />
      </Head>

      <Layout>
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-dark-800 mb-8">
              Terms of Service
            </h1>

            <div className="prose prose-lg prose-dark max-w-none">
              <p className="text-lg text-dark-600 mb-8">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-dark-700 mb-4">
                  By accessing or using Pentara ("the Service"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, you may not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  2. Description of Service
                </h2>
                <p className="text-dark-700 mb-4">
                  Pentara is a <strong>self-coaching tool</strong> that provides personalized guidance through five 
                  "inspired-by" voices. The Service includes:
                </p>
                <ul className="list-disc pl-6 text-dark-700 mb-4">
                  <li>One-time onboarding session with a certified coach ($150)</li>
                  <li>Mobile application with personalized voice responses</li>
                  <li>Local data storage and privacy-first architecture</li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                  <p className="text-amber-800 font-medium">
                    <strong>Important:</strong> Pentara is NOT therapy, counseling, or medical treatment. 
                    It is a self-coaching tool for personal reflection and guidance.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  3. User Responsibilities
                </h2>
                <p className="text-dark-700 mb-4">You agree to:</p>
                <ul className="list-disc pl-6 text-dark-700 mb-4">
                  <li>Use the Service for lawful purposes only</li>
                  <li>Provide accurate information during onboarding</li>
                  <li>Maintain the confidentiality of your activation code</li>
                  <li>Not attempt to reverse engineer or hack the Service</li>
                  <li>Seek appropriate professional help for mental health concerns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  4. Privacy and Data
                </h2>
                <p className="text-dark-700 mb-4">
                  Pentara is designed with privacy as a core principle:
                </p>
                <ul className="list-disc pl-6 text-dark-700 mb-4">
                  <li><strong>No chat storage:</strong> Your conversations are stored locally on your device only</li>
                  <li><strong>Profile data:</strong> Encrypted and stored securely</li>
                  <li><strong>Usage tracking:</strong> Anonymous and aggregated for service improvement</li>
                  <li><strong>Coach access:</strong> Limited to onboarding session only</li>
                </ul>
                <p className="text-dark-700 mb-4">
                  For complete details, see our <a href="/privacy" className="text-gold-600 hover:text-gold-700 underline">Privacy Policy</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  5. Payment and Refunds
                </h2>
                <p className="text-dark-700 mb-4">
                  The onboarding service is a one-time payment of $150, processed through Calendly and Stripe. 
                  The mobile app is free after activation.
                </p>
                <p className="text-dark-700 mb-4">
                  <strong>Refund Policy:</strong> Refunds may be requested within 7 days of the onboarding session 
                  if you are not satisfied with the service. Contact us at support@pentara.app.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  6. Disclaimers and Limitations
                </h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <p className="text-red-800 font-medium mb-2">
                    <strong>Medical Disclaimer:</strong>
                  </p>
                  <p className="text-red-700">
                    Pentara is not a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of qualified health providers with questions about medical conditions.
                  </p>
                </div>
                <p className="text-dark-700 mb-4">
                  The Service is provided "as is" without warranties of any kind. We do not guarantee 
                  specific outcomes or results from using Pentara.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  7. Crisis Resources
                </h2>
                <p className="text-dark-700 mb-4">
                  If you are experiencing a mental health crisis, please contact:
                </p>
                <ul className="list-disc pl-6 text-dark-700 mb-4">
                  <li><strong>National Suicide Prevention Lifeline:</strong> 988</li>
                  <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                  <li><strong>Emergency Services:</strong> 911</li>
                </ul>
                <p className="text-dark-700 mb-4">
                  Crisis resources are also available within the Pentara app, accessible within two taps.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  8. Intellectual Property
                </h2>
                <p className="text-dark-700 mb-4">
                  The Pentara service, including all content, features, and functionality, is owned by 
                  Pentara and protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-dark-700 mb-4">
                  Your personal profile and conversations remain your property, stored locally on your device.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  9. Termination
                </h2>
                <p className="text-dark-700 mb-4">
                  You may stop using the Service at any time. We may terminate or suspend access to the Service 
                  immediately, without prior notice, for conduct that violates these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-dark-700 mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any 
                  material changes via email or through the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-dark-800 mb-4">
                  11. Contact Information
                </h2>
                <p className="text-dark-700 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-none text-dark-700">
                  <li><strong>Email:</strong> support@pentara.app</li>
                  <li><strong>Website:</strong> pentara.app</li>
                </ul>
              </section>

              <div className="border-t border-dark-200 pt-8 mt-12">
                <p className="text-sm text-dark-500">
                  These Terms of Service were last updated on {new Date().toLocaleDateString()}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TermsPage;

// Use static generation for the terms page
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  };
}


