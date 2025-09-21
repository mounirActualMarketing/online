import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get stats
    const totalUsers = await prisma.user.count({
      where: { role: 'USER' }
    });

    const totalPayments = await prisma.payment.count({
      where: { status: 'COMPLETED' }
    });

    const completedAssessments = await prisma.userAssessment.count({
      where: { status: 'COMPLETED' }
    });

    const paymentsSum = await prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true }
    });

    const totalRevenue = paymentsSum._sum.amount || 0;

    // Get users with their payments, assessments, and progress
    const users = await prisma.user.findMany({
      where: { role: 'USER' },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' }
        },
        assessments: true,
        progress: {
          include: {
            section: {
              select: { title: true, order: true }
            }
          },
          orderBy: { section: { order: 'asc' } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const stats = {
      totalUsers,
      totalPayments,
      completedAssessments,
      totalRevenue
    };

    return NextResponse.json({
      success: true,
      stats,
      users
    });

  } catch (error) {
    console.error('Admin Dashboard API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
