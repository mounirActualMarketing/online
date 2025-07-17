'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  Gift,
  Shield,
  MessageCircle,
  Globe,
  Award,
  User,
  ArrowRight,
  Timer,
  Flame,
  Lock,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  Heart,
  Zap,
  Phone,
  MapPin,
  Crown,
  Sparkles
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Enhanced Countdown Timer Component
const CountdownTimer = ({ initialTime = 7200 }: { initialTime?: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="text-center">
        <div className="text-sm text-white/80 mb-1">ساعات</div>
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-4 py-3 rounded-xl text-2xl font-bold min-w-[70px] text-center shadow-lg border border-gray-600">
          {hours}
        </div>
      </div>
      <div className="text-white text-3xl font-bold animate-pulse">:</div>
      <div className="text-center">
        <div className="text-sm text-white/80 mb-1">دقائق</div>
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-4 py-3 rounded-xl text-2xl font-bold min-w-[70px] text-center shadow-lg border border-gray-600">
          {minutes}
        </div>
      </div>
      <div className="text-white text-3xl font-bold animate-pulse">:</div>
      <div className="text-center">
        <div className="text-sm text-white/80 mb-1">ثواني</div>
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-4 py-3 rounded-xl text-2xl font-bold min-w-[70px] text-center shadow-lg border border-gray-600">
          {seconds}
        </div>
      </div>
    </div>
  );
};

// Enhanced Social Proof Component
const SocialProof = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { 
      name: 'أحمد محمد', 
      message: 'تجربة رائعة! تحسن مستواي في أسبوعين فقط', 
      rating: 5, 
      time: 'منذ 2 دقيقة',
      location: 'الرياض',
      avatar: '👨‍💼'
    },
    { 
      name: 'فاطمة العلي', 
      message: 'الأدوات التفاعلية ممتازة وسهلة الاستخدام', 
      rating: 5, 
      time: 'منذ 5 دقائق',
      location: 'جدة',
      avatar: '👩‍💻'
    },
    { 
      name: 'خالد السعد', 
      message: 'أفضل استثمار قمت به لتطوير مهاراتي', 
      rating: 5, 
      time: 'منذ 8 دقائق',
      location: 'الدمام',
      avatar: '👨‍🎓'
    },
    { 
      name: 'نورا حسن', 
      message: 'النتائج سريعة وملحوظة من اليوم الأول', 
      rating: 5, 
      time: 'منذ 12 دقيقة',
      location: 'مكة',
      avatar: '👩‍🏫'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700" style={{ backgroundColor: '#de1135' }}></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
          {testimonials[currentTestimonial].avatar}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            {testimonials[currentTestimonial].name}
            <Crown className="w-4 h-4 text-yellow-500" />
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{testimonials[currentTestimonial].location}</span>
            <span>•</span>
            <span>{testimonials[currentTestimonial].time}</span>
          </div>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <p className="text-gray-700 italic relative">
        <span className="text-4xl text-gray-300 absolute -top-2 -right-2">&quot;</span>
        {testimonials[currentTestimonial].message}
        <span className="text-4xl text-gray-300 absolute -bottom-4 -left-2">&quot;</span>
      </p>
      
      {/* Verified badge */}
      <div className="mt-4 flex items-center gap-2">
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          تقييم موثق
        </div>
        <div className="text-xs text-gray-500">طالب معتمد</div>
      </div>
    </motion.div>
  );
};

// Enhanced Purchase Notification Component
const PurchaseNotification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, name: 'سارة أحمد', location: 'الرياض', time: 'الآن', type: 'purchase', avatar: '👩‍💼' },
    { id: 2, name: 'محمد علي', location: 'جدة', time: 'منذ دقيقة', type: 'purchase', avatar: '👨‍💻' },
    { id: 3, name: 'رانيا حسن', location: 'الدمام', time: 'منذ 3 دقائق', type: 'purchase', avatar: '👩‍🎓' },
    { id: 4, name: 'عبدالله سعد', location: 'مكة', time: 'منذ 5 دقائق', type: 'purchase', avatar: '👨‍🏫' },
  ]);

  const [currentNotification, setCurrentNotification] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="fixed bottom-4 left-4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 max-w-sm z-50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-xl">
          {notifications[currentNotification].avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-800 text-sm">
              {notifications[currentNotification].name}
            </p>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <ShoppingCart className="w-3 h-3" />
            اشترى من {notifications[currentNotification].location}
          </p>
          <p className="text-xs text-gray-500">
            {notifications[currentNotification].time}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Benefit Card Component
const BenefitCard = ({ icon, title, description, delay = 0, value }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  delay?: number,
  value?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
  >
    {/* Decorative background */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-50 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
    
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg" style={{ background: 'linear-gradient(135deg, #de1135, #b91c2c)' }}>
      {icon}
    </div>
    
    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: '#003359' }}>
      {title}
    </h3>
    
    <p className="text-sm text-gray-600 text-center mb-3">{description}</p>
    
    {value && (
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #de1135, #b91c2c)' }}>
          {value}
        </div>
      </div>
    )}
  </motion.div>
);

