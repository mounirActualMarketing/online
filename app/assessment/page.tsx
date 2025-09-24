'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Lock, 
  User, 
  LogOut,
  Award,
  Play
} from 'lucide-react'
import Image from 'next/image'

interface AssessmentSection {
  id: string
  title: string
  description: string
  order: number
  isCompleted: boolean
  isUnlocked: boolean
  activities: {
    id: string
    title: string
    type: string
    isCompleted: boolean
  }[]
}

export default function AssessmentDashboard() {
  const { data: session, status } = useSession()
  const [sections, setSections] = useState<AssessmentSection[]>([])
  const [userProgress, setUserProgress] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      // Check if user is admin, if so redirect to admin dashboard
      if (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') {
        router.push('/admin')
        return
      }
      fetchAssessmentData()
    }
  }, [status, session, router])

  const fetchAssessmentData = async () => {
    try {
      const response = await fetch('/api/assessment');
      const data = await response.json();
      
      if (response.ok) {
        setSections(data.sections);
        setUserProgress(data.userProgress);
      } else {
        console.error('Failed to fetch assessment data');
      }
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </main>
    )
  }

  if (!session?.user) {
    return null
  }

  const completedSections = sections.filter(section => section.isCompleted).length
  const totalSections = sections.length
  const progressPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0
  const hasStartedAssessment = sections.some(section => section.activities.some(activity => activity.isCompleted))
  const firstSection = sections.find(section => section.order === 1)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/ansam.png"
                  alt="Ansam"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">مرحباً {session.user.name}</h1>
                <p className="text-xs sm:text-sm text-gray-600">أهلاً بك في تقييم الطلاقة</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="text-center sm:text-right">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">تقدمك في التقييم</h2>
              <p className="text-sm sm:text-base text-gray-600">أكملت {completedSections} من {totalSections} أقسام</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white text-lg sm:text-xl font-bold mb-2">
                {Math.round(progressPercentage)}%
              </div>
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mx-auto" />
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-500 to-red-500 h-3 rounded-full"
            />
          </div>
        </motion.div>

        {/* Start Assessment Button for new users */}
        {!hasStartedAssessment && firstSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8 text-white text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">مرحباً بك في تقييم الطلاقة!</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              ابدأ رحلتك في تقييم مهاراتك في اللغة الإنجليزية. سيتم فتح الأقسام تدريجياً بعد إكمال القسم السابق.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/assessment/section/${firstSection.id}`)}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              ابدأ التقييم الآن
            </motion.button>
          </motion.div>
        )}

        {/* Assessment Sections */}
        <div className="grid gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">أقسام التقييم</h3>
            {hasStartedAssessment && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{completedSections} من {totalSections} مكتمل</span>
              </div>
            )}
          </div>
          
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border-r-4 ${
                section.isCompleted
                  ? 'border-r-green-500'
                  : section.isUnlocked
                  ? 'border-r-blue-500'
                  : 'border-r-gray-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    section.isCompleted
                      ? 'bg-green-100 text-green-600'
                      : section.isUnlocked
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {section.isCompleted ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : section.isUnlocked ? (
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                      القسم {section.order}: {section.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2">{section.description}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {section.activities.length} أنشطة
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        {section.activities.filter(a => a.isCompleted).length} مكتملة
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  {section.isCompleted && (
                    <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
                      مكتمل
                    </span>
                  )}
                  
                  {section.isUnlocked ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/assessment/section/${section.id}`)}
                      className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                        section.isCompleted
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                      }`}
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      {section.isCompleted ? 'مراجعة' : 'ابدأ'}
                    </motion.button>
                  ) : (
                    <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 bg-gray-100 text-gray-500 rounded-lg">
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="font-medium text-xs sm:text-sm">
                        {index === 0 ? 'جاري التحميل...' : 'أكمل القسم السابق'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 sm:p-8 mt-6 sm:mt-8 text-white text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4">تحتاج مساعدة؟</h3>
          <p className="mb-6 text-sm sm:text-base">فريق الدعم متاح لمساعدتك في أي وقت</p>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
            تواصل معنا
          </button>
        </motion.div>
      </div>
    </main>
  )
}