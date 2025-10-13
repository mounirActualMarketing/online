'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Save,
  BookOpen,
  Mic,
  PenTool,
  Headphones,
  MessageSquare,
  Brain,
  Target,
  PlayCircle
} from 'lucide-react';
import Image from 'next/image';

interface Activity {
  id: string;
  title: string;
  description?: string;
  type: string;
  content: string;
  order: number;
  isRequired: boolean;
}

interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  activities: Activity[];
}

interface UserResponse {
  id: string;
  activityId: string;
  response: string;
  isCorrect?: boolean;
  score?: number;
}

export default function SectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const sectionId = params?.id as string;
  
  const [section, setSection] = useState<AssessmentSection | null>(null);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && sectionId) {
      fetchSectionData();
    }
  }, [status, sectionId, router]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSectionData = async () => {
    try {
      const response = await fetch(`/api/assessment/section/${sectionId}`);
      const data = await response.json();
      
      if (data.success) {
        setSection(data.section);
        setUserResponses(data.userResponses || []);
        
        // Load current response if exists
        const currentActivity = data.section.activities[currentActivityIndex];
        if (currentActivity) {
          const existingResponse = data.userResponses?.find(
            (r: UserResponse) => r.activityId === currentActivity.id
          );
          if (existingResponse) {
            setCurrentResponse(existingResponse.response);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'READING':
        return <BookOpen className="w-6 h-6" />;
      case 'WRITING':
        return <PenTool className="w-6 h-6" />;
      case 'LISTENING':
        return <Headphones className="w-6 h-6" />;
      case 'SPEAKING':
        return <Mic className="w-6 h-6" />;
      case 'VOCABULARY':
      case 'GRAMMAR':
        return <MessageSquare className="w-6 h-6" />;
      case 'REFLECTION':
        return <Brain className="w-6 h-6" />;
      case 'PRACTICE':
        return <PlayCircle className="w-6 h-6" />;
      default:
        return <Target className="w-6 h-6" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'READING':
        return 'bg-green-100 text-green-700';
      case 'WRITING':
        return 'bg-blue-100 text-blue-700';
      case 'LISTENING':
        return 'bg-purple-100 text-purple-700';
      case 'SPEAKING':
        return 'bg-red-100 text-red-700';
      case 'VOCABULARY':
      case 'GRAMMAR':
        return 'bg-yellow-100 text-yellow-700';
      case 'REFLECTION':
        return 'bg-indigo-100 text-indigo-700';
      case 'PRACTICE':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const saveResponse = async () => {
    if (!section || !currentResponse.trim()) return;

    const currentActivity = section.activities[currentActivityIndex];
    if (!currentActivity) return;

    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/assessment/section/${sectionId}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: currentActivity.id,
          response: currentResponse,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update user responses
        const updatedResponses = userResponses.filter(r => r.activityId !== currentActivity.id);
        updatedResponses.push(data.userResponse);
        setUserResponses(updatedResponses);
      }
    } catch (error) {
      console.error('Error saving response:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const nextActivity = async () => {
    setIsNavigating(true);
    
    try {
      // Auto-save current response if there's content
      if (currentResponse.trim()) {
        await saveResponse();
      }
      
      if (currentActivityIndex < (section?.activities.length || 0) - 1) {
        setCurrentActivityIndex(currentActivityIndex + 1);
        setCurrentResponse('');
        
        // Load next activity response if exists
        const nextActivity = section?.activities[currentActivityIndex + 1];
        if (nextActivity) {
          const existingResponse = userResponses.find(r => r.activityId === nextActivity.id);
          if (existingResponse) {
            setCurrentResponse(existingResponse.response);
          }
        }
      }
    } finally {
      setIsNavigating(false);
    }
  };

  const previousActivity = async () => {
    setIsNavigating(true);
    
    try {
      // Auto-save current response if there's content
      if (currentResponse.trim()) {
        await saveResponse();
      }
      
      if (currentActivityIndex > 0) {
        setCurrentActivityIndex(currentActivityIndex - 1);
        setCurrentResponse('');
        
        // Load previous activity response if exists
        const prevActivity = section?.activities[currentActivityIndex - 1];
        if (prevActivity) {
          const existingResponse = userResponses.find(r => r.activityId === prevActivity.id);
          if (existingResponse) {
            setCurrentResponse(existingResponse.response);
          }
        }
      }
    } finally {
      setIsNavigating(false);
    }
  };

  const completeSection = async () => {
    try {
      const response = await fetch(`/api/assessment/section/${sectionId}/complete`, {
        method: 'POST',
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/assessment');
      }
    } catch (error) {
      console.error('Error completing section:', error);
    }
  };

  const isCurrentActivityCompleted = () => {
    const currentActivity = section?.activities[currentActivityIndex];
    if (!currentActivity) return false;
    
    return userResponses.some(r => r.activityId === currentActivity.id);
  };

  const getCompletedActivitiesCount = () => {
    return section?.activities.filter(activity => 
      userResponses.some(r => r.activityId === activity.id)
    ).length || 0;
  };

  const isAllActivitiesCompleted = () => {
    return getCompletedActivitiesCount() === (section?.activities.length || 0);
  };

  // Function to detect if text is primarily English
  const isEnglishText = (text: string) => {
    if (!text) return false;
    const englishChars = text.match(/[a-zA-Z]/g) || [];
    const arabicChars = text.match(/[\u0600-\u06FF]/g) || [];
    return englishChars.length > arabicChars.length;
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

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">القسم غير موجود</p>
        </div>
      </div>
    );
  }

  const currentActivity = section.activities[currentActivityIndex];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/assessment')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة للاختبار</span>
            </button>
            
            <div className="w-48 h-16 relative">
              <Image 
                src="/ansam.png" 
                alt="Ansam Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="text-sm text-gray-600">
              القسم {section.order} من 10
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold" style={{ color: '#0e25ac' }}>
                {section.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {getCompletedActivitiesCount()}/{section.activities.length} مكتمل
                </span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(getCompletedActivitiesCount() / section.activities.length) * 100}%`,
                      backgroundColor: '#e74c3c'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{section.description}</p>
            
            {/* Toggle Content */}
            <div className="border-t pt-4">
              <button
                onClick={() => setShowContent(!showContent)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>{showContent ? 'إخفاء المحتوى' : 'عرض المحتوى'}</span>
              </button>
              
              {showContent && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                  dir="ltr"
                >
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans text-left">
                    {section.content}
                  </pre>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Activity Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
          >
            {/* Activity Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getActivityColor(currentActivity.type)}`}>
                  {getActivityIcon(currentActivity.type)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {currentActivity.title}
                  </h2>
                  <p className="text-gray-600">
                    النشاط {currentActivityIndex + 1} من {section.activities.length}
                  </p>
                </div>
              </div>
              
              {isCurrentActivityCompleted() && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">مكتمل</span>
                </div>
              )}
            </div>

            {/* Activity Progress Indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {section.activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentActivityIndex
                      ? 'bg-blue-500 scale-125'
                      : userResponses.some(r => r.activityId === activity.id)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                  title={`${activity.title} - ${
                    userResponses.some(r => r.activityId === activity.id) ? 'مكتمل' : 'غير مكتمل'
                  }`}
                />
              ))}
            </div>

            {/* Activity Content */}
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-4" dir="ltr">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans text-left">
                  {currentActivity.content}
                </pre>
              </div>
              
              {currentActivity.description && (
                <div className="text-gray-600 text-sm mb-4" dir="ltr">
                  <p className="text-left">
                    {currentActivity.description}
                  </p>
                </div>
              )}
            </div>

            {/* Response Area */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  إجابتك:
                </label>
                <div className="text-xs text-gray-500">
                  {currentResponse.length} حرف
                </div>
              </div>
              <textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                onKeyDown={(e) => {
                  // Ctrl/Cmd + Enter to save and go to next
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    nextActivity();
                  }
                  // Ctrl/Cmd + S to save
                  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    saveResponse();
                  }
                }}
                dir={isEnglishText(currentResponse) ? "ltr" : "rtl"}
                className={`w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  isEnglishText(currentResponse) ? 'text-left' : 'text-right'
                }`}
                placeholder="Write your answer here... (Ctrl+Enter to save and go to next, Ctrl+S to save only) | اكتب إجابتك هنا..."
              />
              {currentResponse.trim() && !isCurrentActivityCompleted() && (
                <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span>لم يتم حفظ الإجابة بعد</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 order-2 sm:order-1">
                <button
                  onClick={previousActivity}
                  disabled={currentActivityIndex === 0 || isNavigating}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isNavigating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  <span>السابق</span>
                </button>
                
                <button
                  onClick={nextActivity}
                  disabled={currentActivityIndex === section.activities.length - 1 || isNavigating}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>
                    {currentResponse.trim() ? 'حفظ والتالي' : 'التالي'}
                  </span>
                  {isNavigating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <ArrowLeft className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 order-1 sm:order-2">
                <button
                  onClick={saveResponse}
                  disabled={!currentResponse.trim() || isSaving}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>حفظ فقط</span>
                    </>
                  )}
                </button>

                {isAllActivitiesCompleted() && (
                  <button
                    onClick={completeSection}
                    className="flex items-center gap-2 px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all"
                    style={{ backgroundColor: '#e74c3c' }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>إنهاء القسم</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