// Live Stats Component
const LiveStats = () => {
  const [stats, setStats] = useState({
    online: 1247,
    enrolled: 73,
    satisfied: 98.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        online: prev.online + Math.floor(Math.random() * 5) - 2,
        enrolled: Math.max(1, prev.enrolled + Math.floor(Math.random() * 3) - 1),
        satisfied: Math.min(100, Math.max(95, prev.satisfied + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold" style={{ color: '#003359' }}>إحصائيات مباشرة</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {stats.online}
          </div>
          <div className="text-xs text-gray-500">متصل الآن</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold" style={{ color: '#de1135' }}>
            {stats.enrolled}
          </div>
          <div className="text-xs text-gray-500">انضم اليوم</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-yellow-600">
            {stats.satisfied.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">راضي</div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function ThankYou() {
  const [showModal, setShowModal] = useState(false);

  // Track Facebook event
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CompleteRegistration');
    }
  }, []);

  const handlePurchase = () => {
    // Track purchase intent
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50" dir="rtl">
      <PurchaseNotification />
      
      {/* Header */}
      <div className="bg-white shadow-sm py-4 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-48 h-16 relative"
            >
              <Image 
                src="/logo.png" 
                alt="Wall Street English Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <section className="py-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-50"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent" style={{ color: '#003359' }}>
              تم التسجيل بنجاح! 🎉
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              مرحباً بك في عائلة Wall Street English - رحلتك لإتقان الإنجليزية تبدأ الآن
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>تم إرسال رسالة تأكيد إلى بريدك الإلكتروني</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #de1135, #b91c2c)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-40 -translate-x-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Flame className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">عرض حصري لمدة محدودة!</h2>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Flame className="w-8 h-8 text-yellow-300" />
              </motion.div>
            </div>
            
            <p className="text-xl mb-8 opacity-90">
              احصل على مجموعة أدوات تعلم الإنجليزية المتقدمة
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-8 border border-white/20">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold line-through text-red-200 opacity-75">1600 ريال</div>
                  <div className="text-sm text-red-200 opacity-75">السعر الأصلي</div>
                </div>
                <ArrowRight className="w-8 h-8 text-yellow-300" />
                <div className="text-center">
                  <div className="text-5xl font-bold text-yellow-300 drop-shadow-lg">27 ريال</div>
                  <div className="text-sm text-yellow-300">فقط اليوم</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                خصم 98% - وفر 1573 ريال!
              </div>
            </div>

            <CountdownTimer />
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
              </motion.div>
              <span className="text-lg font-semibold">العرض ينتهي قريباً - لا تفوت الفرصة!</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePurchase}
                  className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  style={{ color: '#de1135' }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  احجز مقعدك الآن - 27 ريال
                </motion.button>
              </Link>
              
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  اطلب الآن
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#003359' }}>
              ماذا ستحصل عليه؟
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-600 mb-4" style={{ background: 'linear-gradient(90deg, #de1135, #b91c2c)' }}></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              مجموعة شاملة من الأدوات والخدمات المتقدمة لتعلم الإنجليزية بفعالية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <BenefitCard 
              icon={<Globe className="w-8 h-8" />}
              title="ندوة عبر الإنترنت"
              description="تعلم تحدث الإنجليزية بثقة مع خبراء متخصصين"
              value="قيمة 300 ريال"
              delay={0}
            />
            <BenefitCard 
              icon={<MessageCircle className="w-8 h-8" />}
              title="جلسات فردية TalkingPoints"
              description="ممارسة المحادثة مع مدربين محترفين"
              value="قيمة 250 ريال"
              delay={0.1}
            />
            <BenefitCard 
              icon={<Users className="w-8 h-8" />}
              title="جلسة فردية مع فريق التدريب"
              description="تدريب شخصي مخصص حسب مستواك"
              value="قيمة 200 ريال"
              delay={0.2}
            />
            <BenefitCard 
              icon={<Award className="w-8 h-8" />}
              title="اختبار تشخيص الطلاقة"
              description="اكتشف مستواك الحقيقي وخطة التحسن"
              value="قيمة 150 ريال"
              delay={0.3}
            />
            <BenefitCard 
              icon={<Globe className="w-8 h-8" />}
              title="رصيد 500 وصول عالم Global"
              description="أدوات تعلم متقدمة ومحتوى حصري"
              value="قيمة 400 ريال"
              delay={0.4}
            />
            <BenefitCard 
              icon={<Gift className="w-8 h-8" />}
              title="رصيد 500 ريال سعودي"
              description="لدوراتنا المتقدمة والبرامج الإضافية"
              value="قيمة 500 ريال"
              delay={0.5}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#003359' }}>
                قيمة إجمالية: 1800 ريال
              </h3>
              <p className="text-gray-600 mb-6">
                احصل على كل هذا بسعر خاص اليوم فقط
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/payment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePurchase}
                    className="text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    style={{ backgroundColor: '#de1135' }}
                  >
                    <Gift className="w-6 h-6" />
                    احصل على كل شيء - 27 ريال
                  </motion.button>
                </Link>
                
                <Link href="/payment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                    style={{ borderColor: '#003359', color: '#003359' }}
                  >
                    <Sparkles className="w-5 h-5" />
                    احجز الآن
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#003359' }}>
              ماذا يقول طلابنا؟
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-600 mb-4" style={{ background: 'linear-gradient(90deg, #de1135, #b91c2c)' }}></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              آراء حقيقية من طلابنا الذين حققوا نتائج مذهلة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <SocialProof />
            <SocialProof />
            <LiveStats />
          </div>

          <div className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#003359' }}>+50</div>
                <div className="text-sm text-gray-600">سنة خبرة</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#003359' }}>+3M</div>
                <div className="text-sm text-gray-600">طالب حول العالم</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#003359' }}>4.9</div>
                <div className="text-sm text-gray-600">تقييم الطلاب</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#de1135' }}>98%</div>
                <div className="text-sm text-gray-600">نسبة النجاح</div>
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-gray-600 text-sm">أكثر من 3 مليون طالب يثقون بنا</p>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Timer className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">العرض محدود الكمية!</h2>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Timer className="w-8 h-8 text-yellow-300" />
              </motion.div>
            </div>
            
            <p className="text-xl mb-8 opacity-90">
              بقي فقط 27 مقعد من أصل 100 مقعد
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-8 border border-white/20">
              <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-full h-6 mb-4 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "73%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full shadow-lg"
                ></motion.div>
              </div>
              <div className="text-lg font-semibold mb-2">
                <span className="text-yellow-300">73</span> شخص اشترى في آخر ساعة
              </div>
              <div className="text-sm opacity-75">
                27 مقعد متبقي فقط
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>1,247 متصل الآن</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-300" />
                <span>الطلب يتزايد بسرعة</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePurchase}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:bg-yellow-300"
                >
                  <Timer className="w-5 h-5" />
                  اشتر قبل نفاد الكمية - 27 ريال
                </motion.button>
              </Link>
              
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-yellow-300 text-yellow-300 px-6 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300/10 transition-all duration-300 flex items-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  احجز مقعدك الآن
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-red-50 to-transparent rounded-full opacity-50"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#003359' }}>
              لا تفوت هذه الفرصة الذهبية!
            </h2>
            
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-lg font-bold text-red-500 line-through">1600 ريال</div>
                <div className="text-sm text-gray-500">السعر العادي</div>
              </div>
              <ArrowRight className="w-8 h-8 text-gray-400" />
              <div className="text-center">
                <div className="text-5xl font-bold" style={{ color: '#de1135' }}>27 ريال</div>
                <div className="text-sm text-gray-600">السعر الآن</div>
              </div>
            </div>

            <CountdownTimer />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePurchase}
                  className="text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  style={{ backgroundColor: '#de1135' }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  اشتر الآن - 27 ريال فقط
                </motion.button>
              </Link>
              
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                  style={{ borderColor: '#003359', color: '#003359' }}
                >
                  <Zap className="w-5 h-5" />
                  دفع سريع
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>ضمان استرداد المال</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                <span>دفع آمن 100%</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>وصول فوري</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-yellow-800 font-semibold">تحذير مهم!</div>
              </div>
              <p className="text-sm text-yellow-700">
                العرض صالح لمدة محدودة. بمجرد انتهاء العداد، سيعود السعر إلى 1600 ريال.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/logo.png" 
                  alt="Wall Street English Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </motion.div>
            
            <p className="text-gray-400 mb-6 text-lg">
              Wall Street English - رائدة في تعليم اللغة الإنجليزية منذ 50 عاماً
            </p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>www.wallstreetenglish.com.sa</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                Copyright © 2025 Wall Street English - جميع الحقوق محفوظة
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
