import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting test seed...')
  
  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 12)
  const userPassword = await bcrypt.hash('user123', 12)
  
  console.log('📧 Creating test users...')
  
  // Create Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@wallstreetenglish.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@wallstreetenglish.com',
      password: adminPassword,
      phone: '+966501234567',
      role: 'SUPER_ADMIN',
    },
  })
  
  // Create test customer who completed payment
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Ahmed Al-Rashid',
      email: 'test@example.com',
      password: userPassword,
      phone: '+966507654321',
      role: 'USER',
    },
  })
  
  // Create another test customer
  const testUser2 = await prisma.user.upsert({
    where: { email: 'sara@example.com' },
    update: {},
    create: {
      name: 'Sara Al-Zahra',
      email: 'sara@example.com',
      password: userPassword,
      phone: '+966509876543',
      role: 'USER',
    },
  })
  
  console.log('💳 Creating test payments...')
  
  // Create payment record for test user
  await prisma.payment.upsert({
    where: { transactionRef: 'TEST-TXN-001' },
    update: {},
    create: {
      userId: testUser.id,
      transactionRef: 'TEST-TXN-001',
      cartId: 'WSE-TEST-001',
      amount: 27,
      currency: 'SAR',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card',
      cardType: 'Visa',
      responseCode: '00',
      responseMessage: 'Approved',
      transactionTime: new Date(),
    },
  })
  
  // Create payment for second user
  await prisma.payment.upsert({
    where: { transactionRef: 'TEST-TXN-002' },
    update: {},
    create: {
      userId: testUser2.id,
      transactionRef: 'TEST-TXN-002',
      cartId: 'WSE-TEST-002',
      amount: 27,
      currency: 'SAR',
      status: 'COMPLETED',
      paymentMethod: 'MasterCard',
      cardType: 'MasterCard',
      responseCode: '00',
      responseMessage: 'Approved',
      transactionTime: new Date(),
    },
  })
  
  console.log('📚 Ensuring assessment sections exist...')
  
  // Get all assessment sections
  const sections = await prisma.assessmentSection.findMany({
    orderBy: { order: 'asc' }
  })
  
  if (sections.length === 0) {
    console.log('⚠️  No assessment sections found. Running main seed first...')
    // Import and run the main seed
    const { execSync } = require('child_process')
    execSync('npm run db:seed', { stdio: 'inherit' })
    
    // Refetch sections
    const newSections = await prisma.assessmentSection.findMany({
      orderBy: { order: 'asc' }
    })
    console.log(`✅ Created ${newSections.length} assessment sections`)
  } else {
    console.log(`✅ Found ${sections.length} assessment sections`)
  }
  
  console.log('🎯 Creating user assessments and progress...')
  
  // Create user assessments
  await prisma.userAssessment.upsert({
    where: { userId: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    },
  })
  
  await prisma.userAssessment.upsert({
    where: { userId: testUser2.id },
    update: {},
    create: {
      userId: testUser2.id,
      status: 'NOT_STARTED',
    },
  })
  
  // Create some progress for test user (completed first 3 sections)
  const allSections = await prisma.assessmentSection.findMany({
    orderBy: { order: 'asc' },
    take: 5 // First 5 sections
  })
  
  for (let i = 0; i < Math.min(3, allSections.length); i++) {
    const section = allSections[i]
    await prisma.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId: testUser.id,
          sectionId: section.id
        }
      },
      update: {},
      create: {
        userId: testUser.id,
        sectionId: section.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - (3 - i) * 24 * 60 * 60 * 1000), // Stagger dates
        completedAt: new Date(Date.now() - (3 - i - 1) * 24 * 60 * 60 * 1000),
        score: 85 + Math.random() * 10, // Random score between 85-95
      },
    })
  }
  
  // Set current section (4th) as in progress
  if (allSections.length >= 4) {
    await prisma.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId: testUser.id,
          sectionId: allSections[3].id
        }
      },
      update: {},
      create: {
        userId: testUser.id,
        sectionId: allSections[3].id,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    })
  }
  
  // Create some sample responses for the completed sections
  console.log('📝 Creating sample user responses...')
  
  for (let i = 0; i < Math.min(3, allSections.length); i++) {
    const section = allSections[i]
    const activities = await prisma.activity.findMany({
      where: { sectionId: section.id },
      take: 2 // First 2 activities per section
    })
    
    for (const activity of activities) {
      await prisma.userResponse.upsert({
        where: {
          userId_activityId: {
            userId: testUser.id,
            activityId: activity.id
          }
        },
        update: {},
        create: {
          userId: testUser.id,
          activityId: activity.id,
          response: `This is a sample response for ${activity.title}. The user has completed this activity successfully with good understanding of the concepts.`,
          score: 80 + Math.random() * 15, // Random score between 80-95
        },
      })
    }
  }
  
  console.log('✅ Test seed completed successfully!')
  console.log('')
  console.log('🔑 TEST CREDENTIALS:')
  console.log('==========================================')
  console.log('')
  console.log('🔐 SUPER ADMIN ACCESS:')
  console.log('URL: http://localhost:3000/auth/signin')
  console.log('Email: admin@wallstreetenglish.com')
  console.log('Password: admin123')
  console.log('→ After login, you\'ll be redirected to: /admin')
  console.log('')
  console.log('👤 TEST USER ACCESS (Customer):')
  console.log('URL: http://localhost:3000/auth/signin')
  console.log('Email: test@example.com')
  console.log('Password: user123')
  console.log('→ After login, you\'ll be redirected to: /assessment')
  console.log('→ This user has completed 3 sections and is on section 4')
  console.log('')
  console.log('👤 TEST USER 2 (Fresh Customer):')
  console.log('URL: http://localhost:3000/auth/signin')
  console.log('Email: sara@example.com')
  console.log('Password: user123')
  console.log('→ After login, you\'ll be redirected to: /assessment')
  console.log('→ This user hasn\'t started the assessment yet')
  console.log('')
  console.log('🧪 TESTING GUIDE:')
  console.log('==========================================')
  console.log('1. Start the server: npm run dev')
  console.log('2. Test admin dashboard: Login as admin → View users and progress')
  console.log('3. Test assessment flow: Login as test user → Continue assessment')
  console.log('4. Test fresh user: Login as sara → Start from section 1')
  console.log('5. Test payment flow: Go to /payment → Make test payment')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
