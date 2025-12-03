# 🧪 Test Bavatel WhatsApp Integration

## Quick Test (Easiest Way)

Run this command with your phone number:

```bash
npm run test:whatsapp +966501234567
```

Or use tsx directly:

```bash
npx tsx scripts/test-whatsapp.ts +966501234567
```

Replace `+966501234567` with your actual Saudi phone number.

## What Happens?

The test script will:
1. ✅ Check if your Bavatel credentials are configured
2. 📱 Format your phone number to international format
3. 📤 Send a test WhatsApp message with sample credentials
4. ✅ Report success or failure

## Expected Output

### ✅ Success
```
🧪 Testing Bavatel WhatsApp Integration
=====================================

📋 Test Configuration:
   Account ID: 24095
   Access Token: ✅ SET
   API URL: https://business-chat.bevatel.com

📱 Test Message Data:
   Customer Name: أحمد محمد
   Email: test@example.com
   Password: TestPass123!
   Phone: +966501234567
   Login URL: http://localhost:3000/auth/signin

🚀 Sending test message...

📱 Sending WhatsApp to: +966501234567
📤 Bavatel WhatsApp API request: {...}
✅ WhatsApp message sent successfully via Bavatel
📊 Full Response: {...}
✅ Credentials successfully delivered via WhatsApp

=====================================
✅ TEST PASSED: WhatsApp message sent successfully!
📱 Check your WhatsApp for the message.
=====================================
```

### ❌ Failure
```
❌ Bavatel WhatsApp API error: {...}
⚠️ Failed to deliver credentials via WhatsApp
=====================================
❌ TEST FAILED: WhatsApp message was not sent.
🔍 Check the error logs above for details.
=====================================
```

## What to Check on WhatsApp

You should receive a message like:

```
مرحباً أحمد محمد،

تم تفعيل حسابك بنجاح! 🎉

معلومات الدخول:
📧 البريد الإلكتروني: test@example.com
🔑 كلمة المرور: TestPass123!

رابط الدخول:
http://localhost:3000/auth/signin

يمكنك الآن البدء في اختبار تحديد المستوى الخاص بك. 📚

شكراً لانضمامك إلى Wall Street English! 🌟

احتفظ بهذه المعلومات في مكان آمن. ⚠️
```

## Troubleshooting

### "Cannot find module '../lib/whatsapp'"
Make sure you're in the project root directory:
```bash
cd /Users/mounirbennassar/Documents/clients/WSE/online
npm run test:whatsapp +966YOUR_PHONE
```

### WhatsApp message not received
1. Check the console output for errors
2. Verify your phone number is correct and in Saudi format
3. Make sure the phone can receive WhatsApp messages
4. Check your Bavatel account status/balance
5. Try the manual curl test from `BAVATEL_WHATSAPP_SETUP.md`

### API Error Response
If you see an API error, check:
- Is your Bavatel account active?
- Do you have sufficient balance/credits?
- Is the phone number valid?
- Check the Bavatel dashboard for more details

## Next: Test with Real Payment

Once the test script works, test with a real payment:

```bash
# Start the dev server
npm run dev

# Visit http://localhost:3000
# Complete a payment with a real phone number
# Check that you receive:
#   1. Welcome email
#   2. WhatsApp message with credentials
```

## Production Deployment

When ready for production:

1. **Set environment variables in Vercel:**
   ```
   BAVATEL_API_ACCOUNT_ID=24095
   BAVATEL_API_ACCESS_TOKEN=63CXCSaixNAvYrawZb9QUVWD
   BAVATEL_API_URL=https://business-chat.bevatel.com
   ```

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add Bavatel WhatsApp integration"
   git push origin main
   ```

3. **Test in production** with a real payment

## Support

- **Full Documentation:** `BAVATEL_WHATSAPP_SETUP.md`
- **Implementation Summary:** `BAVATEL_INTEGRATION_SUMMARY.md`
- **Bavatel API Docs:** https://documenter.getpostman.com/view/27285397/2s9Xxwwa4r

---

**Quick Test Command:** `npm run test:whatsapp +966YOUR_PHONE`

