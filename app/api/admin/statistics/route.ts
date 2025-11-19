import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Overview statistics
    const totalUsers = await prisma.user.count();
    const totalPayments = await prisma.payment.count({
      where: { status: 'COMPLETED' }
    });
    const completedAssessments = await prisma.userAssessment.count({
      where: { status: 'COMPLETED' }
    });
    
    const revenueResult = await prisma.payment.aggregate({
      where: { 
        status: 'COMPLETED',
        createdAt: { gte: startDate }
      },
      _sum: { amount: true }
    });
    const totalRevenue = revenueResult._sum.amount || 0;

    // Average score calculation
    const avgScoreResult = await prisma.userAssessment.aggregate({
      where: { 
        status: 'COMPLETED',
        score: { not: null }
      },
      _avg: { score: true }
    });
    const averageScore = avgScoreResult._avg.score || 0;

    // Completion rate
    const totalAssessments = await prisma.userAssessment.count();
    const completionRate = totalAssessments > 0 ? (completedAssessments / totalAssessments) * 100 : 0;

    // User growth data (simplified - you might want to group by date)
    const userGrowth = await prisma.user.findMany({
      where: {
        createdAt: { gte: startDate }
      },
      select: {
        createdAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Group users by date for growth chart
    const growthData = userGrowth.reduce((acc: { [key: string]: number }, user) => {
      const date = user.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const userGrowthArray = Object.entries(growthData).map(([date, users]) => ({
      date,
      users: users as number
    }));

    // Payment statistics
    const paymentStats = {
      successful: await prisma.payment.count({ where: { status: 'COMPLETED' } }),
      pending: await prisma.payment.count({ where: { status: 'PENDING' } }),
      failed: await prisma.payment.count({ where: { status: 'FAILED' } })
    };

    // Assessment statistics
    const assessmentStats = {
      completed: await prisma.userAssessment.count({ where: { status: 'COMPLETED' } }),
      inProgress: await prisma.userAssessment.count({ where: { status: 'IN_PROGRESS' } }),
      notStarted: await prisma.userAssessment.count({ where: { status: 'NOT_STARTED' } })
    };

    // Section performance
    const sectionPerformance = await prisma.assessmentSection.findMany({
      include: {
        userProgress: {
          where: {
            status: 'COMPLETED',
            score: { not: null }
          }
        }
      }
    });

    const sectionStats = await Promise.all(
      sectionPerformance.map(async (section) => {
        const totalAttempts = section.userProgress.length;
        const averageScore = totalAttempts > 0 
          ? section.userProgress.reduce((sum, p) => sum + (p.score || 0), 0) / totalAttempts 
          : 0;
        
        // Calculate completion rate for this section
        const totalUsersWithProgress = await prisma.userProgress.count({
          where: { sectionId: section.id }
        });
        const completionRate = totalUsersWithProgress > 0 
          ? (totalAttempts / totalUsersWithProgress) * 100 
          : 0;

        return {
          sectionId: section.id,
          title: section.title,
          averageScore,
          completionRate,
          totalAttempts
        };
      })
    );

    // Recent activity
    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: { gte: startDate }
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    });

    const recentPayments = await prisma.payment.findMany({
      where: {
        createdAt: { gte: startDate },
        status: 'COMPLETED'
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    const recentAssessments = await prisma.userAssessment.findMany({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: startDate }
      },
      take: 5,
      orderBy: { completedAt: 'desc' },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    // Combine recent activities
    const recentActivity = [
      ...recentUsers.map(user => ({
        id: `user-${user.id}`,
        type: 'registration' as const,
        userName: user.name,
        timestamp: user.createdAt.toISOString(),
        details: undefined
      })),
      ...recentPayments.map(payment => ({
        id: `payment-${payment.id}`,
        type: 'payment' as const,
        userName: payment.user.name,
        timestamp: payment.createdAt.toISOString(),
        details: `${payment.amount} ريال`
      })),
      ...recentAssessments.map(assessment => ({
        id: `assessment-${assessment.id}`,
        type: 'assessment_completed' as const,
        userName: assessment.user.name,
        timestamp: assessment.completedAt?.toISOString() || assessment.createdAt.toISOString(),
        details: assessment.score ? `النتيجة: ${Math.round(assessment.score)}%` : undefined
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

    const statistics = {
      overview: {
        totalUsers,
        totalPayments,
        completedAssessments,
        totalRevenue,
        averageScore,
        completionRate
      },
      userGrowth: userGrowthArray,
      paymentStats,
      assessmentStats,
      sectionPerformance: sectionStats,
      recentActivity
    };

    return NextResponse.json({
      success: true,
      statistics
    });

  } catch (error) {
    console.error('Statistics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
