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

// Compact Benefits Component
const CompactBenefits = () => {
  const benefits = [
    { icon: <Gift className="w-4 h-4" />, title: "رصيد فوري 500 ريال", value: "استخدمه على أي دورة" },
    { icon: <Shield className="w-4 h-4" />, title: "حقيبة أدوات الطلاقة (PDF)", value: "50 عبارة + خارطة طريق" },
    { icon: <Globe className="w-4 h-4" />, title: "اختبار تقييم الطلاقة", value: "خطة تعلم مخصصة" },
    { icon: <MessageCircle className="w-4 h-4" />, title: "جلسة حصرية 1:1", value: "بناء الثقة في التحدث" }
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mb-6">
      {benefits.map((benefit, index) => (
    <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #de1135, #b91c2c)' }}>
              {benefit.icon}
        </div>
        <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800 mb-1">{benefit.title}</div>
              <div className="text-xs text-gray-600">{benefit.value}</div>
            </div>
          </div>
        </motion.div>
        ))}
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

  const handlePurchase = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CompleteRegistration');
    }
  }, []);

  return (
    <main className="h-screen bg-white overflow-hidden flex items-center justify-center" dir="rtl">
      <div className="w-full max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
      
          {/* Left Side - Success & Content */}
            <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Logo & Success */}
            <div className="text-center lg:text-right">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 mx-auto lg:mx-0 mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg"
            >
                <Timer className="w-8 h-8 text-red-600 animate-pulse" />
            </motion.div>
            
              <h1 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent" style={{ color: '#003359' }}>
                انتظر! لم يتم إكمال التسجيل بعد
            </h1>
            
              <p className="text-gray-600 mb-4">
                لإتمام عملية التسجيل والحصول على عرضك الحصري
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-center lg:text-right" style={{ color: '#003359' }}>
                🎁 ماذا ستحصل عليه اليوم؟
              </h3>
              <CompactBenefits />
              
              <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">💸 السعر الأصلي</div>
                <div className="text-2xl font-bold" style={{ color: '#003359' }}>1,500 ريال</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Offer & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
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
                    src="/logo.png" 
                    alt="Wall Street English"
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
                    <div className="text-lg font-bold line-through text-red-200 opacity-75">1500 ريال</div>
                    <div className="text-xs text-red-200 opacity-75">السعر الأصلي</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-yellow-300" />
                <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-yellow-300 drop-shadow-lg">37 ريال</div>
                    <div className="text-xs text-yellow-300">🔥 اليوم فقط</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold text-center shadow-lg">
                  خصم 98% - وفر 1463 ريال!
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
                    احجز مقعدك الآن - 37 ريال
                  </motion.button>
                </Link>
                
                <Link href="/payment">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-white text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    دفع سريع وآمن
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
          </div>
        </div>
    </main>
  );
}
