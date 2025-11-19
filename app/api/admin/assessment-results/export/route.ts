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

    // Fetch completed assessments with user and progress data
    const assessments = await prisma.userAssessment.findMany({
      where: {
        status: 'COMPLETED'
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
      orderBy: {
        completedAt: 'desc'
      }
    });

    // Fetch user progress for completed assessments
    const userIds = assessments.map(a => a.userId);
    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId: { in: userIds },
        status: 'COMPLETED'
      },
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
      orderBy: {
        section: {
          order: 'asc'
        }
      }
    });

    // Create CSV content
    const csvHeaders = [
      'Assessment ID',
      'User Name',
      'User Email',
      'User Phone',
      'User Registration Date',
      'Assessment Started',
      'Assessment Completed',
      'Overall Score',
      'Total Sections',
      'Completed Sections',
      'Section 1 Score',
      'Section 2 Score',
      'Section 3 Score',
      'Section 4 Score',
      'Section 5 Score',
      'Section 6 Score',
      'Section 7 Score',
      'Section 8 Score',
      'Section 9 Score',
      'Section 10 Score'
    ];

    const csvRows = assessments.map(assessment => {
      // Get progress for this user
      const userProgressData = userProgress.filter(p => p.userId === assessment.userId);
      const completedSections = userProgressData.filter(p => p.status === 'COMPLETED');
      
      // Create array for section scores (10 sections)
      const sectionScores = new Array(10).fill('');
      userProgressData.forEach(progress => {
        if (progress.status === 'COMPLETED' && progress.score && progress.section.order <= 10) {
          sectionScores[progress.section.order - 1] = Math.round(progress.score);
        }
      });

      return [
        assessment.id,
        `"${assessment.user.name}"`, // Wrap in quotes to handle commas
        assessment.user.email,
        assessment.user.phone || '',
        new Date(assessment.user.createdAt).toLocaleDateString('en-US'),
        assessment.startedAt ? new Date(assessment.startedAt).toLocaleDateString('en-US') : '',
        assessment.completedAt ? new Date(assessment.completedAt).toLocaleDateString('en-US') : '',
        assessment.score ? Math.round(assessment.score) : '',
        userProgressData.length,
        completedSections.length,
        ...sectionScores
      ];
    });

    // Combine headers and rows
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Add BOM for proper UTF-8 encoding in Excel
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    // Return CSV file
    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="assessment-results-export-${new Date().toISOString().split('T')[0]}.csv"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Assessment Results Export API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


