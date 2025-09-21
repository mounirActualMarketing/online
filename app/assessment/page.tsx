'use client'

import { useState, useEffect } from 'react'
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
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState<AssessmentSection[]>([])
  const [userProgress, setUserProgress] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        } else {
          router.push('/auth/signin')
        }
      })
      .catch(() => router.push('/auth/signin'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (user) {
      fetchAssessmentData()
    }
  }, [user])

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
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/auth/signin')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const completedSections = sections.filter(section => section.isCompleted).length
  const totalSections = sections.length
  const progressPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Wall Street English"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">مرحباً {user.name}</h1>
              <p className="text-sm text-gray-600">أهلاً بك في تقييم الطلاقة</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">تقدمك في التقييم</h2>
              <p className="text-gray-600">أكملت {completedSections} من {totalSections} أقسام</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white text-xl font-bold mb-2">
                {Math.round(progressPercentage)}%
              </div>
              <Award className="w-6 h-6 text-yellow-500 mx-auto" />
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

        {/* Assessment Sections */}
        <div className="grid gap-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">أقسام التقييم</h3>
          
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 border-r-4 ${
                section.isCompleted
                  ? 'border-r-green-500'
                  : section.isUnlocked
                  ? 'border-r-blue-500'
                  : 'border-r-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    section.isCompleted
                      ? 'bg-green-100 text-green-600'
                      : section.isUnlocked
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {section.isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : section.isUnlocked ? (
                      <BookOpen className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      القسم {section.order}: {section.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">{section.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {section.activities.length} أنشطة
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {section.activities.filter(a => a.isCompleted).length} مكتملة
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {section.isCompleted && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      مكتمل
                    </span>
                  )}
                  
                  {section.isUnlocked ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/assessment/section/${section.id}`)}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      <Play className="w-4 h-4" />
                      {section.isCompleted ? 'مراجعة' : 'ابدأ'}
                    </motion.button>
                  ) : (
                    <span className="px-6 py-2 bg-gray-100 text-gray-500 rounded-lg font-medium">
                      مقفل
                    </span>
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
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 mt-8 text-white text-center"
        >
          <h3 className="text-xl font-bold mb-4">تحتاج مساعدة؟</h3>
          <p className="mb-6">فريق الدعم متاح لمساعدتك في أي وقت</p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            تواصل معنا
          </button>
        </motion.div>
      </div>
    </main>
  )
}