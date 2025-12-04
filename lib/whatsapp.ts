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
 * Supports both Saudi Arabia (+966) and UAE (+971) phone numbers
 * 
 * Examples:
 * - Saudi: +966501234567 → +966501234567 ✅
 * - Saudi: 0501234567 → +966501234567 ✅
 * - UAE: +971501234567 → +971501234567 ✅
 * - UAE: 00971501234567 → +971501234567 ✅
 * 
 * @param phone - Phone number to format (any format)
 * @returns Formatted phone number with country code in E.164 format
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters except '+'
  let cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // If phone starts with '00', replace with '+'
  if (cleanPhone.startsWith('00')) {
    cleanPhone = '+' + cleanPhone.substring(2);
  }
  
  // If phone already starts with '+', return as is (preserves country code)
  // This handles: +966 (Saudi), +971 (UAE), +1 (US), etc.
  if (cleanPhone.startsWith('+')) {
    return cleanPhone;
  }
  
  // If phone doesn't start with '+', assume Saudi Arabia (+966) as default
  // This is because most customers are from Saudi Arabia
  // Remove leading '0' if present (Saudi numbers often start with 0)
  if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }
  // Add Saudi country code
  cleanPhone = '+966' + cleanPhone;
  
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

رابط الدخول:
${data.loginUrl}

🔑 كلمة المرور: تم إرسالها إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.

يمكنك الآن البدء في اختبار تحديد المستوى الخاص بك. 📚

شكراً لانضمامك إلى Wall Street English! 🌟`;
}

/**
 * Sends a WhatsApp message via Bavatel API using template
 * @param data - Customer and login information
 * @returns Promise resolving to success status
 */
export async function sendWhatsAppMessage(data: WhatsAppMessageData): Promise<boolean> {
  const accountId = process.env.BAVATEL_API_ACCOUNT_ID;
  const accessToken = process.env.BAVATEL_API_ACCESS_TOKEN;
  const apiUrl = process.env.BAVATEL_API_URL || 'https://chat.bevatel.com';
  const inboxId = process.env.BAVATEL_INBOX_ID;
  const templateName = process.env.BAVATEL_TEMPLATE_NAME || 'wse_account_activation';

  // Validate environment variables
  if (!accountId || !accessToken || !inboxId) {
    console.error('❌ Bavatel WhatsApp: Missing API configuration');
    console.error('Required env vars: BAVATEL_API_ACCOUNT_ID, BAVATEL_API_ACCESS_TOKEN, BAVATEL_INBOX_ID');
    return false;
  }

  try {
    // Format phone number to international format
    const formattedPhone = formatPhoneNumber(data.phone);
    console.log(`📱 Sending WhatsApp to: ${formattedPhone}`);

    // Prepare template variables for WhatsApp template
    // Template should have variables: {{1}} for name, {{2}} for email, {{3}} for login URL
    // Note: Password is NOT included due to Meta security policies
    const templateVariables = [
      data.customerName,      // Variable 1: Customer name
      data.email,             // Variable 2: Email
      data.loginUrl,          // Variable 3: Login URL
    ];

    // Prepare API request body according to Bavatel API documentation
    const requestBody = {
      inbox_id: parseInt(inboxId, 10), // Convert to number
      contact: {
        phone_number: formattedPhone,
      },
      message: {
        template: {
          name: templateName,
          language: 'ar', // Arabic language code - try 'ar_SA' if this doesn't work
          parameters: {
            body: templateVariables, // Body parameters array
          },
        },
      },
    };

    console.log('📤 Bavatel WhatsApp API request:', {
      endpoint: `${apiUrl}/developer/api/v1/messages`,
      inbox_id: requestBody.inbox_id,
      phone_number: formattedPhone,
      template_name: templateName,
      template_language: 'ar',
      template_variables: templateVariables,
      full_request_body: JSON.stringify(requestBody, null, 2),
    });

    // Send request to Bavatel API
    // According to their docs: https://chat.bevatel.com/developer/api/v1/messages
    const endpoint = `${apiUrl}/developer/api/v1/messages`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api_account_id': accountId,
        'api_access_token': accessToken,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse response
    let responseData: BavatelResponse;
    const responseText = await response.text();
    
    console.log('📥 Bavatel API Raw Response:', {
      status: response.status,
      statusText: response.statusText,
      rawResponse: responseText,
    });
    
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse Bavatel API response as JSON:', responseText);
      responseData = { success: false, error: 'Invalid JSON response', message: responseText };
    }

    console.log('📥 Bavatel API Parsed Response:', {
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



