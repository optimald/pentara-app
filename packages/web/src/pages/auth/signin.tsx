import { signIn, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Portal Access - Pentara</title>
        <meta name="description" content="Enter the council's domain" />
      </Head>

      <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/" className="flex justify-center items-center space-x-2 mb-8">
            <img 
              src="/logo.jpeg" 
              alt="Pentara" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-serif font-semibold text-white">
              Pentara
            </span>
          </a>
          
          <h2 className="text-center text-3xl font-serif font-bold text-white">
            Council Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Enter your credentials to access the inner sanctum
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-slate-700">
            <form id="login-form" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                  Initiate's Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-slate-700 text-white"
                    placeholder="initiate@pentara.app"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  Sacred Key
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-slate-700 text-white"
                    placeholder="Enter your sacred key"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  id="submit-btn"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Enter the Portal
                </button>
              </div>
            </form>

            <div id="message" className="mt-4 p-4 rounded-md hidden">
              <p className="text-sm"></p>
            </div>

            {/* Mystical Access Portals (Dev Only) */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800 text-slate-400">
                    Mystical Portals
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  id="guide-login-btn"
                  className="w-full flex justify-center py-2 px-4 border border-amber-500/30 rounded-md shadow-sm text-sm font-medium text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
                >
                  Enter as Guide
                </button>
                <button
                  id="guardian-login-btn"
                  className="w-full flex justify-center py-2 px-4 border border-slate-500/30 rounded-md shadow-sm text-sm font-medium text-slate-200 bg-slate-500/10 hover:bg-slate-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
                >
                  Enter as Guardian
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client-side script for form handling */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const form = document.getElementById('login-form');
              const submitBtn = document.getElementById('submit-btn');
              const messageDiv = document.getElementById('message');
              const messageText = messageDiv.querySelector('p');
              const guideBtn = document.getElementById('guide-login-btn');
              const guardianBtn = document.getElementById('guardian-login-btn');
              
              // Mystical portal functionality
              guideBtn.addEventListener('click', async function() {
                const originalText = guideBtn.textContent;
                guideBtn.textContent = 'Opening Portal...';
                guideBtn.disabled = true;
                
                try {
                  // Simulate Guide portal opening - replace with actual implementation
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  window.location.href = '/console?role=guide';
                } catch (error) {
                  console.error('Guide portal failed:', error);
                  guideBtn.textContent = originalText;
                  guideBtn.disabled = false;
                }
              });
              
              guardianBtn.addEventListener('click', async function() {
                const originalText = guardianBtn.textContent;
                guardianBtn.textContent = 'Opening Portal...';
                guardianBtn.disabled = true;
                
                try {
                  // Simulate Guardian portal opening - replace with actual implementation
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  window.location.href = '/console?role=guardian';
                } catch (error) {
                  console.error('Guardian portal failed:', error);
                  guardianBtn.textContent = originalText;
                  guardianBtn.disabled = false;
                }
              });
              
              form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const originalText = submitBtn.textContent;
                
                // Update button state
                submitBtn.textContent = 'Opening Portal...';
                submitBtn.disabled = true;
                
                // Hide any existing message
                messageDiv.className = 'mt-4 p-4 rounded-md hidden';
                
                try {
                  const response = await fetch('/api/auth/signin/credentials', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                      email: email,
                      password: password 
                    }),
                  });
                  
                  const result = await response.json();
                  
                  if (result.error) {
                    messageText.textContent = 'The portal rejects your credentials. Try again.';
                    messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30';
                  } else {
                    // Redirect to console on successful login
                    window.location.href = '/console';
                  }
                } catch (error) {
                  messageText.textContent = 'The portal is sealed. Try again.';
                  messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30';
                } finally {
                  // Reset button state
                  submitBtn.textContent = originalText;
                  submitBtn.disabled = false;
                }
              });
            })();
          `
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/console',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
