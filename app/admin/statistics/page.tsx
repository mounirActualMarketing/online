'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  Users, 
  CreditCard, 
  Award,
  TrendingUp,
  Calendar,
  ArrowLeft,
  User,
  LogOut,
  PieChart,
  Activity,
  Target,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface StatisticsData {
  overview: {
    totalUsers: number;
    totalPayments: number;
    completedAssessments: number;
    totalRevenue: number;
    averageScore: number;
    completionRate: number;
  };
  userGrowth: {
    date: string;
    users: number;
  }[];
  paymentStats: {
    successful: number;
    pending: number;
    failed: number;
  };
  assessmentStats: {
    completed: number;
    inProgress: number;
    notStarted: number;
  };
  sectionPerformance: {
    sectionId: string;
    title: string;
    averageScore: number;
    completionRate: number;
    totalAttempts: number;
  }[];
  recentActivity: {
    id: string;
    type: 'registration' | 'payment' | 'assessment_completed';
    userName: string;
    timestamp: string;
    details?: string;
  }[];
}

export default function StatisticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // days

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') {
        router.push('/dashboard');
        return;
      }
      
      fetchStatistics();
    }
  }, [status, session, router, timeRange]);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/statistics?days=${timeRange}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.statistics);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'assessment_completed':
        return <Award className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case 'registration':
        return 'تسجيل جديد';
      case 'payment':
        return 'دفعة جديدة';
      case 'assessment_completed':
        return 'اكتمال اختبار';
      default:
        return 'نشاط';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الإحصائيات...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-32 h-12 sm:w-48 sm:h-16 relative">
              <Image 
                src="/ansam.png" 
                alt="Ansam Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center sm:text-right">
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                الإحصائيات والتقارير
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{session?.user?.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {session?.user?.role === 'SUPER_ADMIN' ? 'مدير عام' : 'مدير'}
                </span>
              </div>
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>العودة</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Time Range Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 sm:p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#0e25ac' }}>
                فترة الإحصائيات
              </h2>
              <div className="flex gap-2">
                {[
                  { value: '7', label: '7 أيام' },
                  { value: '30', label: '30 يوم' },
                  { value: '90', label: '3 أشهر' },
                  { value: '365', label: 'سنة' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeRange === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {stats && (
            <>
              {/* Overview Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-6 mb-6 sm:mb-8"
              >
                <div className="bg-white rounded-xl p-3 sm:p-6 shadow-lg border-2 border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                      <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.overview.totalUsers}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">إجمالي المستخدمين</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 shadow-lg border-2 border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                      <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.overview.totalPayments}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">إجمالي المدفوعات</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 shadow-lg border-2 border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                      <Award className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.overview.completedAssessments}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">الاختبارات المكتملة</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 shadow-lg border-2 border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                      <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.overview.totalRevenue} ريال
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">إجمالي الإيرادات</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 shadow-lg border-2 border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
                      <Target className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {Math.round(stats.overview.averageScore)}%
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">متوسط النتائج</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 shadow-lg border-2 border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                      <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {Math.round(stats.overview.completionRate)}%
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">معدل الإكمال</p>
                  </div>
                </div>
              </motion.div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Payment Status Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#0e25ac' }}>
                    حالة المدفوعات
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm">مدفوعات ناجحة</span>
                      </div>
                      <span className="font-bold text-green-600">{stats.paymentStats.successful}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">مدفوعات معلقة</span>
                      </div>
                      <span className="font-bold text-yellow-600">{stats.paymentStats.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm">مدفوعات فاشلة</span>
                      </div>
                      <span className="font-bold text-red-600">{stats.paymentStats.failed}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Assessment Status Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#0e25ac' }}>
                    حالة الاختبارات
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">مكتملة</span>
                      </div>
                      <span className="font-bold text-green-600">{stats.assessmentStats.completed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">جارية</span>
                      </div>
                      <span className="font-bold text-blue-600">{stats.assessmentStats.inProgress}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">لم تبدأ</span>
                      </div>
                      <span className="font-bold text-gray-600">{stats.assessmentStats.notStarted}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Section Performance */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 mb-8"
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: '#0e25ac' }}>
                  أداء الأقسام
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">القسم</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">متوسط النتيجة</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">معدل الإكمال</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">إجمالي المحاولات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.sectionPerformance.map((section) => (
                        <tr key={section.sectionId}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {section.title}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {Math.round(section.averageScore)}%
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {Math.round(section.completionRate)}%
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {section.totalAttempts}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: '#0e25ac' }}>
                  النشاط الأخير
                </h3>
                <div className="space-y-3">
                  {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {getActivityText(activity.type)} - {activity.userName}
                        </div>
                        {activity.details && (
                          <div className="text-xs text-gray-600">{activity.details}</div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString('en-US')}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
