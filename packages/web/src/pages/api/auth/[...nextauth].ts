import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';

// Build providers array conditionally based on available environment variables
const providers = [];

// Add Google provider if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Add Facebook provider if credentials are available
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  );
}

// Add Email provider if SMTP credentials are available
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.FROM_EMAIL || 'noreply@pentara.app',
    })
  );
}

// If no providers are configured, add a fallback email provider
if (providers.length === 0) {
  console.warn('No OAuth providers configured. Using fallback email provider.');
  providers.push(
    EmailProvider({
      server: {
        host: 'localhost',
        port: 1025,
      },
      from: 'noreply@pentara.app',
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as any).role;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Only allow coaches and admins to sign in
      if (user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          
          if (!existingUser) {
            // For new users, only allow if they're being created by an admin
            // In production, you'd have a more sophisticated invitation system
            return false;
          }
          
          return true;
        } catch (error) {
          console.error('Database error during sign in:', error);
          return false;
        }
      }
      return false;
    },
  },
  session: {
    strategy: 'database',
  },
  // Add error handling
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
