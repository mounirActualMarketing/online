interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

interface WelcomeEmailData {
  customerName: string
  email: string
  password: string
  loginUrl: string
  assessmentUrl: string
}

interface AdminNotificationData {
  customerName: string
  email: string
  phone: string
  amount: number
  transactionRef: string
}

export async function sendEmail(data: EmailData) {
  try {
    const response = await fetch('https://mandrillapp.com/api/1.0/messages/send.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: process.env.MANDRILL_API_KEY || 'md-KAry1hXAlA2q56TVRQimTA',
        message: {
          html: data.html,
          text: data.text || data.html.replace(/<[^>]*>/g, ''),
          subject: data.subject,
          from_email: process.env.FROM_EMAIL || 'info@wallstreedenglish.edu.sa',
          from_name: process.env.FROM_NAME || 'Wall Street English',
          to: [
            {
              email: data.to,
              type: 'to'
            }
          ],
          headers: {
            'Reply-To': process.env.FROM_EMAIL || 'info@wallstreedenglish.edu.sa'
          },
          important: false,
          track_opens: true,
          track_clicks: true,
          auto_text: true,
          auto_html: false,
          inline_css: true,
          url_strip_qs: false,
          preserve_recipients: false,
          view_content_link: false,
          tracking_domain: null,
          signing_domain: null,
          return_path_domain: null
        },
        async: false,
        ip_pool: 'Main Pool'
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Email send failed: ${error}`)
    }

    const result = await response.json()
    
    // Check if Mandrill returned an error
    if (Array.isArray(result) && result.length > 0) {
      const emailResult = result[0]
      if (emailResult.status === 'rejected' || emailResult.status === 'invalid') {
        throw new Error(`Email rejected: ${emailResult.reject_reason}`)
      }
      console.log('Email sent successfully via Mandrill:', emailResult)
      return emailResult
    }
    
    console.log('Email sent successfully via Mandrill:', result)
    return result
  } catch (error) {
    console.error('Mandrill email send error:', error)
    throw error
  }
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>مرحباً بك في Wall Street English</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; direction: rtl; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0e25ac, #e74c3c); padding: 40px 20px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { padding: 40px 30px; }
            .welcome-box { background: #f8f9fa; border-radius: 10px; padding: 25px; margin: 20px 0; border-right: 4px solid #0e25ac; }
            .credentials { background: #e8f5e8; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .btn { display: inline-block; background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 مرحباً بك في Wall Street English</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">رحلتك في تعلم الإنجليزية تبدأ الآن!</p>
            </div>
            
            <div class="content">
                <div class="welcome-box">
                    <h2 style="color: #0e25ac; margin-top: 0;">عزيزي/عزيزتي ${data.customerName}</h2>
                    <p>شكراً لك على انضمامك إلى Wall Street English! تم تأكيد دفعتك بنجاح وأصبح بإمكانك الآن الوصول إلى اختبار تحديد المستوى الخاص بك.</p>
                </div>
                
                <div class="credentials">
                    <h3 style="color: #0e25ac; margin-top: 0;">🔐 بيانات تسجيل الدخول الخاصة بك:</h3>
                    <p><strong>البريد الإلكتروني:</strong> ${data.email}</p>
                    <p><strong>كلمة المرور:</strong> <code style="background: #fff; padding: 5px 10px; border-radius: 3px; font-family: monospace;">${data.password}</code></p>
                    <p style="color: #d63384; font-size: 14px; margin-top: 15px;">⚠️ احتفظ بهذه المعلومات في مكان آمن</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.loginUrl}" class="btn">🚀 ابدأ رحلة التعلم الآن</a>
                </div>
                
                <div style="background: #fff3cd; border-radius: 10px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #856404; margin-top: 0;">📚 ما ستجده في اختبار تحديد المستوى:</h3>
                    <ul style="color: #856404; padding-right: 20px;">
                        <li>10 أقسام متدرجة لتقييم مستواك</li>
                        <li>أنشطة تفاعلية ومتنوعة</li>
                        <li>تقييم شامل لمهاراتك اللغوية</li>
                        <li>توصيات مخصصة لتطوير مستواك</li>
                    </ul>
                    <p style="color: #856404;"><strong>ملاحظة مهمة:</strong> يجب إكمال كل قسم بالترتيب قبل الانتقال للقسم التالي.</p>
                </div>
                
                <div style="border-top: 2px solid #e9ecef; padding-top: 20px; margin-top: 30px;">
                    <h3 style="color: #0e25ac;">🎯 خطوات البداية:</h3>
                    <ol style="padding-right: 20px; line-height: 1.8;">
                        <li>اضغط على رابط "ابدأ رحلة التعلم الآن" أعلاه</li>
                        <li>سجل دخولك باستخدام البيانات المرفقة</li>
                        <li>ابدأ بالقسم الأول من اختبار تحديد المستوى</li>
                        <li>أكمل جميع الأقسام بالترتيب</li>
                        <li>احصل على تقييمك النهائي وتوصياتنا</li>
                    </ol>
                </div>
            </div>
            
            <div class="footer">
                <p>إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا</p>
                <p>Wall Street English - Your English. Your Future.</p>
                <p style="font-size: 12px; color: #999;">هذا البريد الإلكتروني تم إرساله تلقائياً، يرجى عدم الرد عليه</p>
            </div>
        </div>
    </body>
    </html>
  `

  return sendEmail({
    to: data.email,
    subject: '🎉 مرحباً بك في Wall Street English - بيانات تسجيل الدخول',
    html,
  })
}

export async function sendAdminNotification(data: AdminNotificationData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Payment Received</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0e25ac, #28a745); padding: 30px 20px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .info-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 15px 0; }
            .status { background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; text-align: center; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>💰 New Payment Received</h1>
                <p style="color: white; margin: 10px 0 0 0;">Wall Street English Online Assessment</p>
            </div>
            
            <div class="content">
                <div class="status">✅ Payment Completed Successfully</div>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #0e25ac;">Customer Information</h3>
                    <p><strong>Name:</strong> ${data.customerName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                </div>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #0e25ac;">Payment Details</h3>
                    <p><strong>Amount:</strong> ${data.amount} SAR</p>
                    <p><strong>Transaction Reference:</strong> ${data.transactionRef}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #0e25ac;">Next Steps</h3>
                    <ul>
                        <li>Customer has been sent login credentials</li>
                        <li>Assessment access has been activated</li>
                        <li>Results will be available after completion</li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    </html>
  `

  return sendEmail({
    to: 'mounirbennassar@gmail.com', // Admin notification email
    subject: `💰 New Payment: ${data.customerName} - ${data.amount} SAR`,
    html,
  })
}
