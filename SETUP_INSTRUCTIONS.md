# Wall Street English Assessment System - Setup Instructions

## Overview
This system provides a comprehensive assessment platform with:
- Payment processing via ClickPay
- User authentication with NextAuth
- 10-section progressive assessment (Fluency Toolkit)
- Email notifications via Brevo
- Admin dashboard for monitoring
- PostgreSQL database with Prisma ORM

## Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Brevo account for email sending
- ClickPay merchant account

## 1. Database Setup

### Create PostgreSQL Database
```sql
CREATE DATABASE wse_online;
CREATE USER wse_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE wse_online TO wse_user;
```

### Update Environment Variables
Update `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://wse_user:your_password@localhost:5432/wse_online?schema=public"
```

## 2. Email Service Setup (Brevo)

1. Create account at [Brevo](https://www.brevo.com)
2. Get your API key from Settings > SMTP & API
3. Update `.env.local`:
```env
BREVO_API_KEY=your_brevo_api_key_here
FROM_EMAIL=noreply@wallstreetenglish.com
FROM_NAME="Wall Street English"
```

## 3. Application URLs
Update `.env.local` with your domain:
```env
APP_URL=https://yourdomain.com
ASSESSMENT_URL=https://yourdomain.com/assessment  
LOGIN_URL=https://yourdomain.com/auth/signin
NEXTAUTH_URL=https://yourdomain.com
```

## 4. Database Migration & Seeding

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed assessment sections
npm run db:seed
```

## 5. Create Admin User

You'll need to manually create an admin user in the database:

```sql
INSERT INTO "User" (id, name, email, password, role, "emailVerified", "createdAt", "updatedAt")
VALUES (
  'admin-user-id',
  'Super Admin',
  'admin@wallstreetenglish.com',
  '$2a$12$hashedpassword', -- Use bcrypt to hash your password
  'SUPER_ADMIN',
  NOW(),
  NOW(),
  NOW()
);
```

Or use this Node.js script to generate a hashed password:
```javascript
const bcrypt = require('bcryptjs');
const password = 'your-admin-password';
const hash = bcrypt.hashSync(password, 12);
console.log(hash);
```

## 6. Run the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 7. System Flow

### Payment Flow:
1. Customer fills payment form at `/payment`
2. ClickPay processes payment
3. On successful payment callback:
   - User account created with random password
   - Welcome email sent with login credentials
   - Admin notification email sent
   - Assessment initialized

### Assessment Flow:
1. User logs in with emailed credentials
2. Accesses assessment dashboard at `/assessment`
3. Completes sections sequentially (1-10)
4. Each section has multiple activities
5. Progress tracked in real-time
6. Admin can monitor all users in `/admin`

### User Roles:
- `USER`: Regular customers who take assessments
- `ADMIN`: Can view admin dashboard
- `SUPER_ADMIN`: Full administrative access

## 8. Assessment Sections (Fluency Toolkit)

1. **50 Essential Phrases** - Basic survival English
2. **Fluency Roadmap** - Structured learning path
3. **Practice Activities** - Role-play and speaking
4. **Self-Assessment** - Progress measurement
5. **Listening Skills** - Comprehension activities
6. **Speaking Practice** - Fluency building
7. **Reading Strategies** - Comprehension skills
8. **Writing Practice** - Different writing styles
9. **Grammar & Vocabulary** - Language accuracy
10. **Motivation & Goal Setting** - Learning consistency

## 9. Admin Features

### Dashboard (`/admin`)
- User statistics
- Payment tracking
- Assessment completion rates
- Revenue monitoring
- Individual user progress details

### Access Control
- Only users with `ADMIN` or `SUPER_ADMIN` roles can access
- Automatic redirection based on user role after login

## 10. Email Templates

The system sends two types of emails:

### Welcome Email (to customers)
- Login credentials
- Assessment access link
- Instructions in Arabic
- Professional branding

### Admin Notification (to administrators)
- Customer payment details
- Contact information
- Transaction reference

## 11. Security Features

- Password hashing with bcrypt
- JWT-based authentication
- CSRF protection
- SQL injection prevention via Prisma
- Input validation and sanitization

## 12. Progressive Assessment Logic

- Users must complete sections in order
- Cannot skip to later sections
- All activities in a section must be completed
- Real-time progress tracking
- Automatic unlocking of next section

## 13. Deployment Considerations

### Environment Variables
Ensure all environment variables are set in production:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `BREVO_API_KEY`
- `CLICKPAY_*` variables
- Application URLs

### Database
- Use connection pooling for production
- Regular backups
- Monitor query performance

### Email Deliverability
- Configure SPF/DKIM records
- Monitor bounce rates
- Use verified sender domain

## 14. Troubleshooting

### Common Issues:
1. **Email not sending**: Check Brevo API key and quota
2. **Database connection**: Verify DATABASE_URL format
3. **Payment callback**: Ensure callback URL is accessible
4. **Authentication**: Check NEXTAUTH_SECRET and URL configuration

### Logs:
- Check browser console for frontend errors
- Server logs for API errors
- Database logs for query issues

## 15. Future Enhancements

Potential improvements:
- Multi-language support
- Advanced analytics
- Certificate generation
- Mobile app integration
- Video/audio assessment capabilities
- Integration with learning management systems

---

For technical support, contact the development team.
