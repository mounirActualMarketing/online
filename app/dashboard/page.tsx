'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Gift, 
  BookOpen, 
  Calendar,
  LogOut,
  User,
  Copy,
  Check,
  Star,
  Award,
  Phone,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import Image from 'next/image';

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [contactRequested, setContactRequested] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin');
    }
  }, [status, session, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText('WSE500');
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    } catch (err) {
      console.error('Failed to copy coupon code');
    }
  };

  const handleStartAssessment = () => {
    router.push('/assessment');
  };

  const handleContactRequest = () => {
    setContactRequested(true);
    // Here you could also send a request to your backend to log the contact request
    setTimeout(() => setContactRequested(false), 3000);
  };

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

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
                <p className="text-xs sm:text-sm text-gray-600">لوحة التحكم الخاصة بك</p>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            🎉 مبروك! تم تفعيل حسابك بنجاح
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            استمتع بجميع المزايا الحصرية التي حصلت عليها مع Ansam
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
          
          {/* Instant Credit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">500 ريال</div>
                <div className="text-green-100 text-sm">رصيد فوري</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">رصيد فوري 500 ريال</h3>
            <p className="text-green-100 mb-4 text-sm">استخدمه على أي دورة</p>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">كود الخصم:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">WSE500</span>
                  <button
                    onClick={handleCopyCoupon}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    {copiedCoupon ? (
                      <Check className="w-4 h-4 text-green-200" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {copiedCoupon && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-200 text-sm"
              >
                ✅ تم نسخ الكود بنجاح!
              </motion.div>
            )}
          </motion.div>


          {/* Assessment Test */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-purple-100 text-sm">تقييم</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">اختبار تقييم الطلاقة</h3>
            <p className="text-purple-100 mb-4 text-sm">خطة تعلم مخصصة</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartAssessment}
              className="w-full bg-white text-purple-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              ابدأ التقييم
            </motion.button>
          </motion.div>

          {/* 1:1 Session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">1:1</div>
                <div className="text-red-100 text-sm">حصري</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">جلسة حصرية 1:1</h3>
            <p className="text-red-100 mb-4 text-sm">بناء الثقة في التحدث</p>
            
            {contactRequested ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white bg-opacity-20 rounded-lg p-3 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-200" />
                  <span className="font-semibold">تم الطلب بنجاح!</span>
                </div>
                <p className="text-red-100 text-sm">
                  سيتواصل معك فريقنا قريباً
                </p>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactRequest}
                className="w-full bg-white text-red-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                اطلب التواصل
              </motion.button>
            )}
          </motion.div>

          {/* Alison.com Free Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">5500+</div>
                <div className="text-blue-100 text-sm">دورة مجانية</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">دورات Alison المجانية</h3>
            <p className="text-blue-100 mb-4 text-sm">45 مليون متعلم حول العالم</p>
            
            <motion.a
              href="https://alison.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              ابدأ التعلم المجاني
            </motion.a>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mt-8 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800">مبروك على انضمامك لعائلة Ansam!</h3>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-600 mb-4">
            لديك الآن وصول كامل لجميع الموارد والأدوات التي ستساعدك في رحلة تعلم اللغة الإنجليزية
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Gift className="w-4 h-4 text-green-500" />
              رصيد 500 ريال
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-purple-500" />
              تقييم مخصص
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-red-500" />
              جلسة 1:1
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              دورات مجانية
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
