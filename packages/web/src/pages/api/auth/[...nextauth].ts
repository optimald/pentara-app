import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import EmailProvider from 'next-auth/providers/email';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '../../../lib/prisma';

// Demo users for development
const demoUsers: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'GUIDE' | 'GUARDIAN';
}> = [
  {
    id: 'demo-guide-uuid',
    email: 'guide@pentara.app',
    password: 'demo123',
    name: 'Demo Guide',
    role: 'GUIDE'
  },
  {
    id: 'demo-guardian-uuid',
    email: 'guardian@pentara.app',
    password: 'demo123',
    name: 'Demo Guardian',
    role: 'GUARDIAN'
  }
];

// Providers array with credentials provider for demo logins
const providers = [
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      console.log('NextAuth authorize - credentials:', credentials);
      
      if (!credentials?.email || !credentials?.password) {
        console.log('NextAuth authorize - missing credentials');
        return null;
      }

      const user = demoUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      console.log('NextAuth authorize - found user:', user);

      if (user) {
        const userObj = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as 'GUIDE' | 'GUARDIAN',
        };
        console.log('NextAuth authorize - returning user:', userObj);
        return userObj;
      }

      console.log('NextAuth authorize - no user found');
      return null;
    }
  })
];

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Temporarily disabled to fix context error
  providers,
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key',
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('NextAuth session callback - session:', session);
      console.log('NextAuth session callback - token:', token);
      
      if (session.user && token) {
        session.user.id = token.sub;
        session.user.role = (token as any).role;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log('NextAuth jwt callback - token:', token);
      console.log('NextAuth jwt callback - user:', user);
      
      if (user) {
        token.role = (user as any).role;
        console.log('NextAuth jwt callback - setting role:', (user as any).role);
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Temporarily allow all sign-ins for development
      return true;
      
      // Only allow coaches and admins to sign in
      // if (user.email) {
      //   try {
      //     const existingUser = await prisma.user.findUnique({
      //       where: { email: user.email },
      //     });
      //     
      //     if (!existingUser) {
      //       // For new users, only allow if they're being created by an admin
      //       // In production, you'd have a more sophisticated invitation system
      //       return false;
      //     }
      //     
      //     return true;
      //   } catch (error) {
      //     console.error('Database error during sign in:', error);
      //     return false;
      //   }
      // }
      // return false;
    },
  },
  session: {
    strategy: 'jwt', // Changed from 'database' to 'jwt' since we disabled the adapter
  },
  // Add error handling
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
