# WhatsApp Production Debugging Guide

## Issue: Test Works, But Production Payment Doesn't Send WhatsApp

### Common Causes

1. **Environment Variables Not Set in Vercel** ⚠️ MOST COMMON
2. **Phone Number Missing or Wrong Format from ClickPay**
3. **Template Name Mismatch**
4. **API Credentials Wrong in Production**

---

## Step 1: Check Vercel Environment Variables

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Verify these are set (and not empty):
```
✅ BAVATEL_API_ACCOUNT_ID=24095
✅ BAVATEL_API_ACCESS_TOKEN=63CXCSaixNAvYrawZb9QUVWD
✅ BAVATEL_API_URL=https://chat.bevatel.com
✅ BAVATEL_INBOX_ID=61770
✅ BAVATEL_TEMPLATE_NAME=wse_account_activation
✅ APP_URL=https://campaign.wallstreetenglish.edu.sa
```

**Important:**
- Make sure they're set for **Production** environment
- After adding/updating, **redeploy** your app
- Check for typos (case-sensitive)

---

## Step 2: Check Vercel Function Logs

After making a payment, check the logs:

1. Go to **Vercel Dashboard → Your Project → Functions**
2. Find the `/api/clickpay/callback` function
3. Click on it to view logs
4. Look for these log messages:

### Success Indicators:
```
✅ WhatsApp message sent successfully
📱 Sending WhatsApp to: +966...
📤 Bavatel WhatsApp API request: ...
📥 Bavatel API Response: { status: 201, ... }
```

### Error Indicators:
```
❌ Bavatel WhatsApp: Missing API configuration
❌ WhatsApp: Customer phone number is missing!
⚠️ Failed to send WhatsApp message: ...
📥 Bavatel API Response: { status: 404, error: "Template could not be found" }
```

---

## Step 3: Check What the Logs Show

### If you see "Missing API configuration":
- **Fix:** Set environment variables in Vercel (Step 1)

### If you see "Customer phone number is missing":
- **Fix:** Check ClickPay form - phone field might be empty or named differently
- Check `customer_details.phone` in the callback data

### If you see "Template could not be found":
- **Fix:** Verify template name matches exactly (case-sensitive)
- Check template is approved in Meta Business Manager
- Try different language code (`ar` vs `ar_SA`)

### If you see no WhatsApp logs at all:
- **Fix:** The callback might not be reaching the WhatsApp code
- Check if payment is actually approved (`response_status === 'A'`)
- Check if there are any errors before the WhatsApp code

---

## Step 4: Verify Phone Number Format

The phone number from ClickPay should be:
- Present in `customer_details.phone`
- In any format (we'll format it automatically)
- Examples that work:
  - `+966501234567` ✅
  - `0501234567` ✅ (will become +966501234567)
  - `+971501234567` ✅ (UAE - preserved)

---

## Step 5: Test with Real Payment

1. Make a test payment
2. Immediately check Vercel logs
3. Look for the detailed logs we added:
   ```
   📱 Attempting to send WhatsApp message...
   📱 Customer phone from payment: ...
   📱 Bavatel config check: ...
   📱 Sending WhatsApp to: ...
   ```

---

## Quick Checklist

- [ ] All environment variables set in Vercel
- [ ] Variables set for Production environment
- [ ] App redeployed after setting variables
- [ ] Template name matches exactly: `wse_account_activation`
- [ ] Template is approved in Meta Business Manager
- [ ] Phone number is being collected in ClickPay form
- [ ] Checked Vercel function logs after payment
- [ ] No errors in logs before WhatsApp code

---

## Still Not Working?

Share the Vercel function logs with:
1. The exact error messages
2. The "Bavatel config check" output
3. The "Customer phone from payment" value
4. Any API response errors

This will help identify the exact issue!

