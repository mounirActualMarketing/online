import { NextRequest, NextResponse } from 'next/server';

interface ClickPayCallbackData {
  tran_ref: string;
  cart_id: string;
  cart_description: string;
  cart_currency: string;
  cart_amount: string;
  tran_total: string;
  tran_currency: string;
  tran_type: string;
  tran_class: string;
  customer_details: {
    name: string;
    email: string;
    phone: string;
    street1?: string;
    city?: string;
    state?: string;
    country: string;
    zip?: string;
  };
  payment_result: {
    response_status: 'A' | 'D' | 'P' | 'H'; // A=Approved, D=Declined, P=Pending, H=Hold
    response_code: string;
    response_message: string;
    transaction_time: string;
    acquirer_message?: string;
    acquirer_rrn?: string;
    masked_card_number?: string;
    card_type?: string;
    card_scheme?: string;
  };
  payment_info: {
    payment_method: string;
    card_type?: string;
    card_scheme?: string;
    payment_description?: string;
  };
  profile_id: string;
  merchant_email: string;
  paypage_lang: string;
}

export async function POST(request: NextRequest) {
  try {
    const callbackData: ClickPayCallbackData = await request.json();
    
    console.log('ClickPay Callback received:', {
      tran_ref: callbackData.tran_ref,
      cart_id: callbackData.cart_id,
      response_status: callbackData.payment_result?.response_status,
      response_message: callbackData.payment_result?.response_message,
    });

    // Validate the callback data
    if (!callbackData.tran_ref || !callbackData.cart_id || !callbackData.payment_result) {
      console.error('Invalid callback data received');
      return NextResponse.json(
        { error: 'Invalid callback data' },
        { status: 400 }
      );
    }

    const { payment_result, customer_details, cart_id, tran_ref, cart_amount } = callbackData;
    const isApproved = payment_result.response_status === 'A';

    // Here you can:
    // 1. Store the transaction in your database
    // 2. Update order status
    // 3. Send confirmation emails
    // 4. Trigger fulfillment processes
    // 5. Update analytics/tracking

    if (isApproved) {
      console.log(`✅ Payment approved for cart ${cart_id}:`, {
        amount: cart_amount,
        customer: customer_details.name,
        email: customer_details.email,
        transaction_ref: tran_ref,
        card_info: callbackData.payment_info,
      });

      // Track successful payment with Facebook Pixel (if needed)
      // Note: This is server-side, so you might want to store this info 
      // and trigger client-side tracking on the thank-you page

      // Example: Store in database (implement your database logic here)
      /*
      await storeTransaction({
        transactionRef: tran_ref,
        cartId: cart_id,
        amount: parseFloat(cart_amount),
        currency: callbackData.cart_currency,
        customerName: customer_details.name,
        customerEmail: customer_details.email,
        customerPhone: customer_details.phone,
        status: 'completed',
        paymentMethod: callbackData.payment_info.payment_method,
        cardType: callbackData.payment_info.card_type,
        responseCode: payment_result.response_code,
        transactionTime: payment_result.transaction_time,
      });
      */

      // Example: Send confirmation email
      /*
      await sendConfirmationEmail({
        to: customer_details.email,
        customerName: customer_details.name,
        amount: cart_amount,
        currency: callbackData.cart_currency,
        transactionRef: tran_ref,
      });
      */

    } else {
      console.log(`❌ Payment failed for cart ${cart_id}:`, {
        response_code: payment_result.response_code,
        response_message: payment_result.response_message,
        customer: customer_details.name,
        email: customer_details.email,
      });

      // Handle failed payment
      // You might want to:
      // 1. Log the failure
      // 2. Send failure notification
      // 3. Update order status to failed
    }

    // Always return 200/201 to acknowledge receipt of callback
    return NextResponse.json(
      { 
        status: 'received',
        cart_id: cart_id,
        tran_ref: tran_ref,
        processed: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('ClickPay Callback Error:', error);
    
    // Still return 200 to avoid ClickPay retrying the callback
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Internal server error',
        processed: false 
      },
      { status: 200 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: 'ClickPay callback endpoint is active',
    timestamp: new Date().toISOString(),
  });
}
