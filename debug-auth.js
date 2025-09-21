// Quick debug script to test which URLs work
const urls = [
  'https://campaign.wallstreetenglish.edu.sa',
  'https://online-kappa-lemon.vercel.app'
];

console.log('Testing URLs...\n');

urls.forEach(async (url, index) => {
  try {
    console.log(`${index + 1}. Testing: ${url}`);
    
    // Test main page
    const response = await fetch(url);
    console.log(`   Main page status: ${response.status}`);
    
    // Test NextAuth endpoint
    const authResponse = await fetch(`${url}/api/auth/providers`);
    console.log(`   NextAuth providers status: ${authResponse.status}`);
    
    if (authResponse.status === 200) {
      const providers = await authResponse.json();
      console.log(`   ✅ NextAuth working! Providers:`, Object.keys(providers));
    } else {
      console.log(`   ❌ NextAuth not working`);
    }
    
    console.log('');
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }
});
