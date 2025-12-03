# Bavatel WhatsApp Integration Documentation

## Overview

This document explains how the Bavatel WhatsApp API integration works in the WSE Online Assessment system. After a successful payment, customers receive their login credentials via both email and WhatsApp for redundancy.

## Architecture

### Flow Diagram

```
Payment Success → ClickPay Callback → User Creation → Send Notifications
                                                     ├── Email (Primary)
                                                     └── WhatsApp (Secondary)
```

### Key Components

1. **WhatsApp Service** (`lib/whatsapp.ts`)
   - Handles all WhatsApp API communication
   - Formats messages in Arabic
   - Manages phone number formatting
   - Provides comprehensive error handling

2. **Payment Callback** (`app/api/clickpay/callback/route.ts`)
   - Receives payment confirmation from ClickPay
   - Creates user account and generates password
   - Triggers email and WhatsApp notifications

3. **Environment Configuration** (`.env.local`)
   - Stores Bavatel API credentials securely

## Configuration

### Step 1: Bavatel API Credentials

Your Bavatel API credentials structure:
- API Account ID (your account identifier)
- API Access Token (authentication token)
- API URL (base endpoint: `https://business-chat.bevatel.com`)

### Step 2: Environment Variables Configuration

Your `.env.local` file has been configured with your credentials:

```bash
# Bavatel WhatsApp API Configuration
BAVATEL_API_ACCOUNT_ID=24095
BAVATEL_API_ACCESS_TOKEN=63CXCSaixNAvYrawZb9QUVWD
BAVATEL_API_URL=https://business-chat.bevatel.com
```

**Important Notes:**
- ✅ Credentials are already configured in `.env.local`
- Never commit `.env.local` to version control
- Keep API credentials secure
- Consider using different credentials for development and production

### Step 3: Test the Integration

Now that credentials are configured, test the integration:

```bash
# Run the test script with your phone number
npm run test:whatsapp +966501234567

# Or use tsx directly
npx tsx scripts/test-whatsapp.ts +966501234567
```

The system will automatically check for environment variables. If missing, it will:
- Log an error in the console
- Continue processing without WhatsApp (email fallback)
- Not break the payment flow

## WhatsApp Message Format

Messages are sent in Arabic with the following structure:

```
مرحباً [اسم العميل]،

تم تفعيل حسابك بنجاح! 🎉

معلومات الدخول:
📧 البريد الإلكتروني: [email@example.com]
🔑 كلمة المرور: [password123]

رابط الدخول:
[https://yoursite.com/auth/signin]

يمكنك الآن البدء في اختبار تحديد المستوى الخاص بك. 📚

شكراً لانضمامك إلى Wall Street English! 🌟

احتفظ بهذه المعلومات في مكان آمن. ⚠️
```

## Phone Number Handling

The system automatically formats phone numbers to international E.164 format:

- **Input:** `0501234567` (Saudi local format)
- **Output:** `+966501234567` (International format)

Supported input formats:
- Local Saudi: `0501234567`
- Without leading zero: `501234567`
- International with +: `+966501234567`
- International with 00: `00966501234567`

## Error Handling

The integration is designed to be **non-blocking**:

1. **Missing Configuration**
   - Logs error: `❌ Bavatel WhatsApp: Missing API configuration`
   - Returns `false` (but payment continues)
   - Email notification still sent

2. **API Request Failure**
   - Logs detailed error information
   - Returns `false`
   - Payment processing continues normally

3. **Network Issues**
   - Caught by try-catch block
   - Logged with full stack trace
   - User creation and email proceed normally

**Philosophy:** WhatsApp is a supplementary channel. If it fails, the customer still receives credentials via email.

## Testing

### Test with Placeholder Credentials

Before getting real Bavatel credentials, test the integration:

1. **Check Console Logs**
   ```bash
   npm run dev
   # Make a test payment
   # Check terminal for:
   # ❌ Bavatel WhatsApp: Missing API configuration
   ```

2. **Verify Non-Breaking Behavior**
   - Payment should complete successfully
   - User should be created in database
   - Email should be sent (if configured)
   - Console should show WhatsApp attempt

### Test with Real Credentials

Once you have Bavatel credentials:

1. **Update `.env.local`** with real values

2. **Make a Test Payment**
   - Use a real Saudi phone number
   - Complete payment successfully
   - Check console for: `✅ WhatsApp message sent successfully`

3. **Verify Message Receipt**
   - Check the customer's WhatsApp
   - Verify message formatting is correct
   - Confirm credentials match email

4. **Test Edge Cases**
   - Invalid phone numbers
   - Different phone formats
   - Non-Saudi numbers (if applicable)

### Manual API Test

Test the Bavatel API directly using curl:

```bash
curl -X POST https://business-chat.bevatel.com/api/send_message \
  -H "Content-Type: application/json" \
  -d '{
    "api_account_id": "24095",
    "api_access_token": "63CXCSaixNAvYrawZb9QUVWD",
    "to": "+966501234567",
    "message": "Test message from WSE"
  }'
```

## Monitoring and Debugging

### Console Log Patterns

**Successful Send:**
```
📱 Sending WhatsApp to: +966501234567
📤 Bavatel WhatsApp API request: {...}
✅ WhatsApp message sent successfully via Bavatel
📊 Response: {...}
✅ Credentials successfully delivered via WhatsApp
```

