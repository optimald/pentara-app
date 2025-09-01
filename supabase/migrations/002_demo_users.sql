-- Insert demo users for development
-- These users will be created in Supabase auth.users table

-- Note: In production, you would create these users through the Supabase dashboard
-- or through the auth API. This migration is for development purposes.

-- Create demo coach user
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
  'demo-coach-uuid',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'coach@pentara.app',
  crypt('demo123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create demo admin user
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
  'demo-admin-uuid',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin@pentara.app',
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
  'demo-coach-uuid',
  'Demo Coach',
  'coach@pentara.app',
  NOW(),
  'COACH',
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
  'demo-admin-uuid',
  'Demo Admin',
  'admin@pentara.app',
  NOW(),
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();
