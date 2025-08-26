import { NextRequest, NextResponse } from 'next/server';

const CLICKPAY_CONFIG = {
  endpoint: process.env.CLICKPAY_ENDPOINT || 'https://secure.clickpay.com.sa',
  profileId: process.env.CLICKPAY_PROFILE_ID,
  serverKey: process.env.CLICKPAY_SERVER_KEY,
};

export async function POST(request: NextRequest) {
  try {
    const { transactionRef, cartId } = await request.json();

    if (!transactionRef && !cartId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Transaction reference or cart ID is required' 
        },
        { status: 400 }
      );
    }

    if (!CLICKPAY_CONFIG.profileId || !CLICKPAY_CONFIG.serverKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ClickPay credentials not configured' 
        },
        { status: 500 }
      );
    }

    // Prepare verification request
    const verificationRequest = {
      profile_id: CLICKPAY_CONFIG.profileId,
      tran_ref: transactionRef,
      cart_id: cartId,
    };

    // Make request to ClickPay verification endpoint
    const response = await fetch(`${CLICKPAY_CONFIG.endpoint}/payment/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': CLICKPAY_CONFIG.serverKey,
      },
      body: JSON.stringify(verificationRequest),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment verification failed',
          details: responseData 
        },
        { status: response.status }
      );
    }

    // Return verification result
    return NextResponse.json({
      success: true,
      transactionRef: responseData.tran_ref,
      cartId: responseData.cart_id,
      paymentResult: responseData.payment_result,
      paymentInfo: responseData.payment_info,
      customerDetails: responseData.customer_details,
      isApproved: responseData.payment_result?.response_status === 'A',
    });

  } catch (error) {
    console.error('ClickPay Verification Error:', error);
    
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionRef = searchParams.get('tran_ref');
  const cartId = searchParams.get('cart_id');

  if (!transactionRef && !cartId) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Transaction reference or cart ID is required' 
      },
      { status: 400 }
    );
  }

  // Forward to POST handler
  return POST(new NextRequest(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify({ transactionRef, cartId }),
  }));
}
