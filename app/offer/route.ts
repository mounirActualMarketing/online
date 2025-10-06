import { NextRequest, NextResponse } from 'next/server';

/**
 * Handle POST requests from ClickPay to /thank-you
 * ClickPay sends POST instead of GET redirect, so we need to handle it
 */
export async function POST(request: NextRequest) {
  try {
    console.log('POST to /thank-you received');
    
    // Try to get body data
    let bodyData: any = {};
    try {
      bodyData = await request.json();
    } catch {
      // Body might not be JSON, that's okay
    }
    
    // Get search params from URL
    const searchParams = request.nextUrl.searchParams;
    
    console.log('Body data:', bodyData);
    console.log('Search params:', Object.fromEntries(searchParams));
    
    // Extract payment information from either body or search params
    const payment = searchParams.get('payment') || bodyData.payment || 'success';
    const ref = searchParams.get('ref') || bodyData.tran_ref || bodyData.ref;
    const tranRef = searchParams.get('tran_ref') || bodyData.tran_ref;
    const cartId = searchParams.get('cart_id') || bodyData.cart_id;
    
    // Build redirect URL with query parameters
    const redirectParams = new URLSearchParams();
    redirectParams.set('payment', payment);
    if (ref) redirectParams.set('ref', ref);
    if (tranRef) redirectParams.set('tran_ref', tranRef);
    if (cartId) redirectParams.set('cart_id', cartId);
    
    const redirectUrl = new URL(`/thank-you?${redirectParams.toString()}`, request.url);
    
    console.log('Redirecting to:', redirectUrl.toString());
    
    // Redirect to GET request with 303 status (forces GET)
    return NextResponse.redirect(redirectUrl, { status: 303 });
    
  } catch (error) {
    console.error('Error handling POST to /thank-you:', error);
    
    // If anything fails, redirect to thank-you with success
    return NextResponse.redirect(
      new URL('/thank-you?payment=success', request.url),
      { status: 303 }
    );
  }
}

