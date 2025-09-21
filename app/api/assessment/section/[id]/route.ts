import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET(
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

    // Fetch section with activities
    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: {
        activities: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!section) {
      return NextResponse.json(
        { success: false, error: 'Section not found' },
        { status: 404 }
      );
    }

    // Fetch user's responses for this section's activities
    const activityIds = section.activities.map(a => a.id);
    const userResponses = await prisma.userResponse.findMany({
      where: {
        userId: session.user.id,
        activityId: { in: activityIds }
      }
    });

    // Check if user can access this section (previous section completed or this is section 1)
    if (section.order > 1) {
      const previousSection = await prisma.assessmentSection.findUnique({
        where: { order: section.order - 1 }
      });

      if (previousSection) {
        const previousProgress = await prisma.userProgress.findUnique({
          where: {
            userId_sectionId: {
              userId: session.user.id,
              sectionId: previousSection.id
            }
          }
        });

        if (!previousProgress || previousProgress.status !== 'COMPLETED') {
          return NextResponse.json(
            { success: false, error: 'Previous section not completed' },
            { status: 403 }
          );
        }
      }
    }

    // Create or update user progress for this section
    await prisma.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId: session.user.id,
          sectionId: section.id
        }
      },
      update: {
        status: 'IN_PROGRESS',
        startedAt: new Date()
      },
      create: {
        userId: session.user.id,
        sectionId: section.id,
        status: 'IN_PROGRESS',
        startedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      section,
      userResponses
    });

  } catch (error) {
    console.error('Section API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
