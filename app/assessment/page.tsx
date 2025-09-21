'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Play, 
  Clock,
  Award,
  BarChart3,
  User,
  LogOut
} from 'lucide-react';
import Image from 'next/image';

interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

interface UserProgress {
  id: string;
  sectionId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'LOCKED';
  score?: number;
  completedAt?: string;
}

interface UserAssessment {
  id: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  score?: number;
  completedAt?: string;
}

export default function AssessmentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sections, setSections] = useState<AssessmentSection[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [userAssessment, setUserAssessment] = useState<UserAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchAssessmentData();
    }
  }, [status, router]);

  const fetchAssessmentData = async () => {
    try {
      const response = await fetch('/api/assessment');
      const data = await response.json();
      
      if (data.success) {
        setSections(data.sections);
        setUserProgress(data.userProgress);
        setUserAssessment(data.userAssessment);
      }
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSectionStatus = (sectionOrder: number): 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'LOCKED' => {
    const progress = userProgress.find(p => {
      const section = sections.find(s => s.id === p.sectionId);
      return section?.order === sectionOrder;
    });

    if (progress) {
      return progress.status;
    }

    // First section is always available
    if (sectionOrder === 1) {
      return 'NOT_STARTED';
    }

    // Check if previous section is completed
    const previousProgress = userProgress.find(p => {
      const section = sections.find(s => s.id === p.sectionId);
      return section?.order === sectionOrder - 1;
    });

    if (previousProgress?.status === 'COMPLETED') {
      return 'NOT_STARTED';
    }

    return 'LOCKED';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'IN_PROGRESS':
        return <Play className="w-6 h-6 text-blue-500" />;
      case 'LOCKED':
        return <Lock className="w-6 h-6 text-gray-400" />;
      default:
        return <BookOpen className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'border-green-200 bg-green-50';
      case 'IN_PROGRESS':
        return 'border-blue-200 bg-blue-50';
      case 'LOCKED':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md';
    }
  };

  const handleSectionClick = (section: AssessmentSection) => {
    const status = getSectionStatus(section.order);
    
    if (status === 'LOCKED') {
      return;
    }

    router.push(`/assessment/section/${section.id}`);
  };

  const getCompletedSectionsCount = () => {
    return userProgress.filter(p => p.status === 'COMPLETED').length;
  };

  const getOverallProgress = () => {
    if (sections.length === 0) return 0;
    return Math.round((getCompletedSectionsCount() / sections.length) * 100);
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5" />
                <span>{session?.user?.name}</span>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>
              اختبار تحديد المستوى
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Fluency Toolkit - أدوات الطلاقة الشاملة
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              مرحباً بك في رحلة تعلم الإنجليزية! يتكون هذا الاختبار من 10 أقسام متدرجة لتقييم مستواك وتحديد نقاط القوة والضعف لديك.
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                  {getOverallProgress()}%
                </h3>
                <p className="text-gray-600">نسبة الإنجاز الإجمالية</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                  {getCompletedSectionsCount()}/{sections.length}
                </h3>
                <p className="text-gray-600">الأقسام المكتملة</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>
                  {userAssessment?.status === 'COMPLETED' ? 'مكتمل' : 'جاري'}
                </h3>
                <p className="text-gray-600">حالة الاختبار</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">التقدم العام</span>
                <span className="text-sm font-medium" style={{ color: '#0e25ac' }}>
                  {getOverallProgress()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${getOverallProgress()}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-3 rounded-full"
                  style={{ backgroundColor: '#e74c3c' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Assessment Sections */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0e25ac' }}>
              أقسام الاختبار
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((section, index) => {
                const status = getSectionStatus(section.order);
                const isClickable = status !== 'LOCKED';
                
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => isClickable && handleSectionClick(section)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      getStatusColor(status)
                    } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          status === 'COMPLETED' ? 'bg-green-500' :
                          status === 'IN_PROGRESS' ? 'bg-blue-500' :
                          status === 'LOCKED' ? 'bg-gray-400' : 'bg-gray-500'
                        }`}>
                          <span className="text-white font-bold">
                            {section.order}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-800 truncate">
                            {section.title}
                          </h3>
                          {getStatusIcon(status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {section.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                            status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                            status === 'LOCKED' ? 'bg-gray-100 text-gray-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {status === 'COMPLETED' ? 'مكتمل' :
                             status === 'IN_PROGRESS' ? 'جاري' :
                             status === 'LOCKED' ? 'مقفل' : 'لم يبدأ'}
                          </span>
                          
                          {status === 'LOCKED' && (
                            <span className="text-xs text-gray-500">
                              أكمل القسم السابق أولاً
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0e25ac' }}>
                  تعليمات مهمة
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>يجب إكمال الأقسام بالترتيب - لا يمكن تخطي أي قسم</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>أكمل جميع الأنشطة في كل قسم للانتقال للقسم التالي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>استخدم مساحات التفكير والتأمل بصدق لتحقيق أفضل النتائج</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>يمكنك العودة للأقسام السابقة لمراجعة التعلم وتقويته</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
