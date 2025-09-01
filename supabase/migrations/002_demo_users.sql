-- Insert demo users for development
-- These users will be created in Supabase auth.users table

-- Note: In production, you would create these users through the Supabase dashboard
-- or through the auth API. This migration is for development purposes.

-- Create demo guide user
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  'demo-guide-uuid',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'guide@pentara.app',
  crypt('demo123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create demo guardian user
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  'demo-guardian-uuid',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'guardian@pentara.app',
  crypt('demo123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Insert corresponding records in public.users table
INSERT INTO public.users (
  id,
  name,
  email,
  email_verified,
  role,
  created_at,
  updated_at
) VALUES (
  'demo-guide-uuid',
  'Demo Guide',
  'guide@pentara.app',
  NOW(),
  'GUIDE',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();

INSERT INTO public.users (
  id,
  name,
  email,
  email_verified,
  role,
  created_at,
  updated_at
) VALUES (
  'demo-guardian-uuid',
  'Demo Guardian',
  'guardian@pentara.app',
  NOW(),
  'GUARDIAN',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();
