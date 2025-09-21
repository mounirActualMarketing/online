import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sectionId = params.id;

    // Get section with activities
    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: {
        activities: {
          where: { isRequired: true }
        }
      }
    });

    if (!section) {
      return NextResponse.json(
        { success: false, error: 'Section not found' },
        { status: 404 }
      );
    }

    // Check if all required activities have responses
    const requiredActivityIds = section.activities.map(a => a.id);
    const userResponses = await prisma.userResponse.findMany({
      where: {
        userId: session.user.id,
        activityId: { in: requiredActivityIds }
      }
    });

    const completedActivityIds = userResponses.map(r => r.activityId);
    const missingActivities = requiredActivityIds.filter(
      id => !completedActivityIds.includes(id)
    );

    if (missingActivities.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not all required activities completed',
          missingCount: missingActivities.length
        },
        { status: 400 }
      );
    }

    // Calculate section score (for now, just completion percentage)
    const totalActivities = section.activities.length;
    const completedActivities = userResponses.length;
    const score = (completedActivities / totalActivities) * 100;

    // Update user progress to completed
    await prisma.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId: session.user.id,
          sectionId: sectionId
        }
      },
      update: {
        status: 'COMPLETED',
        completedAt: new Date(),
        score: score
      },
      create: {
        userId: session.user.id,
        sectionId: sectionId,
        status: 'COMPLETED',
        startedAt: new Date(),
        completedAt: new Date(),
        score: score
      }
    });

    // Check if all sections are completed to update overall assessment
    const allSections = await prisma.assessmentSection.findMany({
      where: { isActive: true }
    });

    const allUserProgress = await prisma.userProgress.findMany({
      where: { userId: session.user.id }
    });

    const completedSections = allUserProgress.filter(p => p.status === 'COMPLETED');
    
    if (completedSections.length === allSections.length) {
      // Calculate overall score
      const overallScore = completedSections.reduce((sum, p) => sum + (p.score || 0), 0) / completedSections.length;
      
      // Update user assessment to completed
      await prisma.userAssessment.upsert({
        where: { userId: session.user.id },
        update: {
          status: 'COMPLETED',
          completedAt: new Date(),
          score: overallScore
        },
        create: {
          userId: session.user.id,
          status: 'COMPLETED',
          startedAt: new Date(),
          completedAt: new Date(),
          score: overallScore
        }
      });
    }

    return NextResponse.json({
      success: true,
      sectionCompleted: true,
      assessmentCompleted: completedSections.length === allSections.length,
      score: score
    });

  } catch (error) {
    console.error('Complete Section API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
