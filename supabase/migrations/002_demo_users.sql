-- Create demo users in the public.users table
-- These will be used for demo login functionality

INSERT INTO public.users (
  id,
  email,
  name,
  role,
  created_at,
  updated_at
) VALUES (
  'demo-guide-uuid-001',
  'guide@pentara.app',
  'Demo Guide',
  'GUIDE',
  now(),
  now()
), (
  'demo-guardian-uuid-001', 
  'guardian@pentara.app',
  'Demo Guardian',
  'GUARDIAN',
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = now();