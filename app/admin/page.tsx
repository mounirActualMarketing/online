'use client';

// fixed bad import
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  CheckCircle, 
  Clock,
  Award,
  BarChart3,
  Eye,
  Download,
  Search,
  Filter,
  User,
  LogOut
} from 'lucide-react';
import Image from 'next/image';

interface AdminStats {
  totalUsers: number;
  totalPayments: number;
  completedAssessments: number;
  totalRevenue: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  payments: {
    id: string;
    amount: number;
    status: string;
    transactionRef: string;
    createdAt: string;
  }[];
  assessments: {
    id: string;
    status: string;
    score?: number;
    completedAt?: string;
  }[];
  progress: {
    id: string;
    section: {
      title: string;
      order: number;
    };
    status: string;
    score?: number;
    completedAt?: string;
  }[];
}

export default function AdminDashboard() {
  const { data: session, status } = useState();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      if (user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') {
        router.push('/assessment');
        return;
      }
      
      fetchAdminData();
    }
  }, [status, session, router]);

  const fetchAdminData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    
    const assessmentStatus = user.assessments[0]?.status || 'NOT_STARTED';
    return matchesSearch && assessmentStatus.toLowerCase().includes(statusFilter.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';
      case 'NOT_STARTED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'مكتمل';
      case 'IN_PROGRESS':
        return 'جاري';
      case 'NOT_STARTED':
        return 'لم يبدأ';
      default:
        return 'غير محدد';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-48 h-16 relative">
              <Image 
                src="/logo.png" 
                alt="Wall Street English Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                لوحة التحكم الإدارية
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5" />
                <span>{user?.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {user?.role === 'SUPER_ADMIN' ? 'مدير عام' : 'مدير'}
                </span>
              </div>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          {stats && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-4 gap-6 mb-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.totalUsers}
                    </h3>
                    <p className="text-gray-600">إجمالي المستخدمين</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.totalPayments}
                    </h3>
                    <p className="text-gray-600">إجمالي المدفوعات</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.completedAssessments}
                    </h3>
                    <p className="text-gray-600">الاختبارات المكتملة</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                      {stats.totalRevenue} ريال
                    </h3>
                    <p className="text-gray-600">إجمالي الإيرادات</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Table */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: '#0e25ac' }}>
                  المستخدمين والنتائج
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>تصدير البيانات</span>
                </button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث بالاسم أو البريد الإلكتروني..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="completed">مكتمل</option>
                  <option value="progress">جاري</option>
                  <option value="not_started">لم يبدأ</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الدفع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      حالة الاختبار
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النتيجة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ التسجيل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const assessment = user.assessments[0];
                    const payment = user.payments[0];
                    
                    return (
                      <tr key={session.user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment ? (
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {payment.amount} ريال
                              </div>
                              <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                                payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {payment.status === 'COMPLETED' ? 'مدفوع' : 'معلق'}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">لا يوجد دفع</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            getStatusColor(assessment?.status || 'NOT_STARTED')
                          }`}>
                            {getStatusText(assessment?.status || 'NOT_STARTED')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {assessment?.score ? `${Math.round(assessment.score)}%` : '-'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.progress.filter(p => p.status === 'COMPLETED').length}/10 أقسام
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">عرض التفاصيل</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#0e25ac' }}>
                تفاصيل {selectedUser.name}
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* User Info */}
              <div>
                <h4 className="font-semibold mb-2">معلومات المستخدم</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>الاسم:</strong> {selectedUser.name}</p>
                  <p><strong>البريد الإلكتروني:</strong> {selectedUser.email}</p>
                  <p><strong>الهاتف:</strong> {selectedUser.phone}</p>
                  <p><strong>تاريخ التسجيل:</strong> {new Date(selectedUser.createdAt).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h4 className="font-semibold mb-2">تقدم الاختبار</h4>
                <div className="space-y-2">
                  {selectedUser.progress.map((progress) => (
                    <div key={progress.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium">القسم {progress.section.order}: {progress.section.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(progress.status)}`}>
                          {getStatusText(progress.status)}
                        </span>
                        {progress.score && (
                          <span className="text-sm text-gray-600">
                            {Math.round(progress.score)}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
