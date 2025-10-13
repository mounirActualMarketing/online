'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  User,
  Clock,
  CheckCircle,
  BarChart3,
  Award,
  Calendar,
  Eye,
  Download,
  Search,
  Filter,
  FileText,
  Target
} from 'lucide-react';
import Image from 'next/image';

interface AssessmentResult {
  assessment: {
    id: string;
    status: string;
    startedAt: string;
    completedAt: string;
    score?: number;
  };
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
  };
  sectionStats: {
    id: string;
    sectionId: string;
    status: string;
    score?: number;
    completedAt?: string;
    section: {
      id: string;
      title: string;
      order: number;
      description: string;
    };
    totalActivities: number;
    completedActivities: number;
    completionRate: number;
    responses: {
      id: string;
      response: string;
      isCorrect?: boolean;
      score?: number;
      createdAt: string;
      activity: {
        id: string;
        title: string;
        type: string;
        sectionId: string;
        section: {
          title: string;
          order: number;
        };
      };
    }[];
  }[];
  overallStats: {
    totalSections: number;
    completedSections: number;
    totalResponses: number;
    overallCompletionRate: number;
    timeSpent: number | null;
  };
}

export default function AssessmentResults() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null);

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
      
      fetchAssessmentResults();
    }
  }, [status, session, router]);

  const fetchAssessmentResults = async () => {
    try {
      const response = await fetch('/api/admin/assessment-results');
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Error fetching assessment results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResults = results.filter(result => 
    result.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'READING':
        return '📖';
      case 'WRITING':
        return '✍️';
      case 'LISTENING':
        return '🎧';
      case 'SPEAKING':
        return '🗣️';
      case 'VOCABULARY':
        return '📚';
      case 'GRAMMAR':
        return '📝';
      case 'REFLECTION':
        return '💭';
      case 'PRACTICE':
        return '🎯';
      default:
        return '📋';
    }
  };

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'READING':
        return 'قراءة';
      case 'WRITING':
        return 'كتابة';
      case 'LISTENING':
        return 'استماع';
      case 'SPEAKING':
        return 'محادثة';
      case 'VOCABULARY':
        return 'مفردات';
      case 'GRAMMAR':
        return 'قواعد';
      case 'REFLECTION':
        return 'تأمل';
      case 'PRACTICE':
        return 'تطبيق';
      default:
        return 'نشاط';
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>العودة للوحة التحكم</span>
              </button>
              <div className="w-32 h-12 sm:w-48 sm:h-16 relative">
                <Image 
                  src="/ansam.png" 
                  alt="Ansam Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="text-center sm:text-right">
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                نتائج الاختبارات المكتملة
              </h1>
              <p className="text-gray-600 text-sm">
                {results.length} اختبار مكتمل
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 sm:p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#0e25ac' }}>
                البحث والتصفية
              </h2>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">تصدير النتائج</span>
                <span className="sm:hidden">تصدير</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-8 sm:pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResults.map((result) => (
              <div key={result.assessment.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                {/* User Header */}
                <div className="bg-gradient-to-r from-blue-500 to-red-500 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{result.user.name}</h3>
                      <p className="text-white/80 text-sm">{result.user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {result.overallStats.overallCompletionRate}%
                      </div>
                      <div className="text-xs text-gray-600">معدل الإكمال</div>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {result.overallStats.completedSections}/{result.overallStats.totalSections}
                      </div>
                      <div className="text-xs text-gray-600">الأقسام</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {result.overallStats.totalResponses}
                      </div>
                      <div className="text-xs text-gray-600">إجابة</div>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {result.overallStats.timeSpent ? `${result.overallStats.timeSpent}د` : '-'}
                      </div>
                      <div className="text-xs text-gray-600">الوقت</div>
                    </div>
                  </div>

                  {/* Completion Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      اكتمل في: {new Date(result.assessment.completedAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedResult(result)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>عرض التفاصيل</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {filteredResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">
                {searchTerm ? 'لا توجد نتائج تطابق البحث' : 'لا توجد اختبارات مكتملة حتى الآن'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Results Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#0e25ac' }}>
                تفاصيل نتائج {selectedResult.user.name}
              </h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">معلومات المستخدم</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">الاسم</p>
                  <p className="font-medium">{selectedResult.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                  <p className="font-medium">{selectedResult.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الهاتف</p>
                  <p className="font-medium">{selectedResult.user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">تاريخ التسجيل</p>
                  <p className="font-medium">{new Date(selectedResult.user.createdAt).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
            </div>

            {/* Section Results */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">نتائج الأقسام</h4>
              {selectedResult.sectionStats.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">
                      القسم {section.section.order}: {section.section.title}
                    </h5>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        section.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {section.status === 'COMPLETED' ? 'مكتمل' : 'جاري'}
                      </span>
                      <span className="text-sm font-medium text-blue-600">
                        {section.completionRate}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {section.completedActivities}/{section.totalActivities}
                      </div>
                      <div className="text-xs text-gray-600">الأنشطة</div>
                    </div>
                    {section.score && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {Math.round(section.score)}%
                        </div>
                        <div className="text-xs text-gray-600">النتيجة</div>
                      </div>
                    )}
                    {section.completedAt && (
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(section.completedAt).toLocaleDateString('ar-SA')}
                        </div>
                        <div className="text-xs text-gray-600">تاريخ الإكمال</div>
                      </div>
                    )}
                  </div>

                  {/* Activities */}
                  <div className="space-y-2">
                    <h6 className="text-sm font-medium text-gray-700">الأنشطة:</h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.responses.map((response) => (
                        <div key={response.id} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                          <span className="text-lg">{getActivityTypeIcon(response.activity.type)}</span>
                          <div className="flex-1">
                            <div className="font-medium">{response.activity.title}</div>
                            <div className="text-xs text-gray-600">
                              {getActivityTypeText(response.activity.type)}
                            </div>
                          </div>
                          <div className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
