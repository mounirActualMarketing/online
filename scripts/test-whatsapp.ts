/**
 * Test script for Bavatel WhatsApp integration
 * 
 * This script allows you to test WhatsApp message sending
 * without going through the full payment flow.
 * 
 * Usage:
 *   npm run test:whatsapp +966501234567
 * 
 * Or with tsx directly:
 *   npx tsx scripts/test-whatsapp.ts +966501234567
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

import { sendCredentialsViaWhatsApp } from '../lib/whatsapp';

// Test data - customize as needed
const testData = {
  customerName: 'أحمد محمد',
  email: 'test@example.com',
  password: 'TestPass123!',
  phone: process.argv[2] || '0501234567', // Use command line arg or default
  loginUrl: process.env.APP_URL ? `${process.env.APP_URL}/auth/signin` : 'http://localhost:3000/auth/signin',
};

async function testWhatsApp() {
  console.log('🧪 Testing Bavatel WhatsApp Integration');
  console.log('=====================================\n');
  
  console.log('📋 Test Configuration:');
  console.log(`   Account ID: ${process.env.BAVATEL_API_ACCOUNT_ID || '❌ NOT SET'}`);
  console.log(`   Access Token: ${process.env.BAVATEL_API_ACCESS_TOKEN ? '✅ SET' : '❌ NOT SET'}`);
  console.log(`   API URL: ${process.env.BAVATEL_API_URL || '❌ NOT SET'}`);
  console.log(`   Inbox ID: ${process.env.BAVATEL_INBOX_ID || '❌ NOT SET'}`);
  console.log(`   Template Name: ${process.env.BAVATEL_TEMPLATE_NAME || '❌ NOT SET'}`);
  console.log('');
  
  console.log('📱 Test Message Data:');
  console.log(`   Customer Name: ${testData.customerName}`);
  console.log(`   Email: ${testData.email}`);
  console.log(`   Password: ${testData.password}`);
  console.log(`   Phone: ${testData.phone}`);
  console.log(`   Login URL: ${testData.loginUrl}`);
  console.log('\n🚀 Sending test message...\n');
  
  try {
    const result = await sendCredentialsViaWhatsApp(testData);
    
    console.log('\n=====================================');
    if (result) {
      console.log('✅ TEST PASSED: WhatsApp message sent successfully!');
      console.log('📱 Check your WhatsApp for the message.');
    } else {
      console.log('❌ TEST FAILED: WhatsApp message was not sent.');
      console.log('🔍 Check the error logs above for details.');
    }
    console.log('=====================================\n');
    
    process.exit(result ? 0 : 1);
  } catch (error) {
    console.error('\n❌ TEST ERROR:', error);
    process.exit(1);
  }
}

// Run the test
testWhatsApp();

