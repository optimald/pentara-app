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
                  id="submit-btn"
                  type="submit"
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
                  Enter as Guide
                </button>
                <button
                  id="guardian-login-btn"
                  className="w-full flex justify-center py-2 px-4 border border-[#E5E4E2]/30 rounded-md shadow-sm text-sm font-medium text-white/80 bg-[#E5E4E2]/10 hover:bg-[#E5E4E2]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5E4E2] transition-all duration-300 tracking-wider"
                >
                  Enter as Guardian
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client-side script for demo login */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const guideBtn = document.getElementById('guide-login-btn');
              const guardianBtn = document.getElementById('guardian-login-btn');
              const messageDiv = document.getElementById('message');
              const messageText = messageDiv.querySelector('p');
              
              function showError(message) {
                messageText.textContent = message;
                messageDiv.className = 'mt-4 p-4 rounded-md bg-red-900/20 text-red-200 border border-red-500/30 backdrop-blur-sm';
              }
              
              function hideError() {
                messageDiv.className = 'mt-4 p-4 rounded-md hidden';
              }
              
              async function demoLogin(email, password, button) {
                const originalText = button.textContent;
                button.textContent = 'Opening Portal...';
                button.disabled = true;
                hideError();
                
                try {
                  const response = await fetch('/api/auth/signin/credentials', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                      email: email,
                      password: password,
                      callbackUrl: window.location.origin + '/console'
                    }),
                  });
                  
                  if (response.ok || response.status === 302) {
                    // Success - redirect to console
                    window.location.href = '/console';
                  } else {
                    showError('Login failed. Please try again.');
                    button.textContent = originalText;
                    button.disabled = false;
                  }
                } catch (error) {
                  console.error('Login error:', error);
                  showError('Login failed. Please try again.');
                  button.textContent = originalText;
                  button.disabled = false;
                }
              }
              
              guideBtn.addEventListener('click', () => {
                demoLogin('guide@pentara.app', 'demo123', guideBtn);
              });
              
              guardianBtn.addEventListener('click', () => {
                demoLogin('guardian@pentara.app', 'demo123', guardianBtn);
              });
            })();
          `
        }}
      />
    </>
  );
}


