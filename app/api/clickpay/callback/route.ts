import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRandomPassword, hashPassword } from '@/lib/utils';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';

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

      try {
        // Generate random password for the user
        const randomPassword = generateRandomPassword(8);
        const hashedPassword = await hashPassword(randomPassword);

        // Create or update user in database
        const user = await prisma.user.upsert({
          where: { email: customer_details.email },
          update: {
            name: customer_details.name,
            phone: customer_details.phone,
            password: hashedPassword,
          },
          create: {
            name: customer_details.name,
            email: customer_details.email,
            phone: customer_details.phone,
            password: hashedPassword,
            role: 'USER',
          },
        });

        // Store payment transaction
        await prisma.payment.create({
          data: {
            userId: user.id,
            transactionRef: tran_ref,
            cartId: cart_id,
            amount: parseFloat(cart_amount),
            currency: callbackData.cart_currency,
            status: 'COMPLETED',
            paymentMethod: callbackData.payment_info.payment_method,
            cardType: callbackData.payment_info.card_type,
            responseCode: payment_result.response_code,
            responseMessage: payment_result.response_message,
            transactionTime: new Date(payment_result.transaction_time),
          },
        });

        // Initialize user assessment
        await prisma.userAssessment.upsert({
          where: { userId: user.id },
          update: { status: 'NOT_STARTED' },
          create: {
            userId: user.id,
            status: 'NOT_STARTED',
          },
        });

        // Send welcome email with login credentials
        try {
          await sendWelcomeEmail({
            customerName: customer_details.name,
            email: customer_details.email,
            password: randomPassword,
            loginUrl: `${process.env.APP_URL}/auth/signin`,
            assessmentUrl: `${process.env.APP_URL}/assessment`,
          });
          console.log('✅ Welcome email sent successfully');
        } catch (emailError) {
          console.error('⚠️ Failed to send welcome email:', emailError);
          // Continue even if email fails
        }

        // Send admin notification
        try {
          await sendAdminNotification({
            customerName: customer_details.name,
            email: customer_details.email,
            phone: customer_details.phone,
            amount: parseFloat(cart_amount),
            transactionRef: tran_ref,
          });
          console.log('✅ Admin notification sent successfully');
        } catch (emailError) {
          console.error('⚠️ Failed to send admin notification:', emailError);
          // Continue even if email fails
        }

        console.log('✅ User created successfully (emails may have failed)');

      } catch (error) {
        console.error('❌ Error processing successful payment:', error);
        // Don't throw error here to avoid payment callback issues
      }

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

    // If this is a user-facing request (has query params), redirect to thank-you page
    const isUserFacing = request.nextUrl.searchParams.size > 0;
    
    if (isUserFacing && isApproved) {
      // Redirect user to thank-you page with success
      const redirectUrl = new URL('/thank-you', request.url);
      redirectUrl.searchParams.set('payment', 'success');
      redirectUrl.searchParams.set('ref', tran_ref);
      return NextResponse.redirect(redirectUrl, { status: 303 });
    }
    
    // Always return 200/201 to acknowledge receipt of callback
    return NextResponse.json(
      { 
        status: 'received',
        cart_id: cart_id,
        tran_ref: tran_ref,
        processed: true,
        isApproved: isApproved
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
