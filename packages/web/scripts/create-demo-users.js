const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createDemoUsers() {
  try {
    console.log('🔥 Creating demo users...');
    
    // Create Guide user
    const guide = await prisma.user.upsert({
      where: { email: 'guide@pentara.app' },
      update: {
        name: 'Demo Guide',
        role: 'GUIDE',
      },
      create: {
        email: 'guide@pentara.app',
        name: 'Demo Guide',
        role: 'GUIDE',
      },
    });
    
    console.log('✅ Created Guide user:', guide);
    
    // Create Guardian user
    const guardian = await prisma.user.upsert({
      where: { email: 'guardian@pentara.app' },
      update: {
        name: 'Demo Guardian',
        role: 'GUARDIAN',
      },
      create: {
        email: 'guardian@pentara.app',
        name: 'Demo Guardian',
        role: 'GUARDIAN',
      },
    });
    
    console.log('✅ Created Guardian user:', guardian);
    
    console.log('🎉 Demo users created successfully!');
  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoUsers();