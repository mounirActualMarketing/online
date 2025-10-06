import { NextRequest, NextResponse } from 'next/server';

// ClickPay API configuration
const CLICKPAY_CONFIG = {
  // Saudi Arabia endpoint - update this with your specific region endpoint
  endpoint: process.env.CLICKPAY_ENDPOINT || 'https://secure.clickpay.com.sa',
  profileId: process.env.CLICKPAY_PROFILE_ID,
  serverKey: process.env.CLICKPAY_SERVER_KEY,
};

interface ClickPayPaymentRequest {
  profile_id: string;
  tran_type: 'sale' | 'auth' | 'capture' | 'void' | 'refund';
  tran_class: 'ecom' | 'moto' | 'recurring';
  cart_id: string;
  cart_currency: 'SAR';
  cart_amount: number;
  cart_description: string;
  paypage_lang: 'ar' | 'en';
  customer_details: {
    name: string;
    email: string;
    phone: string;
    street1?: string;
    city?: string;
    state?: string;
    country: 'SA';
    zip?: string;
  };
  shipping_details?: {
    name: string;
    email: string;
    phone: string;
    street1?: string;
    city?: string;
    state?: string;
    country: 'SA';
    zip?: string;
  };
  callback?: string;
  return?: string;
  hide_shipping?: boolean;
  framed?: boolean;
}

interface ClickPayResponse {
  tran_ref?: string;
  tran_type?: string;
  cart_id?: string;
  cart_description?: string;
  cart_currency?: string;
  cart_amount?: string;
  return_url?: string;
  redirect_url?: string;
  paypage_lang?: string;
  profile_id?: string;
  merchant_email?: string;
  tran_total?: string;
  tran_currency?: string;
  tran_class?: string;
  customer_details?: any;
  payment_result?: {
    response_status: 'A' | 'D' | 'P' | 'H';
    response_code: string;
    response_message: string;
    transaction_time: string;
  };
  payment_info?: {
    payment_method: string;
    card_type?: string;
    card_scheme?: string;
    payment_description?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON Parse Error:', jsonError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body',
          details: jsonError instanceof Error ? jsonError.message : 'Unknown JSON error'
        },
        { status: 400 }
      );
    }
    console.log('ClickPay API Request received:', {
      hasFullName: !!body.fullName,
      hasEmail: !!body.email,
      hasPhone: !!body.phone,
      amount: body.amount || 47,
      currency: body.currency || 'SAR'
    });

    const { 
      fullName, 
      email, 
      phone, 
      amount = 47,
      currency = 'SAR',
      orderId 
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      console.error('Missing required fields:', {
        fullName: !!fullName,
        email: !!email,
        phone: !!phone
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          details: {
            missingFullName: !fullName,
            missingEmail: !email,
            missingPhone: !phone
          }
        },
        { status: 400 }
      );
    }

    // Validate required environment variables
    if (!CLICKPAY_CONFIG.profileId || !CLICKPAY_CONFIG.serverKey) {
      console.error('ClickPay Configuration Error:', {
        hasProfileId: !!CLICKPAY_CONFIG.profileId,
        hasServerKey: !!CLICKPAY_CONFIG.serverKey,
        endpoint: CLICKPAY_CONFIG.endpoint
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'ClickPay credentials not configured',
          details: {
            missingProfileId: !CLICKPAY_CONFIG.profileId,
            missingServerKey: !CLICKPAY_CONFIG.serverKey,
            endpoint: CLICKPAY_CONFIG.endpoint
          }
        },
        { status: 500 }
      );
    }

    // Generate unique cart ID if not provided
    const cartId = orderId || `WSE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare ClickPay payment request
    const paymentRequest: ClickPayPaymentRequest = {
      profile_id: CLICKPAY_CONFIG.profileId,
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: cartId,
      cart_currency: 'SAR',
      cart_amount: amount,
      cart_description: 'Ansam - تعلم الإنجليزية أونلاين',
      paypage_lang: 'ar',
      customer_details: {
        name: fullName,
        email: email,
        phone: phone,
        country: 'SA',
      },
      shipping_details: {
        name: fullName,
        email: email,
        phone: phone,
        country: 'SA',
      },
      callback: `${request.nextUrl.origin}/api/clickpay/callback`,
      return: `${request.nextUrl.origin}/thank-you?payment=success`,
      hide_shipping: true,
      framed: false,
    };

    console.log('ClickPay Payment Request:', {
      ...paymentRequest,
      profile_id: '***masked***'
    });

    // Make request to ClickPay API
    const response = await fetch(`${CLICKPAY_CONFIG.endpoint}/payment/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': CLICKPAY_CONFIG.serverKey,
      },
      body: JSON.stringify(paymentRequest),
    });

    const responseData: ClickPayResponse = await response.json();
    
    console.log('ClickPay Response Status:', response.status);
    console.log('ClickPay Response:', responseData);

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment processing failed',
          details: responseData 
        },
        { status: response.status }
      );
    }

    // Check if redirect is required (hosted payment page)
    if (responseData.redirect_url) {
      return NextResponse.json({
        success: true,
        requiresRedirect: true,
        redirectUrl: responseData.redirect_url,
        transactionRef: responseData.tran_ref,
        cartId: responseData.cart_id,
      });
    }

    // Direct payment result
    if (responseData.payment_result) {
      const isSuccess = responseData.payment_result.response_status === 'A';
      
      return NextResponse.json({
        success: isSuccess,
        transactionRef: responseData.tran_ref,
        cartId: responseData.cart_id,
        paymentResult: responseData.payment_result,
        paymentInfo: responseData.payment_info,
      });
    }

    // Unexpected response format
    return NextResponse.json(
      { 
        success: false, 
        error: 'Unexpected response from payment gateway',
        details: responseData 
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('ClickPay API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
