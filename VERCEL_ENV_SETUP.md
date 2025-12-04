# Vercel Environment Variables Setup

## Required Environment Variables for WhatsApp Integration

Make sure these are set in your Vercel project dashboard:

### Bavatel WhatsApp API
```
BAVATEL_API_ACCOUNT_ID=24095
BAVATEL_API_ACCESS_TOKEN=63CXCSaixNAvYrawZb9QUVWD
BAVATEL_API_URL=https://chat.bevatel.com
BAVATEL_INBOX_ID=61770
BAVATEL_PHONE_NUMBER=+966920032081
BAVATEL_TEMPLATE_NAME=wse_account_activation
```

### Application URLs (Production)
```
APP_URL=https://campaign.wallstreetenglish.edu.sa
NEXTAUTH_URL=https://campaign.wallstreetenglish.edu.sa
```

### Other Required Variables
```
# ClickPay (already set)
CLICKPAY_ENDPOINT=https://secure.clickpay.com.sa
CLICKPAY_PROFILE_ID=SJJNMJDH6R
CLICKPAY_SERVER_KEY=SJJNMJDH6R-JLNWWBNWT9-D2JNL2RJMD
CLICKPAY_CLIENT_KEY=C9KMT9-N6V76B-QVV2QV-TD9NH7

# Email (already set)
ELASTIC_EMAIL_API_KEY=...
FROM_EMAIL=info@wallstreetenglish.edu.sa
FROM_NAME=Wall Street English

# Database (already set)
DATABASE_URL=...
```

## How to Set in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: `BAVATEL_API_ACCOUNT_ID`
   - **Value**: `24095`
   - **Environment**: Select **Production**, **Preview**, and **Development**
   - Click **Save**
4. Repeat for all variables above

## Important Notes

- ✅ **Local Development**: Uses `.env.local` file
- ✅ **Vercel Production**: Uses Vercel dashboard environment variables
- ⚠️ **After adding variables**: Redeploy your app for changes to take effect
- ⚠️ **Template Name**: Must match exactly `wse_account_activation` (case-sensitive)

## Verify Setup

After setting variables and redeploying:

1. Make a test payment
2. Check Vercel function logs (in Vercel dashboard → Functions → View logs)
3. Look for:
   - `📤 Bavatel WhatsApp API request:` - Shows request being sent
   - `📥 Bavatel API Response:` - Shows API response
   - `✅ WhatsApp message sent successfully` - Success message
   - `❌` - Any error messages

## Troubleshooting

### Variables Not Loading
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables
- Check Vercel function logs for errors

### WhatsApp Not Sending
- Verify template is approved in Meta Business Manager
- Check template name matches exactly
- Verify phone number format (+966...)
- Check Bavatel account has credits/balance

---

**Status**: Make sure all variables are set in Vercel dashboard! ✅

