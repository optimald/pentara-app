const { createClient } = require('@supabase/supabase-js');

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createDemoUsers() {
  console.log('Creating demo users...');

  try {
    // Create demo guide user
    const { data: guideUser, error: guideError } = await supabase.auth.admin.createUser({
      email: 'guide@pentara.app',
      password: 'demo123',
      email_confirm: true,
      user_metadata: {
        name: 'Demo Guide',
        role: 'GUIDE'
      }
    });

    if (guideError) {
      console.error('Error creating guide user:', guideError);
    } else {
      console.log('✅ Created guide user:', guideUser.user?.email);
    }

    // Create demo guardian user
    const { data: guardianUser, error: guardianError } = await supabase.auth.admin.createUser({
      email: 'guardian@pentara.app',
      password: 'demo123',
      email_confirm: true,
      user_metadata: {
        name: 'Demo Guardian',
        role: 'GUARDIAN'
      }
    });

    if (guardianError) {
      console.error('Error creating guardian user:', guardianError);
    } else {
      console.log('✅ Created guardian user:', guardianUser.user?.email);
    }

    // Create corresponding records in public.users table
    if (guideUser?.user) {
      const { error: guidePublicError } = await supabase
        .from('users')
        .upsert({
          id: guideUser.user.id,
          name: 'Demo Guide',
          email: 'guide@pentara.app',
          email_verified: new Date().toISOString(),
          role: 'GUIDE',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (guidePublicError) {
        console.error('Error creating guide public user record:', guidePublicError);
      } else {
        console.log('✅ Created guide public user record');
      }
    }

    if (guardianUser?.user) {
      const { error: guardianPublicError } = await supabase
        .from('users')
        .upsert({
          id: guardianUser.user.id,
          name: 'Demo Guardian',
          email: 'guardian@pentara.app',
          email_verified: new Date().toISOString(),
          role: 'GUARDIAN',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (guardianPublicError) {
        console.error('Error creating guardian public user record:', guardianPublicError);
      } else {
        console.log('✅ Created guardian public user record');
      }
    }

    console.log('\n🎉 Demo users created successfully!');
    console.log('You can now test the demo login functionality.');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createDemoUsers();
