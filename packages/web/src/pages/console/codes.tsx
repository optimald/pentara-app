import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { useState } from 'react';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

interface CodesPageProps {
  session: {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    } | null;
    expires?: string;
  } | null;
}

export default function CodesPage({ session }: CodesPageProps) {
  const [codes, setCodes] = useState([
    {
      id: 1,
      code: 'No codes generated yet',
      status: 'unused',
      createdAt: 'N/A',
      usedAt: null,
      usedBy: null,
      expiresAt: null
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generateForm, setGenerateForm] = useState({
    userEmail: '',
    ttlDays: 7
  });

  return (
    <>
      <Head>
        <title>Activation Codes - Pentara Console</title>
        <meta name="description" content="Manage activation codes for user access" />
      </Head>

      <ConsoleLayout session={session} currentPath="/console/codes">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-light text-white tracking-widest">
                Activation Codes
              </h1>
              <p className="text-white/70 font-light tracking-wide">
                Generate and manage activation codes for user access
              </p>
            </div>
            <button 
              onClick={() => setShowGenerateModal(true)}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate New Code'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Total Codes
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Used Codes
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Available Codes
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-[#E5E4E2]/20 overflow-hidden backdrop-blur-luxury shadow-luxury-lg rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-light text-white/70 truncate tracking-wide">
                        Expired Codes
                      </dt>
                      <dd className="text-2xl font-light text-white tracking-wider">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Codes Table */}
          <div className="bg-transparent border border-[#E5E4E2]/20 backdrop-blur-luxury shadow-luxury-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-light text-white mb-4 tracking-widest">
                Recent Activation Codes
              </h3>
              
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[#E5E4E2]/20">
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Used By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Used At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-light text-white/70 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E4E2]/20">
                    {codes.map((code) => (
                      <tr key={code.id} className="hover:bg-[#E5E4E2]/5 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded bg-gradient-to-br from-[#D4AF37]/30 to-[#B8941F]/30 flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-mono text-white tracking-wide">{code.code}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-light leading-5 text-blue-400 bg-blue-400/10 rounded-full tracking-wide">
                            {code.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                          {code.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                          {code.usedBy || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-light tracking-wide">
                          {code.usedAt || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-light">
                          <button className="text-[#D4AF37] hover:text-[#B8941F] tracking-wide transition-colors duration-200 mr-4">
                            Copy
                          </button>
                          <button className="text-red-400 hover:text-red-300 tracking-wide transition-colors duration-200">
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Generate Code Modal */}
          {showGenerateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#0a0a0a] border border-[#E5E4E2]/20 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-light text-white mb-4 tracking-widest">
                  Generate Activation Code
                </h3>
                
                <form onSubmit={handleGenerateCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                      User Email
                    </label>
                    <input
                      type="email"
                      value={generateForm.userEmail}
                      onChange={(e) => setGenerateForm({...generateForm, userEmail: e.target.value})}
                      className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/20 rounded-md text-white focus:border-[#D4AF37] focus:outline-none"
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">
                      TTL (Days)
                    </label>
                    <select
                      value={generateForm.ttlDays}
                      onChange={(e) => setGenerateForm({...generateForm, ttlDays: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-transparent border border-[#E5E4E2]/20 rounded-md text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value={1} className="bg-[#0a0a0a]">1 Day</option>
                      <option value={3} className="bg-[#0a0a0a]">3 Days</option>
                      <option value={7} className="bg-[#0a0a0a]">7 Days</option>
                      <option value={14} className="bg-[#0a0a0a]">14 Days</option>
                      <option value={30} className="bg-[#0a0a0a]">30 Days</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowGenerateModal(false)}
                      className="flex-1 px-4 py-2 border border-[#E5E4E2]/20 text-white rounded-md hover:bg-[#E5E4E2]/5 font-light tracking-wide transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-md hover:from-[#B8941F] hover:to-[#9A7B1A] font-light tracking-wide transition-all duration-300 disabled:opacity-50"
                    >
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </ConsoleLayout>
    </>
  );

  async function handleGenerateCode(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // In production, this would call the API:
      // const response = await fetch('/api/codes/generate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userEmail: generateForm.userEmail,
      //     profileId: 'temp-profile-id', // Would come from profile creation
      //     createdBy: session?.user?.id,
      //     ttlDays: generateForm.ttlDays
      //   })
      // });
      // const result = await response.json();

      // For development, simulate code generation
      const mockCode = `PNR-${Math.random().toString(36).substring(2, 5).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + generateForm.ttlDays);

      const newCode = {
        id: Date.now(),
        code: mockCode,
        status: 'unused',
        createdAt: new Date().toLocaleDateString(),
        usedAt: null,
        usedBy: null,
        expiresAt: expiresAt.toLocaleDateString(),
        userEmail: generateForm.userEmail
      };

      // Update codes list
      setCodes(prevCodes => {
        const filtered = prevCodes.filter(c => c.code !== 'No codes generated yet');
        return [newCode, ...filtered];
      });

      // Reset form and close modal
      setGenerateForm({ userEmail: '', ttlDays: 7 });
      setShowGenerateModal(false);

      console.log('✅ Generated activation code:', mockCode);

    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate activation code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Clean up session object to avoid serialization issues
  const cleanSession = {
    user: {
      id: session.user?.id || null,
      name: session.user?.name || null,
      email: session.user?.email || null,
      image: session.user?.image || null,
      role: (session.user as any)?.role || null,
    },
    expires: session.expires,
  };

  return {
    props: {
      session: cleanSession,
    },
  };
};
