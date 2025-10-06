import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Get user credentials by email after payment
 * This is a temporary solution while email is not working
 */
export async function POST(request: NextRequest) {
  try {
    const { email, transactionRef } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify payment exists for this user
    const payment = await prisma.payment.findFirst({
      where: {
        user: { email },
        ...(transactionRef && { transactionRef }),
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        loginUrl: `${process.env.APP_URL}/auth/signin`,
        assessmentUrl: `${process.env.APP_URL}/assessment`,
        note: 'Your password has been sent to your email. Please check your inbox.',
      }
    });

  } catch (error) {
    console.error('Error fetching user credentials:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

