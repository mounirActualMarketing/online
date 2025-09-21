import { auth } from "@/auth";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
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

    return NextResponse.json({
      success: true,
      sections,
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
