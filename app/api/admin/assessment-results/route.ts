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

    // Get all users who have completed assessments with detailed results
    const completedAssessments = await prisma.userAssessment.findMany({
      where: { 
        status: 'COMPLETED',
        completedAt: { not: null }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        }
      },
      orderBy: { completedAt: 'desc' }
    });

    // Get detailed results for each completed assessment
    const detailedResults = await Promise.all(
      completedAssessments.map(async (assessment) => {
        // Get user's progress for all sections
        const userProgress = await prisma.userProgress.findMany({
          where: { userId: assessment.userId },
          include: {
            section: {
              select: {
                id: true,
                title: true,
                order: true,
                description: true
              }
            }
          },
          orderBy: { section: { order: 'asc' } }
        });

        // Get user's responses with activity details
        const userResponses = await prisma.userResponse.findMany({
          where: { userId: assessment.userId },
          include: {
            activity: {
              select: {
                id: true,
                title: true,
                type: true,
                sectionId: true,
                section: {
                  select: {
                    title: true,
                    order: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        });

        // Calculate section scores and completion stats
        const sectionStats = userProgress.map(progress => {
          const sectionResponses = userResponses.filter(
            response => response.activity.sectionId === progress.sectionId
          );
          
          const totalActivities = sectionResponses.length;
          const completedActivities = sectionResponses.filter(r => r.response?.trim()).length;
          const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

          return {
            ...progress,
            totalActivities,
            completedActivities,
            completionRate: Math.round(completionRate),
            responses: sectionResponses
          };
        });

        // Calculate overall stats
        const totalSections = userProgress.length;
        const completedSections = userProgress.filter(p => p.status === 'COMPLETED').length;
        const totalResponses = userResponses.length;
        const overallCompletionRate = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

        return {
          assessment,
          user: assessment.user,
          sectionStats,
          overallStats: {
            totalSections,
            completedSections,
            totalResponses,
            overallCompletionRate: Math.round(overallCompletionRate),
            timeSpent: assessment.completedAt && assessment.startedAt 
              ? Math.round((new Date(assessment.completedAt).getTime() - new Date(assessment.startedAt).getTime()) / (1000 * 60)) 
              : null
          }
        };
      })
    );

    return NextResponse.json({
      success: true,
      results: detailedResults,
      totalCompleted: completedAssessments.length
    });

  } catch (error) {
    console.error('Assessment Results API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
