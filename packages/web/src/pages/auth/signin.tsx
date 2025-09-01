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

      <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/" className="flex justify-center items-center space-x-2 mb-8">
            <img 
              src="/logo.jpeg" 
              alt="Pentara" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-serif text-white tracking-wider" style={{ fontWeight: '400', letterSpacing: '1px' }}>
              Pentara
            </span>
          </a>
          
          <h2 className="text-center text-3xl font-serif font-light text-white tracking-widest">
            Council Portal
          </h2>
          <p className="mt-2 text-center text-sm text-white/70 font-light tracking-wide">
            Enter your credentials to access the inner sanctum
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-transparent border border-[#E5E4E2]/20 py-8 px-4 backdrop-blur-luxury shadow-luxury-lg sm:rounded-xl sm:px-10">
            <form id="login-form" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-white/80 font-light tracking-wide">
                  Initiate's Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md placeholder-white/50 focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm bg-transparent text-white backdrop-blur-sm"
                    placeholder="initiate@pentara.app"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-white/80 font-light tracking-wide">
                  Sacred Key
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-[#E5E4E2]/30 rounded-md placeholder-white/50 focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm bg-transparent text-white backdrop-blur-sm"
                    placeholder="Enter your sacred key"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  id="submit-btn"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-champagne-lg text-sm font-medium text-white bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7B1A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] tracking-wider"
                >
                  Enter the Portal
                </button>
              </div>
            </form>

            <div id="message" className="mt-4 p-4 rounded-md hidden">
              <p className="text-sm"></p>
            </div>

            {/* Demo Login Portals */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E4E2]/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0a0a0a] text-white/60 font-light tracking-wide">
                    Demo Portals
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  id="guide-login-btn"
                  className="w-full flex justify-center py-2 px-4 border border-[#D4AF37]/30 rounded-md shadow-sm text-sm font-medium text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 tracking-wider"
                >
                  Enter as Coach
                </button>
                <button
                  id="guardian-login-btn"
                  className="w-full flex justify-center py-2 px-4 border border-[#E5E4E2]/30 rounded-md shadow-sm text-sm font-medium text-white/80 bg-[#E5E4E2]/10 hover:bg-[#E5E4E2]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5E4E2] transition-all duration-300 tracking-wider"
                >
                  Enter as Admin
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
              
              // Demo login functionality
              guideBtn.addEventListener('click', async function() {
                const originalText = guideBtn.textContent;
                guideBtn.textContent = 'Opening Portal...';
                guideBtn.disabled = true;
                
                try {
                  // Demo login as Coach
                  const response = await fetch('/api/auth/signin/credentials', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                      email: 'coach@pentara.app',
                      password: 'demo123'
                    }),
                  });
                  
                  const result = await response.json();
                  
                  if (result.error) {
                    console.error('Coach portal failed:', result.error);
                    messageText.textContent = 'Coach portal failed. Please try again.';
                    messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
                    guideBtn.textContent = originalText;
                    guideBtn.disabled = false;
                  } else {
                    window.location.href = '/console';
                  }
                } catch (error) {
                  console.error('Coach portal failed:', error);
                  messageText.textContent = 'Coach portal failed. Please try again.';
                  messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
                  guideBtn.textContent = originalText;
                  guideBtn.disabled = false;
                }
              });
              
              guardianBtn.addEventListener('click', async function() {
                const originalText = guardianBtn.textContent;
                guardianBtn.textContent = 'Opening Portal...';
                guardianBtn.disabled = true;
                
                try {
                  // Demo login as Admin
                  const response = await fetch('/api/auth/signin/credentials', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                      email: 'admin@pentara.app',
                      password: 'demo123'
                    }),
                  });
                  
                  const result = await response.json();
                  
                  if (result.error) {
                    console.error('Admin portal failed:', result.error);
                    messageText.textContent = 'Admin portal failed. Please try again.';
                    messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
                    guardianBtn.textContent = originalText;
                    guardianBtn.disabled = false;
                  } else {
                    window.location.href = '/console';
                  }
                } catch (error) {
                  console.error('Admin portal failed:', error);
                  messageText.textContent = 'Admin portal failed. Please try again.';
                  messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
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
                    messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
                  } else {
                    // Redirect to console on successful login
                    window.location.href = '/console';
                  }
                } catch (error) {
                  messageText.textContent = 'The portal is sealed. Try again.';
                  messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
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
