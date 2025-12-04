# Production URL Configuration

## Production Login URL

**Production Domain:** `https://campaign.wallstreetenglish.edu.sa`

**Login URL:** `https://campaign.wallstreetenglish.edu.sa/auth/signin`

---

## Vercel Environment Variables

Make sure to set `APP_URL` in Vercel to your production domain:

```
APP_URL=https://campaign.wallstreetenglish.edu.sa
```

This ensures that:
- ✅ WhatsApp messages use the correct login URL
- ✅ Email notifications use the correct login URL
- ✅ All links point to production

---

## Meta Template Variable Sample

When creating the WhatsApp template in Meta Business Manager, use this URL in the variable samples:

**{{3}} (Login URL)** = `https://campaign.wallstreetenglish.edu.sa/auth/signin`

---

## Complete Vercel Environment Variables

Set all these in Vercel Dashboard → Settings → Environment Variables:

```
# Application URLs
APP_URL=https://campaign.wallstreetenglish.edu.sa
NEXTAUTH_URL=https://campaign.wallstreetenglish.edu.sa

# Bavatel WhatsApp API
BAVATEL_API_ACCOUNT_ID=24095
BAVATEL_API_ACCESS_TOKEN=63CXCSaixNAvYrawZb9QUVWD
BAVATEL_API_URL=https://business-chat.bevatel.com
BAVATEL_INBOX_ID=61770
BAVATEL_PHONE_NUMBER=+966920032081
BAVATEL_TEMPLATE_NAME=wse_account_activation
```

---

## Testing

After deployment, test that WhatsApp messages contain the correct production URL:

```bash
# The login URL in WhatsApp messages should be:
https://campaign.wallstreetenglish.edu.sa/auth/signin
```

---

**Status:** Production URL configured ✅

