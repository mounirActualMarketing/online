interface WhatsAppMessageData {
  customerName: string;
  email: string;
  password: string;
  phone: string;
  loginUrl: string;
}

interface BavatelResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

interface TemplateVariable {
  type: 'text';
  text: string;
}

/**
 * Formats phone number to international format (E.164)
 * Assumes Saudi Arabia phone numbers if not already in international format
 * @param phone - Phone number to format
 * @returns Formatted phone number with country code
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleanPhone = phone.replace(/\D/g, '');
  
  // If phone starts with '00', replace with '+'
  if (cleanPhone.startsWith('00')) {
    cleanPhone = '+' + cleanPhone.substring(2);
  }
  
  // If phone doesn't start with '+', assume Saudi Arabia (+966)
  if (!cleanPhone.startsWith('+')) {
    // Remove leading '0' if present (Saudi numbers often start with 0)
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }
    // Add Saudi country code
    cleanPhone = '+966' + cleanPhone;
  }
  
  return cleanPhone;
}

/**
 * Creates an Arabic WhatsApp message with login credentials
 * @param data - Customer and login information
 * @returns Formatted Arabic message string
 */
function createArabicMessage(data: WhatsAppMessageData): string {
  return `مرحباً ${data.customerName}،

تم تفعيل حسابك بنجاح! 🎉

معلومات الدخول:
📧 البريد الإلكتروني: ${data.email}
🔑 كلمة المرور: ${data.password}

رابط الدخول:
${data.loginUrl}

يمكنك الآن البدء في اختبار تحديد المستوى الخاص بك. 📚

شكراً لانضمامك إلى Wall Street English! 🌟

احتفظ بهذه المعلومات في مكان آمن. ⚠️`;
}

/**
 * Sends a WhatsApp message via Bavatel API using template
 * @param data - Customer and login information
 * @returns Promise resolving to success status
 */
export async function sendWhatsAppMessage(data: WhatsAppMessageData): Promise<boolean> {
  const accountId = process.env.BAVATEL_API_ACCOUNT_ID;
  const accessToken = process.env.BAVATEL_API_ACCESS_TOKEN;
  const apiUrl = process.env.BAVATEL_API_URL;
  const inboxId = process.env.BAVATEL_INBOX_ID;
  const templateName = process.env.BAVATEL_TEMPLATE_NAME;

  // Validate environment variables
  if (!accountId || !accessToken || !apiUrl || !inboxId) {
    console.error('❌ Bavatel WhatsApp: Missing API configuration');
    console.error('Required env vars: BAVATEL_API_ACCOUNT_ID, BAVATEL_API_ACCESS_TOKEN, BAVATEL_API_URL, BAVATEL_INBOX_ID');
    return false;
  }

  try {
    // Format phone number to international format
    const formattedPhone = formatPhoneNumber(data.phone);
    console.log(`📱 Sending WhatsApp to: ${formattedPhone}`);

    // Prepare template variables for WhatsApp template
    // Template should have variables: {{1}} for name, {{2}} for email, {{3}} for password, {{4}} for login URL
    const templateVariables = [
      data.customerName,      // Variable 1: Customer name
      data.email,             // Variable 2: Email
      data.password,          // Variable 3: Password
      data.loginUrl,          // Variable 4: Login URL
    ];

    // Prepare API request body for template message
    const requestBody: any = {
      api_account_id: accountId,
      api_access_token: accessToken,
      inbox_id: inboxId,
      to: formattedPhone,
    };

    // Use template if configured, otherwise fallback to free-form message
    if (templateName) {
      requestBody.template_name = templateName;
      requestBody.template_variables = templateVariables;
      console.log('📤 Using WhatsApp template:', templateName);
    } else {
      // Fallback to free-form message (may not work for business accounts)
      const message = createArabicMessage(data);
      requestBody.message = message;
      console.log('⚠️ No template configured, using free-form message (may not work for business accounts)');
    }

    console.log('📤 Bavatel WhatsApp API request:', {
      api_account_id: accountId,
      inbox_id: inboxId,
      to: formattedPhone,
      template_name: templateName || 'N/A (free-form)',
      api_url: apiUrl,
    });

    // Send request to Bavatel API
    // Try template endpoint first, fallback to send_message
    const endpoint = templateName 
      ? `${apiUrl}/api/send_template_message` 
      : `${apiUrl}/api/send_message`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse response
    const responseData: BavatelResponse = await response.json();

    console.log('📥 Bavatel API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    });

    if (!response.ok) {
      console.error('❌ Bavatel WhatsApp API error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
        endpoint: endpoint,
      });
      return false;
    }

    // Check if the response indicates success
    if (responseData.success || response.status === 200 || response.status === 201) {
      console.log('✅ WhatsApp message sent successfully via Bavatel');
      console.log('📊 Full Response:', responseData);
      return true;
    } else {
      console.error('❌ Bavatel API returned unsuccessful response:', responseData);
      return false;
    }

  } catch (error) {
    console.error('❌ Bavatel WhatsApp send error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
}

/**
 * Sends login credentials via WhatsApp (convenience wrapper)
 * @param data - Customer and login information
 * @returns Promise resolving to success status
 */
export async function sendCredentialsViaWhatsApp(data: WhatsAppMessageData): Promise<boolean> {
  console.log('🔄 Attempting to send credentials via WhatsApp...');
  const result = await sendWhatsAppMessage(data);
  
  if (result) {
    console.log('✅ Credentials successfully delivered via WhatsApp');
  } else {
    console.log('⚠️ Failed to deliver credentials via WhatsApp (email fallback should handle this)');
  }
  
  return result;
}



