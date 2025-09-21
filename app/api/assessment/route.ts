import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all assessment sections
    const sections = await prisma.assessmentSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        activities: {
          orderBy: { order: 'asc' }
        }
      }
    });

    // Fetch user's assessment
    const userAssessment = await prisma.userAssessment.findUnique({
      where: { userId: session.user.id }
    });

    // Fetch user's progress for each section
    const userProgress = await prisma.userProgress.findMany({
      where: { userId: session.user.id },
      include: {
        section: true
      }
    });

    // Fetch user responses to determine completion
    const userResponses = await prisma.userResponse.findMany({
      where: { userId: session.user.id },
      include: {
        activity: {
          include: {
            section: true
          }
        }
      }
    });

    // Process sections to add unlocking and completion logic
    const processedSections = sections.map((section, index) => {
      // Get responses for this section
      const sectionResponses = userResponses.filter(
        response => response.activity.sectionId === section.id
      );

      // Check if section is completed (all required activities have responses)
      const requiredActivities = section.activities.filter(activity => activity.isRequired);
      const completedRequiredActivities = requiredActivities.filter(activity =>
        sectionResponses.some(response => response.activityId === activity.id)
      );
      const isCompleted = completedRequiredActivities.length === requiredActivities.length && requiredActivities.length > 0;

      // Check if section is unlocked
      let isUnlocked = false;
      if (index === 0) {
        // First section is always unlocked
        isUnlocked = true;
      } else {
        // Check if previous section is completed
        const previousSection = sections[index - 1];
        const previousSectionResponses = userResponses.filter(
          response => response.activity.sectionId === previousSection.id
        );
        const previousRequiredActivities = previousSection.activities.filter(activity => activity.isRequired);
        const previousCompletedRequired = previousRequiredActivities.filter(activity =>
          previousSectionResponses.some(response => response.activityId === activity.id)
        );
        isUnlocked = previousCompletedRequired.length === previousRequiredActivities.length && previousRequiredActivities.length > 0;
      }

      // Process activities
      const processedActivities = section.activities.map(activity => ({
        id: activity.id,
        title: activity.title,
        type: activity.type,
        isCompleted: sectionResponses.some(response => response.activityId === activity.id)
      }));

      return {
        id: section.id,
        title: section.title,
        description: section.description,
        order: section.order,
        isCompleted,
        isUnlocked,
        activities: processedActivities
      };
    });

    return NextResponse.json({
      success: true,
      sections: processedSections,
      userAssessment,
      userProgress
    });

  } catch (error) {
    console.error('Assessment API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
