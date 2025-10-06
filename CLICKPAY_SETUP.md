# ClickPay Integration Setup Guide

## Overview
This project integrates ClickPay payment gateway for secure credit card processing in Saudi Arabia. The integration follows ClickPay's API documentation and supports hosted payment pages for maximum security.

## Features Implemented
✅ **Credit Card Payments** - Visa, MasterCard, American Express, mada  
✅ **Hosted Payment Pages** - Secure card data handling  
✅ **Server-to-Server Callbacks** - Real-time payment notifications  
✅ **Payment Verification** - Double-check payment status  
✅ **Multi-language Support** - Arabic interface  
✅ **Facebook & Snapchat Tracking** - E-commerce event tracking  

## Setup Instructions

### 1. Get ClickPay Credentials
1. Sign up for a ClickPay merchant account at [clickpay.com.sa](https://clickpay.com.sa)
2. Complete the merchant verification process
3. Access your Merchant Dashboard
4. Navigate to: **Developers > Getting Started > Transaction API**
5. Note down your:
   - **Profile ID** (profile_id)
   - **Server Key** (server_key)  
   - **API Endpoint** (specific to your region)

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# ClickPay Configuration
CLICKPAY_ENDPOINT=https://secure.clickpay.com.sa
CLICKPAY_PROFILE_ID=your_profile_id_here
CLICKPAY_SERVER_KEY=your_server_key_here
```

**Important:** 
- Use the correct endpoint for your region (Saudi Arabia: `https://secure.clickpay.com.sa`)
- Never commit your actual credentials to version control
- Keep your server key secret and secure

### 3. Test the Integration

#### Development Testing:
1. Use ClickPay's test credentials (if provided)
2. Test with small amounts (1 SAR)
3. Verify all payment flows:
   - Successful payments
   - Failed payments  
   - Pending payments

#### Production Testing:
1. Use real credentials with small test amounts
2. Test with different card types
3. Verify callback notifications are received
4. Check payment verification works

## API Endpoints Created

### `/api/clickpay` (POST)
**Purpose:** Process payment requests  
**Input:**
```json
{
  "fullName": "أحمد محمد",
  "email": "ahmed@example.com", 
  "phone": "0501234567",
  "amount": 47,
  "currency": "SAR"
}
```

**Output:**
```json
{
  "success": true,
  "requiresRedirect": true,
  "redirectUrl": "https://secure.clickpay.com.sa/payment/page/...",
  "transactionRef": "TST123456789",
  "cartId": "WSE-1234567890-abc123"
}
```

### `/api/clickpay/callback` (POST)
**Purpose:** Receive server-to-server payment notifications from ClickPay  
**Security:** Only ClickPay servers should call this endpoint  
**Functionality:** 
- Validates payment results
- Updates order status
- Triggers business logic (emails, fulfillment, etc.)

### `/api/clickpay/verify` (POST)
**Purpose:** Verify payment status  
**Input:**
```json
{
  "transactionRef": "TST123456789",
  "cartId": "WSE-1234567890-abc123"
}
```

## Payment Flow

### 1. User Clicks "ادفع الآن" (Pay Now)
- Form validation runs
- Facebook Pixel tracks "InitiateCheckout"
- API call to `/api/clickpay`

### 2. ClickPay Processing
- Server creates payment request
- ClickPay returns hosted payment page URL
- User redirects to secure ClickPay page

### 3. Card Processing
- User enters card details on ClickPay's secure page
- ClickPay processes payment with bank
- Payment result determined

### 4. Callback & Redirect
- **Callback:** ClickPay sends server-to-server notification to `/api/clickpay/callback`
- **Redirect:** User returns to `/thank-you?payment=success&ref=TST123456789`

### 5. Result Display
- Success: Welcome message + next steps
- Failed: Error message + retry option  
- Pending: Status message + wait instruction

## Security Features

### ✅ PCI Compliance
- Card data never touches your servers
- ClickPay handles all sensitive information
- Hosted payment pages ensure security

### ✅ Server-Side Validation  
- All payment requests validated server-side
- Callback verification prevents tampering
- Transaction verification as backup

### ✅ HTTPS Only
- All API calls use HTTPS
- Secure data transmission
- SSL certificate required

## Supported Payment Methods

### Credit Cards
- **Visa** ✅
- **MasterCard** ✅  
- **American Express** ✅
- **mada** (Saudi Arabia) ✅

### Future Extensions
- **Apple Pay** (can be added)
- **STC Pay** (can be added)  
- **Bank Transfer** (can be added)

## Error Handling

### Common Error Codes
- **400:** Invalid request data
- **401:** Authentication failed (check server key)
- **500:** ClickPay server error
- **Network errors:** Connection issues

### User-Friendly Messages
- Arabic error messages displayed to users
- Retry options for failed payments
- Clear next steps for each scenario

## Testing Checklist

### ✅ Payment Success Flow
- [ ] Payment processes successfully
- [ ] User redirects to success page  
- [ ] Facebook/Snapchat events fire
- [ ] Callback received and processed
- [ ] Transaction ref displayed

### ✅ Payment Failure Flow  
- [ ] Failed payment handled gracefully
- [ ] User sees error message
- [ ] Retry option available
- [ ] No charges applied

### ✅ Edge Cases
- [ ] Network timeouts handled
- [ ] Invalid card numbers rejected
- [ ] Insufficient funds handled
- [ ] Browser back button scenarios

## Monitoring & Analytics

### Payment Tracking
- Facebook Pixel events: InitiateCheckout, AddPaymentInfo, Purchase
- Snapchat Pixel events: PURCHASE  
- Google Tag Manager integration ready

### Error Monitoring
- Server logs for payment failures
- Callback processing logs
- API response monitoring

## Support & Troubleshooting

### Common Issues

**"Authentication failed"**
- Check CLICKPAY_SERVER_KEY is correct
- Verify endpoint URL matches your region
- Ensure no extra spaces in environment variables

**"Redirect not working"**  
- Check return URL is accessible
- Verify HTTPS is used in production
- Test callback URL responds with 200

**"Payment verification fails"**
- Check transaction reference format
- Verify API credentials
- Test with known successful transaction

### ClickPay Support
- Documentation: [support.clickpay.com.sa](https://support.clickpay.com.sa)
- Technical Support: Available through merchant dashboard
- Integration Guide: [API Documentation](https://support.clickpay.com.sa/en/support/solutions/articles/73000572396-transactions-api)

## Production Deployment

### Environment Setup
1. Set production environment variables
2. Use production ClickPay credentials  
3. Enable HTTPS
4. Configure proper domain for callbacks

### Security Checklist
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Callback endpoint protected
- [ ] Error messages don't expose sensitive data
- [ ] Logging configured properly

### Go-Live Steps
1. Complete ClickPay merchant verification
2. Test with small real transactions
3. Monitor first few payments closely
4. Set up payment monitoring alerts

---

## Summary

The ClickPay integration is now complete and ready for production use. The implementation follows security best practices and provides a seamless payment experience for Arabic-speaking users in Saudi Arabia.

**Key Benefits:**
- ✅ Secure PCI-compliant payment processing
- ✅ Support for all major card types including mada
- ✅ Arabic language interface
- ✅ Comprehensive error handling
- ✅ Real-time payment tracking
- ✅ Mobile-responsive design

For any technical questions or issues, refer to the ClickPay documentation or contact their technical support team.
