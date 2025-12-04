# 📱 How to Create WhatsApp Template in Meta Business Manager

## Overview

WhatsApp Business API requires **pre-approved message templates** for sending messages to customers. You cannot send free-form messages to customers who haven't initiated a conversation. This guide will walk you through creating a template for sending login credentials.

## Step-by-Step Guide

### Step 1: Access Meta Business Manager

1. Go to [business.facebook.com](https://business.facebook.com)
2. Log in with your Meta Business account
3. Select your WhatsApp Business account
4. Navigate to **WhatsApp Manager** (or **WhatsApp** → **Message Templates**)

### Step 2: Create New Template

1. Click on **"Message templates"** in the left sidebar
2. Click the **"+ Create template"** button (usually blue, top right)
3. You'll see the template creation interface

### Step 3: Choose Template Category

Select **"AUTHENTICATION"** category (this is best for login credentials)

**Why Authentication?**
- Faster approval (usually 15 minutes vs 24-48 hours)
- Designed for account-related messages
- Higher delivery rates

**Alternative:** You can use **"UTILITY"** category if authentication doesn't fit your use case.

### Step 4: Configure Template Details

#### Template Name
- **Name:** `wse_account_activation`
- **Language:** Arabic (العربية)
- **Category:** Authentication (or Utility)

#### Template Structure

**Header (Optional):**
```
Welcome to Wall Street English
```
*Note: Keep it short (max 60 characters)*

**Body (Required):**
This is where you'll add your variables. Use this exact format:

```
مرحباً {{1}}،

تم تفعيل حسابك بنجاح! 🎉

معلومات الدخول:
📧 البريد الإلكتروني: {{2}}
🔑 كلمة المرور: {{3}}

رابط الدخول:
{{4}}

يمكنك الآن البدء في اختبار تحديد المستوى الخاص بك. 📚

شكراً لانضمامك إلى Wall Street English! 🌟

احتفظ بهذه المعلومات في مكان آمن. ⚠️
```

**How to Add Variables:**
1. Click the **"+ Add variable"** button in the Body section
2. Select **"Text"** as the variable type
3. Variables will appear as `{{1}}`, `{{2}}`, `{{3}}`, `{{4}}`
4. Place them in the correct positions:
   - `{{1}}` = Customer Name
   - `{{2}}` = Email Address
   - `{{3}}` = Password
   - `{{4}}` = Login URL

**Variable Order:**
- Variable 1: Customer Name (Text)
- Variable 2: Email Address (Text)
- Variable 3: Password (Text)
- Variable 4: Login URL (Text)

**Footer (Optional):**
```
Wall Street English
```
*Max 60 characters*

### Step 5: Preview Template

1. Check the **"Template Preview"** on the right side
2. Verify the message looks correct
3. Make sure variables are in the right order

### Step 6: Submit for Review

1. Click **"Submit for review"** button (bottom right)
2. Meta will review your template (usually 15 minutes for Authentication, 24-48 hours for others)
3. You'll receive an email notification when approved

### Step 7: Get Template Name

Once approved:
1. Go back to **Message templates**
2. Find your template
3. Copy the **exact template name** (e.g., `wse_account_activation`)
4. Update `.env.local`:
   ```bash
   BAVATEL_TEMPLATE_NAME=wse_account_activation
   ```

## Template Example (Copy-Paste Ready)

### Template Name
```
wse_login_credentials
```

### Header (Optional)
```
Welcome to Wall Street English
```

### Body (Required)
```
مرحباً {{1}}،

تم تفعيل حسابك بنجاح! 🎉

معلومات الدخول:
📧 البريد الإلكتروني: {{2}}
🔑 كلمة المرور: {{3}}

رابط الدخول:
{{4}}

يمكنك الآن البدء في اختبار تحديد المستوى الخاص بك. 📚

شكراً لانضمامك إلى Wall Street English! 🌟

احتفظ بهذه المعلومات في مكان آمن. ⚠️
```

### Footer (Optional)
```
Wall Street English
```

## Important Notes

### ✅ Do's
- ✅ Use **Authentication** category for faster approval
- ✅ Keep template name simple and descriptive
- ✅ Test variables in preview before submitting
- ✅ Use Arabic language for better customer experience
- ✅ Keep header/footer short (max 60 characters)
- ✅ Use emojis sparingly (they count as characters)

### ❌ Don'ts
- ❌ Don't include promotional content in Authentication templates
- ❌ Don't use special characters that might break variables
- ❌ Don't change variable order after approval
- ❌ Don't use template for marketing messages
- ❌ Don't exceed character limits (1024 for body, 60 for header/footer)

## Variable Mapping

When your code sends the template, it maps like this:

| Variable | Code Value | Example |
|----------|------------|---------|
| `{{1}}` | `data.customerName` | "أحمد محمد" |
| `{{2}}` | `data.email` | "ahmed@example.com" |
| `{{3}}` | `data.password` | "Abc123!@" |
| `{{4}}` | `data.loginUrl` | "https://wallstreetenglish.edu.sa/auth/signin" |

## Template Approval Status

### Check Status
1. Go to **Message templates** in Meta Business Manager
2. Find your template
3. Check status:
   - 🟡 **Pending** - Under review
   - 🟢 **Approved** - Ready to use
   - 🔴 **Rejected** - Needs revision

### If Rejected
1. Check rejection reason in Meta Business Manager
2. Common reasons:
   - Template name already exists
   - Content violates WhatsApp policies
   - Variables not properly formatted
   - Category mismatch
3. Fix issues and resubmit

## Alternative: English Template

If you prefer English, use this body:

```
Hello {{1}},

Your account has been successfully activated! 🎉

Login Information:
📧 Email: {{2}}
🔑 Password: {{3}}

Login URL:
{{4}}

You can now start your level assessment test. 📚

Thank you for joining Wall Street English! 🌟

Please keep this information secure. ⚠️
```

## Testing After Approval

Once your template is approved:

1. **Update `.env.local`:**
   ```bash
   BAVATEL_TEMPLATE_NAME=wse_account_activation
   ```

2. **Test with script:**
   ```bash
   npm run test:whatsapp +966501234567
   ```

3. **Verify message received** with correct variables filled in

## Troubleshooting

### Template Not Found Error
- **Cause:** Template name doesn't match exactly
- **Solution:** Copy exact name from Meta Business Manager (case-sensitive)

### Template Not Approved
- **Cause:** Still under review or rejected
- **Solution:** Check status in Meta Business Manager, wait for approval

### Variables Not Filling
- **Cause:** Variable order mismatch
- **Solution:** Ensure variables are in correct order: Name, Email, Password, URL

### Template Language Mismatch
- **Cause:** Template language doesn't match your message
- **Solution:** Create template in Arabic if sending Arabic messages

## Quick Reference

**Template Name Format:** `wse_account_activation`
**Category:** Authentication (recommended) or Utility
**Language:** Arabic (العربية)
**Variables:** 4 (Name, Email, Password, URL)
**Approval Time:** 15 minutes (Authentication) or 24-48 hours (Utility)

## Support

- **Meta Business Help:** https://www.facebook.com/business/help
- **WhatsApp Business API Docs:** https://developers.facebook.com/docs/whatsapp
- **Template Guidelines:** https://developers.facebook.com/docs/whatsapp/message-templates/guidelines

---

**Next Step:** After creating and approving the template, update `BAVATEL_TEMPLATE_NAME` in `.env.local` with your exact template name!

