# Supabase Setup Guide for Pentara

## Overview

Pentara uses [Supabase](https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu) as its PostgreSQL database with built-in authentication, real-time subscriptions, and edge functions.

**Project URL**: https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu

## Database Schema

The database includes the following tables:

### Core Tables
- **users** - Coach and admin user accounts (extends Supabase auth.users)
- **accounts** - NextAuth.js account linking
- **sessions** - NextAuth.js session management
- **verification_tokens** - Email verification tokens

### Pentara-Specific Tables
- **profiles** - User voice profiles with Personal Manual and Five-Voice data
- **activation_codes** - One-time codes for app activation
- **usage_counters** - Anonymous usage tracking for cost monitoring

## Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nyeujmrehxtgqvgyioqu.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nyeujmrehxtgqvgyioqu.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://nyeujmrehxtgqvgyioqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Getting Your Supabase Credentials

1. Go to [your Supabase project](https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu)
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** (already set above)
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** → `SUPABASE_SERVICE_ROLE_KEY`
4. Navigate to **Settings** → **Database**
5. Copy the **Connection string** → `DATABASE_URL` and `DIRECT_URL`
   - For `DATABASE_URL`: Use the connection pooling version (includes `?pgbouncer=true`)
   - For `DIRECT_URL`: Use the direct connection (no pgbouncer)

## Database Migration

### Option 1: Run SQL Migration (Recommended)
1. Go to [SQL Editor](https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu/sql) in your Supabase dashboard
2. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
3. Click **Run** to execute the migration

### Option 2: Use Prisma (Alternative)
```bash
cd packages/web
npx prisma db push
npx prisma generate
```

## Row Level Security (RLS)

The database uses Supabase's Row Level Security to ensure:

- **Coaches** can only access profiles they created
- **Users** can only access their own account data
- **Usage counters** are only accessible by service role (for privacy)
- **Activation codes** are only accessible by the coach who created them

## Authentication Flow

1. **Coach Login**: Magic link authentication via NextAuth.js
2. **Profile Creation**: Coaches create profiles during onboarding sessions
3. **Activation**: Users redeem activation codes to access their profiles
4. **Privacy**: No chat data is stored on the server

## API Integration

The app uses both:
- **Prisma Client** for type-safe database operations
- **Supabase Client** for real-time features and auth helpers

```typescript
// Database operations
import { prisma } from '@/lib/prisma';

// Real-time and auth
import { supabase, supabaseAdmin } from '@/lib/supabase';
```

## Local Development

For local development, you can use Supabase's local development stack:

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply migrations
supabase db reset
```

## Security Features

### Database Security
- All tables have RLS policies enabled
- Service role key required for admin operations
- Connection pooling for performance
- Encrypted connections (SSL)

### Privacy Compliance
- No chat messages stored in database
- Usage counters are anonymous
- Profile data encrypted at rest
- GDPR-compliant data deletion

## Monitoring & Analytics

Supabase provides built-in monitoring for:
- Database performance
- API usage
- Authentication metrics
- Real-time connections

Access these at: https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu

## Backup & Recovery

Supabase automatically handles:
- **Daily backups** for 7 days (free tier)
- **Point-in-time recovery** (paid tiers)
- **High availability** with automatic failover

## Cost Optimization

To keep costs low:
- Connection pooling is enabled
- RLS policies prevent unauthorized access
- Usage counters track API consumption
- No chat data stored (privacy + cost savings)

## Troubleshooting

### Common Issues

1. **Connection Errors**
   - Check if DATABASE_URL includes the correct password
   - Verify DIRECT_URL doesn't have pgbouncer parameter
   - Ensure IP allowlist includes your deployment platform

2. **Migration Errors**
   - Run migrations in Supabase SQL Editor first
   - Then run `npx prisma generate` to update client

3. **Auth Issues**
   - Verify NEXT_PUBLIC_SUPABASE_URL is correct
   - Check that site_url in Supabase auth settings matches your domain
   - Ensure redirect URLs are whitelisted

### Support

- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Project Dashboard**: https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu

This setup ensures Pentara has a robust, scalable, and privacy-first database architecture that can handle the coach console, profile generation, and mobile app activation flow.
