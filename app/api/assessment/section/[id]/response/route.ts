import { getCurrentUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';


import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser);
    
    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sectionId = params.id;
    const body = await request.json();
    const { activityId, response } = body;

    if (!activityId || !response?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the activity belongs to this section
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: { section: true }
    });

    if (!activity || activity.sectionId !== sectionId) {
      return NextResponse.json(
        { success: false, error: 'Activity not found in this section' },
        { status: 404 }
      );
    }

    // Save or update user response
    const userResponse = await prisma.userResponse.upsert({
      where: {
        userId_activityId: {
          userId: user.id,
          activityId: activityId
        }
      },
      update: {
        response: response.trim(),
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        activityId: activityId,
        response: response.trim()
      }
    });

    return NextResponse.json({
      success: true,
      userResponse
    });

  } catch (error) {
    console.error('Response API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
