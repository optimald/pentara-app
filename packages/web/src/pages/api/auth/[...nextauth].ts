import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '../../../lib/prisma';

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

// Add credentials provider for demo logins
providers.push(
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      // Demo users for development
      const demoUsers = [
        {
          id: 'demo-coach-1',
          email: 'coach@pentara.app',
          password: 'demo123',
          name: 'Demo Coach',
          role: 'COACH'
        },
        {
          id: 'demo-admin-1',
          email: 'admin@pentara.app',
          password: 'demo123',
          name: 'Demo Admin',
          role: 'ADMIN'
        }
      ];

      const user = demoUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }

      return null;
    }
  })
);

// If no OAuth providers are configured, add a fallback email provider
if (providers.length === 1) { // Only credentials provider
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
  // adapter: PrismaAdapter(prisma), // Temporarily disabled to fix context error
  providers,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub;
        session.user.role = (token as any).role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
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
