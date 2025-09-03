import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';

console.log('🔥 NextAuth configuration loading...');

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Cannot use adapter with CredentialsProvider
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔥 NextAuth authorize called with:', credentials);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('🔥 Missing credentials');
          return null;
        }

        // Demo users for testing
        const demoUsers = [
          {
            id: 'demo-guide-uuid',
            email: 'guide@pentara.app',
            name: 'Demo Guide',
            role: 'GUIDE'
          },
          {
            id: 'demo-guardian-uuid',
            email: 'guardian@pentara.app',
            name: 'Demo Guardian',
            role: 'GUARDIAN'
          }
        ];

        console.log('🔥 Checking against demo users...');

        const user = demoUsers.find(
          u => u.email === credentials.email && credentials.password === 'demo123'
        );

        if (user) {
          console.log('🔥 Found demo user, returning:', user);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        console.log('🔥 No matching demo user found');
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key',
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('🔥 Session callback - session:', session);
      console.log('🔥 Session callback - token:', token);
      
      if (session.user && token) {
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log('🔥 JWT callback - token:', token);
      console.log('🔥 JWT callback - user:', user);
      
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('🔥 SignIn callback - user:', user);
      return true;
    },
  },
  session: {
    strategy: 'jwt', // Use JWT since we're using CredentialsProvider
  },
  debug: true,
};

console.log('🔥 NextAuth configuration complete');

export default NextAuth(authOptions);