'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  Gift,
  Shield,
  MessageCircle,
  Globe,
  Award,
  ArrowRight,
  Timer,
  Flame,
  Lock,
  ShoppingCart,
  Star,
  Crown,
  Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Compact Countdown Timer Component
const CountdownTimer = ({ initialTime = 7200 }: { initialTime?: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="text-center">
          <div className="text-xs text-white mb-1">ساعات</div>
          <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center shadow-md">
            02
          </div>
        </div>
        <div className="text-white text-xl font-bold">:</div>
        <div className="text-center">
          <div className="text-xs text-white mb-1">دقائق</div>
          <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center shadow-md">
            00
          </div>
        </div>
        <div className="text-white text-xl font-bold">:</div>
        <div className="text-center">
          <div className="text-xs text-white mb-1">ثواني</div>
          <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center shadow-md">
            00
          </div>
        </div>
      </div>
    );
  }

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
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="text-center">
        <div className="text-xs text-white mb-1">ساعات</div>
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center shadow-md">
          {hours}
        </div>
      </div>
      <div className="text-white text-xl font-bold">:</div>
      <div className="text-center">
        <div className="text-xs text-white mb-1">دقائق</div>
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center shadow-md">
          {minutes}
        </div>
      </div>
      <div className="text-white text-xl font-bold">:</div>
      <div className="text-center">
        <div className="text-xs text-white mb-1">ثواني</div>
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center shadow-md">
          {seconds}
        </div>
      </div>
    </div>
  );
};

// Enhanced 500 SAR Credit Component
const CompactBenefits = () => {
  return (
    <div className="mb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 p-8 sm:p-10">
          <div className="flex items-center gap-6 mb-6">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg"
            >
              <Gift className="w-8 h-8" />
            </motion.div>
            
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-right"
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
                  رصيد فوري 
                  <span className="text-3xl sm:text-4xl text-green-600 mx-2">500</span>
                  ريال
                </div>
                <div className="text-green-600 font-medium text-sm sm:text-base">
                  استخدمه على أي دورة تدريبية
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Features */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-green-200/50 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-green-700 font-medium">فوري ومباشر</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-green-700 font-medium">جميع الدورات</span>
              </div>
            </div>
          </motion.div>
          
          {/* Sparkle Effect */}
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4
            }}
            className="absolute top-4 left-4 text-yellow-400"
          >
            <Zap className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Social Proof Ticker
const SocialProofTicker = () => {
  const [count, setCount] = useState(1247);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-white mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>1247 متصل الآن</span>
        <span>•</span>
        <span>73 انضم اليوم</span>
        <span>•</span>
        <span>98.5% راضي</span>
      </div>
    );
  }

  return (
    <motion.div 
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex items-center justify-center gap-2 text-xs text-white mb-4"
    >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span>{count} متصل الآن</span>
      <span>•</span>
      <span>73 انضم اليوم</span>
      <span>•</span>
      <span>98.5% راضي</span>
    </motion.div>
  );
};

