# 🚀 Quick Guide: Create WhatsApp Template in Meta

## Visual Guide Based on Your Screenshot

Based on the Meta Business Manager interface you showed me, here's exactly what to do:

### Step 1: Navigate to Template Creation
1. In the left sidebar, click **"Message templates"**
2. Click **"+ Create template"** button (top right, blue button)

### Step 2: Fill in Template Details

#### Template Name
- Enter: `wse_account_activation`
- This will be used in your code

#### Category Selection
- Choose: **"AUTHENTICATION"** (fastest approval - 15 minutes)
- Or: **"UTILITY"** (if authentication doesn't fit)

#### Language
- Select: **Arabic (العربية)**

### Step 3: Build Your Template

#### Header Section (Optional)
Click **"+ Add variable"** next to Header, or leave blank.

If adding header:
```
Welcome to Wall Street English
```
*Max 60 characters shown as "0/60"*

#### Body Section (Required)
This is the main message. Copy this exactly:

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

**To Add Variables:**
1. Click **"+ Add variable"** button (with info icon)
2. Select **"Text"** from dropdown (not "Number")
3. Variables appear as `{{1}}`, `{{2}}`, `{{3}}`, `{{4}}`
4. Place them in order:
   - `{{1}}` = Customer Name
   - `{{2}}` = Email
   - `{{3}}` = Password  
   - `{{4}}` = Login URL

**Character Counter:**
- Body shows "X/1024" characters
- Keep under 1024 characters total

#### Footer Section (Optional)
```
Wall Street English
```
*Max 60 characters*

### Step 4: Preview

Check the **"Template Preview"** sidebar on the right:
- Should show your message with variables
- Verify it looks correct

### Step 5: Submit

1. Click **"Submit for review"** button (bottom right, blue)
2. Wait for approval (15 min for Authentication, 24-48h for Utility)
3. You'll get email notification when approved

### Step 6: Update Your Code

Once approved, update `.env.local`:

```bash
BAVATEL_TEMPLATE_NAME=wse_account_activation
```

## Variable Order Reference

When Meta shows variables, they're numbered in order of appearance:

| Position | Variable | What It Contains |
|----------|----------|------------------|
| 1st | `{{1}}` | Customer Name |
| 2nd | `{{2}}` | Email Address |
| 3rd | `{{3}}` | Password |
| 4th | `{{4}}` | Login URL |

**Important:** The order in your code must match the order in the template!

## Your Current Configuration

✅ **Inbox ID:** 61770
✅ **Phone Number:** +966920032081
✅ **Account ID:** 24095
✅ **Access Token:** Configured

**Next:** Create template → Get template name → Update `.env.local`

## Testing After Template Creation

```bash
# Test with your phone number
npm run test:whatsapp +966920032081
```

---

**Full detailed guide:** See `META_TEMPLATE_SETUP.md`