**Failed Send:**
```
📱 Sending WhatsApp to: +966501234567
📤 Bavatel WhatsApp API request: {...}
❌ Bavatel WhatsApp API error: {...}
⚠️ Failed to deliver credentials via WhatsApp (email fallback should handle this)
```

**Missing Configuration:**
```
❌ Bavatel WhatsApp: Missing API configuration
Required env vars: BAVATEL_API_ACCOUNT_ID, BAVATEL_API_ACCESS_TOKEN, BAVATEL_API_URL
⚠️ Failed to deliver credentials via WhatsApp (email fallback should handle this)
```

### Database Verification

After a successful payment, verify in PostgreSQL:

```sql
-- Check user was created
SELECT id, name, email, phone, "createdAt" 
FROM "User" 
WHERE email = 'customer@example.com';

-- Check payment was recorded
SELECT "userId", "transactionRef", amount, status, "createdAt"
FROM "Payment"
WHERE "transactionRef" = 'TST12345';
```

## Troubleshooting

### Issue: WhatsApp not being sent

**Check:**
1. Are environment variables set correctly in `.env.local`?
2. Is the API access token valid and not expired?
3. Is the account ID correct (24095)?
4. Is the phone number in correct format?
5. Check console logs for specific error messages

**Solutions:**
- Verify `.env.local` has correct values (already configured)
- Run test script: `npm run test:whatsapp +966YOUR_PHONE`
- Test API credentials with curl command (see above)
- Check Bavatel dashboard for account status
- Test with a known working Saudi phone number

### Issue: Phone number format errors

**Check:**
- Input phone number format in ClickPay
- Console logs showing formatted number

**Solutions:**
- Verify `formatPhoneNumber()` function logic
- Test with different Saudi number formats
- Check if Bavatel requires specific format

### Issue: API rate limiting

**Symptoms:**
- Intermittent failures
- 429 Too Many Requests errors

**Solutions:**
- Implement rate limiting in your code
- Contact Bavatel to increase limits
- Add retry logic with exponential backoff

## Security Best Practices

1. **Never Log Sensitive Data**
   - API keys are never logged
   - Passwords are never logged in full
   - Only log masked/partial data for debugging

2. **Environment Variables**
   - Store all credentials in `.env.local`
   - Never commit credentials to Git
   - Use different keys for dev/staging/production

3. **API Key Rotation**
   - Rotate API keys periodically
   - Update `.env.local` when keys change
   - Test thoroughly after rotation

4. **Access Control**
   - Limit who has access to production credentials
   - Use separate Bavatel accounts for dev/prod
   - Monitor API usage in Bavatel dashboard

## Production Deployment

### Vercel Environment Variables

Set these in Vercel dashboard under Settings → Environment Variables:

```
BAVATEL_API_ACCOUNT_ID=24095
BAVATEL_API_ACCESS_TOKEN=63CXCSaixNAvYrawZb9QUVWD
BAVATEL_API_URL=https://business-chat.bevatel.com
```

**Note:** Consider using separate production credentials if available.

### Deployment Checklist

- [x] Bavatel credentials obtained and configured
- [ ] Test locally with test script
- [ ] Test with real payment flow locally
- [ ] Environment variables set in Vercel
- [ ] Test payment in production with real number
- [ ] Verify WhatsApp message received
- [ ] Monitor logs for first 24 hours
- [ ] Set up alerts for failures

## API Reference

### `sendWhatsAppMessage(data)`

Sends a WhatsApp message with login credentials.

**Parameters:**
```typescript
{
  customerName: string;  // Customer's full name
  email: string;         // Customer's email address
  password: string;      // Generated password (plain text)
  phone: string;         // Customer's phone number (any format)
  loginUrl: string;      // URL to login page
}
```

**Returns:** `Promise<boolean>`
- `true` - Message sent successfully
- `false` - Message failed to send

**Example:**
```typescript
const success = await sendWhatsAppMessage({
  customerName: 'أحمد محمد',
  email: 'ahmed@example.com',
  password: 'Abc123!@',
  phone: '0501234567',
  loginUrl: 'https://wallstreetenglish.edu.sa/auth/signin',
});
```

### `sendCredentialsViaWhatsApp(data)`

Convenience wrapper with additional logging.

**Parameters:** Same as `sendWhatsAppMessage()`

**Returns:** `Promise<boolean>`

## Support

For Bavatel-specific issues:
- **Documentation:** https://documenter.getpostman.com/view/27285397/2s9Xxwwa4r
- **Support:** Contact your Bavatel account manager
- **Dashboard:** Check Bavatel business dashboard for API status

For integration issues:
- Check console logs first
- Review this documentation
- Test with curl to isolate issue
- Contact development team

## Future Enhancements

Potential improvements for consideration:

1. **Message Templates**
   - Use Bavatel's template feature for faster delivery
   - Pre-approve message templates with WhatsApp

2. **Delivery Receipts**
   - Implement webhook to receive delivery status
   - Store delivery status in database
   - Alert if message not delivered

3. **Rich Media**
   - Send welcome image/PDF with credentials
   - Include QR code for easy login

4. **Multi-Language**
   - Detect customer language preference
   - Send English or Arabic based on preference

5. **Retry Logic**
   - Automatic retry on temporary failures
   - Exponential backoff for rate limits

## Changelog

### Version 1.0.0 (2025-11-23)
- Initial implementation of Bavatel WhatsApp integration
- Arabic message template
- Phone number formatting for Saudi numbers
- Error handling and logging
- Non-blocking integration with payment flow