// Main Component
export default function ThankYou() {
  const [mounted, setMounted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'pending' | 'failed' | 'upsell'>('upsell');
  const [transactionRef, setTransactionRef] = useState<string | null>(null);

  const handlePurchase = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // Check URL parameters for payment status
    if (typeof window !== 'undefined') {
      console.log('Thank you page loaded');
      console.log('Full URL:', window.location.href);
      console.log('Search params:', window.location.search);
      
      const urlParams = new URLSearchParams(window.location.search);
      const payment = urlParams.get('payment');
      const ref = urlParams.get('ref');
      const tranRef = urlParams.get('tran_ref');
      const cartId = urlParams.get('cart_id');
      
      console.log('Payment params:', { payment, ref, tranRef, cartId });
      
      if (payment === 'success') {
        setPaymentStatus('success');
        setTransactionRef(ref || tranRef);
        
        // Track successful purchase
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: 47,
            currency: 'SAR',
            content_ids: ['wse-online-course'],
            content_type: 'product'
          });
        }
        
        if ((window as any).snaptr) {
          (window as any).snaptr('track', 'PURCHASE', {
            price: 47,
            currency: 'SAR'
          });
        }
        
      } else if (payment === 'pending') {
        setPaymentStatus('pending');
        setTransactionRef(ref || tranRef);
        
      } else if (payment === 'failed') {
        setPaymentStatus('failed');
        
      } else {
        // Default to upsell page
        setPaymentStatus('upsell');
        if ((window as any).fbq) {
          (window as any).fbq('track', 'CompleteRegistration');
        }
      }
      
      // If we have transaction details and payment is not already success, verify payment status
      if ((tranRef || cartId) && payment !== 'failed' && payment !== 'success') {
        verifyPaymentStatus(tranRef, cartId);
      }
    }
  }, []);

  const verifyPaymentStatus = async (tranRef: string | null, cartId: string | null) => {
    try {
      console.log('Verifying payment status:', { tranRef, cartId });
      
      const response = await fetch('/api/clickpay/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionRef: tranRef,
          cartId: cartId,
        }),
      });

      console.log('Verify response status:', response.status);
      
      if (!response.ok) {
        console.error('Verify response not ok:', response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log('Verify result:', result);
      
      if (result.success && result.isApproved) {
        setPaymentStatus('success');
        setTransactionRef(result.transactionRef);
      } else if (result.success && !result.isApproved) {
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      // Keep current status if verification fails
    }
  };

  // Success Page Component
  const SuccessPage = () => (
    <div className="text-center space-y-6">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg"
      >
        <CheckCircle className="w-10 h-10 text-green-600" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        تم الدفع بنجاح! 🎉
      </h1>
      
      <p className="text-xl text-gray-600 mb-6">
        مرحباً بك في عائلة Ansam
      </p>
      
      {transactionRef && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            رقم المعاملة: <span className="font-mono font-bold">{transactionRef}</span>
          </p>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#0e25ac' }}>
          🎓 معلومات الدخول
        </h3>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 text-right">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">📧 البريد الإلكتروني:</p>
              <p className="font-bold text-gray-800 font-mono bg-gray-100 p-2 rounded">
                تحقق من بريدك الإلكتروني
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">🔑 كلمة المرور:</p>
              <p className="font-bold text-gray-800 bg-yellow-100 p-2 rounded">
                تم إرسالها إلى بريدك الإلكتروني
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>تم إنشاء حسابك بنجاح</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>تحقق من بريدك الإلكتروني للحصول على كلمة المرور</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>ابدأ اختبار تحديد المستوى الآن</span>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
          <p className="text-sm text-yellow-800 font-semibold">
            ⚠️ هام: إذا لم تستلم البريد الإلكتروني خلال 5 دقائق، تحقق من مجلد الرسائل غير المرغوب فيها (Spam)
          </p>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL || ''}/auth/signin`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 ابدأ الآن - تسجيل الدخول
          </motion.button>
        </Link>
      </div>
      
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          العودة للصفحة الرئيسية
        </motion.button>
      </Link>
    </div>
  );

  // Pending Page Component
  const PendingPage = () => (
    <div className="text-center space-y-6">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-lg"
      >
        <Timer className="w-10 h-10 text-yellow-600 animate-pulse" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-yellow-600 mb-4">
        دفعتك قيد المراجعة ⏳
      </h1>
      
      <p className="text-xl text-gray-600 mb-6">
        سيتم تأكيد دفعتك خلال دقائق معدودة
      </p>
      
      {transactionRef && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            رقم المعاملة: <span className="font-mono font-bold">{transactionRef}</span>
          </p>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#0e25ac' }}>
          لا تقلق!
        </h3>
        <p className="text-gray-600">
          ستصلك رسالة تأكيد على البريد الإلكتروني بمجرد تأكيد الدفع
        </p>
      </div>
      
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          العودة للصفحة الرئيسية
        </motion.button>
      </Link>
    </div>
  );

  // Failed Page Component
  const FailedPage = () => (
    <div className="text-center space-y-6">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg"
      >
        <Shield className="w-10 h-10 text-red-600" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        فشل في الدفع ❌
      </h1>
      
      <p className="text-xl text-gray-600 mb-6">
        لم تتم عملية الدفع بنجاح، يرجى المحاولة مرة أخرى
      </p>
      
      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#0e25ac' }}>
          أسباب محتملة:
        </h3>
        <div className="space-y-2 text-right text-gray-600">
          <p>• رصيد غير كافٍ في البطاقة</p>
          <p>• بيانات البطاقة غير صحيحة</p>
          <p>• مشكلة مؤقتة في الشبكة</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/payment">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            حاول مرة أخرى
          </motion.button>
        </Link>
        
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            العودة للصفحة الرئيسية
          </motion.button>
        </Link>
      </div>
    </div>
  );

  if (paymentStatus === 'success') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12" dir="rtl">
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SuccessPage />
          </motion.div>
        </div>
      </main>
    );
  }

  if (paymentStatus === 'pending') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center py-12" dir="rtl">
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PendingPage />
          </motion.div>
        </div>
      </main>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center py-12" dir="rtl">
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FailedPage />
          </motion.div>
        </div>
      </main>
    );
  }

  // Default upsell page
  return (
    <main className="min-h-screen lg:h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 lg:overflow-hidden flex items-center justify-center" dir="rtl">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:h-full">
      
          {/* Right Side - Offer & CTA - First on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl order-1 lg:order-2"
            style={{ background: 'linear-gradient(135deg, #de1135, #b91c2c)' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-12 relative">
            <Image
              src="/ansam.png"
              alt="Ansam"
                    fill
                    className="object-contain filter brightness-0 invert"
                    priority
                  />
                </div>
              </div>

              {/* Offer Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}>
                    <Flame className="w-6 h-6 text-yellow-300" />
              </motion.div>
                  <h2 className="text-xl lg:text-2xl font-bold">عرض حصري محدود!</h2>
                  <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}>
                    <Flame className="w-6 h-6 text-yellow-300" />
              </motion.div>
            </div>
            
                <p className="text-sm opacity-90 mb-4">
              احصل على مجموعة أدوات تعلم الإنجليزية المتقدمة
            </p>
              </div>

              {/* Social Proof */}
              <div className="mb-4">
                <SocialProofTicker />
              </div>

              {/* Price Section */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
                <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-yellow-300 drop-shadow-lg">47 ريال</div>
                    <div className="text-xs text-yellow-300">🔥 اليوم فقط</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-yellow-300" />
                  <div className="text-center">
                    <div className="text-lg font-bold line-through text-red-200 opacity-75">1500 ريال</div>
                    <div className="text-xs text-red-200 opacity-75">السعر الأصلي</div>
                  </div>
                 
                
                </div>
                
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold text-center shadow-lg">
                  خصم 97% - وفر 1453 ريال!
                </div>
              </div>
              
              {/* Countdown */}
              <div className="text-center mb-6">
                <div className="text-sm mb-2 opacity-90">العرض ينتهي خلال:</div>
                <CountdownTimer />
              </div>

              {/* Urgency */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Timer className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">27 مقعد متبقي من أصل 100</span>
            </div>

                <div className="bg-red-700 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "73%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full"
                  ></motion.div>
        </div>
          </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-6">
                <Link href="/payment">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePurchase}
                    className="w-full bg-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ color: '#de1135' }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    احجز مقعدك الآن - 47 ريال
                  </motion.button>
                </Link>
            </div>
            
              {/* Trust Badges */}
              <div className="flex justify-center items-center gap-4 mt-6 text-xs opacity-90">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>ضمان استرداد</span>
            </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  <span>دفع آمن</span>
          </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-300 fill-current" />
                  <span>4.9/5</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Side - Success & Content - Second on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Logo & Success */}
            <div className="text-center lg:text-right">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-red-100 via-red-200 to-red-300 rounded-full flex items-center justify-center shadow-xl"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Timer className="w-10 h-10 text-red-600" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 bg-clip-text text-transparent"
              >
                انتظر! لم يتم إكمال التسجيل بعد
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 mb-6 text-lg"
              >
                لإتمام عملية التسجيل والحصول على عرضك الحصري
              </motion.p>
            </div>

            {/* Enhanced Benefits Section */}
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl lg:text-2xl font-bold mb-6 text-center lg:text-right bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              >
                🎁 عرضك الحصري اليوم
              </motion.h3>
              <CompactBenefits />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg"
              >
                <div className="text-center mb-4">
                  <div className="text-sm text-blue-600 font-medium mb-2">💎 عرض محدود</div>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="text-center">
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl font-bold text-blue-600"
                      >
                        47 ريال
                      </motion.div>
                      <div className="text-xs text-blue-500 font-medium">🔥 اليوم فقط</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-blue-500" />
                    <div className="text-center">
                      <div className="text-xl font-bold line-through text-gray-400">1500 ريال</div>
                      <div className="text-xs text-gray-500">السعر الأصلي</div>
                    </div>
                  </div>
                  <motion.div 
                    animate={{ 
                      background: [
                        'linear-gradient(45deg, #fbbf24, #f59e0b)',
                        'linear-gradient(45deg, #f59e0b, #d97706)',
                        'linear-gradient(45deg, #fbbf24, #f59e0b)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-md"
                  >
                    خصم 97% - وفر 1453 ريال + رصيد 500 ريال!
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
