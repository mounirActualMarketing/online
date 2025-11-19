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

    // Fetch all users with their related data
    const users = await prisma.user.findMany({
      include: {
        payments: {
          orderBy: { createdAt: 'desc' }
        },
        assessments: {
          orderBy: { createdAt: 'desc' }
        },
        progress: {
          include: {
            section: {
              select: {
                title: true,
                order: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const csvHeaders = [
      'User ID',
      'Name',
      'Email', 
      'Phone',
      'Registration Date',
      'Total Payments',
      'Payment Status',
      'Last Payment Amount',
      'Last Payment Date',
      'Assessment Status',
      'Assessment Score',
      'Assessment Completion Date',
      'Completed Sections',
      'Total Sections Attempted',
      'Average Section Score'
    ];

    const csvRows = users.map(user => {
      const lastPayment = user.payments[0];
      const lastAssessment = user.assessments[0];
      const completedProgress = user.progress.filter(p => p.status === 'COMPLETED');
      const averageScore = completedProgress.length > 0 
        ? completedProgress.reduce((sum, p) => sum + (p.score || 0), 0) / completedProgress.length 
        : 0;

      return [
        user.id,
        `"${user.name}"`, // Wrap in quotes to handle commas in names
        user.email,
        user.phone || '',
        new Date(user.createdAt).toLocaleDateString('en-US'),
        user.payments.length,
        lastPayment?.status || 'No Payment',
        lastPayment?.amount || 0,
        lastPayment ? new Date(lastPayment.createdAt).toLocaleDateString('en-US') : '',
        lastAssessment?.status || 'Not Started',
        lastAssessment?.score ? Math.round(lastAssessment.score) : '',
        lastAssessment?.completedAt ? new Date(lastAssessment.completedAt).toLocaleDateString('en-US') : '',
        completedProgress.length,
        user.progress.length,
        averageScore > 0 ? Math.round(averageScore) : ''
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
        'Content-Disposition': `attachment; filename="admin-data-export-${new Date().toISOString().split('T')[0]}.csv"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Export API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


