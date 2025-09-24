'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  Clock,
  Star,
  User,
  Mail,
  Phone,
  Globe,
  Timer,
  Gift,
  Users,
  Award
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Payment Method Component
const PaymentMethod = ({ 
  icon, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  selected: boolean, 
  onClick: () => void 
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
      selected 
        ? 'border-blue-500 bg-blue-50 shadow-lg' 
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
        selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
      }`}>
        {selected && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
    </div>
  </motion.div>
);

// Order Summary Component
const OrderSummary = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
    <h3 className="text-xl font-bold mb-4" style={{ color: '#0e25ac' }}>
      ملخص الطلب
    </h3>
    
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">مجموعة أدوات تعلم الإنجليزية</h4>
          <p className="text-sm text-gray-600">باقة متكاملة للتعلم السريع</p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">السعر الأصلي</span>
          <span className="text-lg font-bold text-red-500 line-through">1600 ريال</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">الخصم (98%)</span>
          <span className="text-lg font-bold text-green-500">-1553 ريال</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
          <span style={{ color: '#0e25ac' }}>المجموع</span>
          <span style={{ color: '#e74c3c' }}>47 ريال</span>
        </div>
      </div>
      
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-green-600">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">وفرت 1553 ريال!</span>
        </div>
      </div>
    </div>
  </div>
);

// Countdown Timer Component
const CountdownTimer = ({ initialTime = 3600 }: { initialTime?: number }) => {
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
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Timer className="w-5 h-5" />
          <span className="text-sm font-medium">العرض ينتهي خلال</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-black/20 px-3 py-1 rounded text-lg font-bold">
            {hours}
          </div>
          <span>:</span>
          <div className="bg-black/20 px-3 py-1 rounded text-lg font-bold">
            {minutes}
          </div>
          <span>:</span>
          <div className="bg-black/20 px-3 py-1 rounded text-lg font-bold">
            {seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
  </div>
);

// Main Payment Component
export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: ''
  });
  const router = useRouter();

  // Track Facebook event
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Validate required form data
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert('يرجى ملء جميع البيانات المطلوبة');
        setIsProcessing(false);
        return;
      }

      // Track Facebook event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: 27,
          currency: 'SAR'
        });
      }

      // Process payment with ClickPay
      const response = await fetch('/api/clickpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          amount: 27,
          currency: 'SAR',
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error('Payment failed:', result.error);
        alert('فشل في معالجة الدفع. يرجى المحاولة مرة أخرى.');
        setIsProcessing(false);
        return;
      }

      // Check if redirect is required (ClickPay hosted payment page)
      if (result.requiresRedirect && result.redirectUrl) {
        // Track Facebook event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'AddPaymentInfo');
        }
        
        // Redirect to ClickPay payment page
        window.location.href = result.redirectUrl;
        return;
      }

      // Direct payment result (if no redirect needed)
      if (result.paymentResult) {
        if (result.paymentResult.response_status === 'A') {
          // Payment approved
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
              value: 27,
              currency: 'SAR'
            });
          }
          router.push(`/thank-you?payment=success&ref=${result.transactionRef}`);
        } else {
          // Payment declined
          alert(`فشل في الدفع: ${result.paymentResult.response_message}`);
          setIsProcessing(false);
        }
        return;
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert('حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.');
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: 'credit-card',
      icon: <CreditCard className="w-6 h-6" />,
      title: 'بطاقة ائتمانية',
      description: 'Visa, MasterCard, American Express, mada'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-48 h-16 relative">
              <Image 
                src="/ansam.png" 
                alt="Ansam Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>
              أكمل عملية الدفع
            </h1>
            <p className="text-xl text-gray-600">
              خطوة واحدة فقط وستبدأ رحلتك في تعلم الإنجليزية
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <span className="text-sm font-medium text-gray-600">التسجيل</span>
              </div>
              <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <span className="text-sm font-medium text-blue-600">الدفع</span>
              </div>
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">
                  3
                </div>
                <span className="text-sm font-medium text-gray-600">اكتمال</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
              >
                <CountdownTimer />

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#0e25ac' }}>
                    معلومات الاتصال
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني
                      </label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="05xxxxxxxx"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#0e25ac' }}>
                    طريقة الدفع
                  </h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <PaymentMethod
                        key={method.id}
                        icon={method.icon}
                        title={method.title}
                        description={method.description}
                        selected={selectedPayment === method.id}
                        onClick={() => setSelectedPayment(method.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Credit Card Info */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: '#0e25ac' }}>
                            الدفع بالبطاقة الائتمانية
                          </h3>
                          <p className="text-sm text-blue-600">
                            مدعوم بواسطة ClickPay - نظام دفع آمن ومعتمد
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                          <div className="text-blue-600 font-bold text-lg">VISA</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                          <div className="text-red-600 font-bold text-lg">MasterCard</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                          <div className="text-blue-800 font-bold text-sm">American Express</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                          <div className="text-green-600 font-bold text-lg">mada</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm text-blue-700">
                        <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium mb-1">دفع آمن ومشفر</p>
                          <p>ستتم إعادة توجيهك إلى صفحة الدفع الآمنة لإدخال بيانات البطاقة</p>
                        </div>
                      </div>
                    </div>
                </motion.div>

                {/* Security Features */}
                <div className="bg-green-50 p-4 rounded-lg mb-8">
                  <div className="flex items-center gap-4 text-green-700">
                    <Shield className="w-6 h-6" />
                    <div>
                      <h4 className="font-semibold">دفع آمن 100%</h4>
                      <p className="text-sm">جميع المعاملات مشفرة ومحمية</p>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadingSpinner />
                      <span>جاري المعالجة...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="w-6 h-6" />
                      <span>ادفع الآن - 47 ريال</span>
                    </div>
                  )}
                </motion.button>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>SSL مشفر</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>ضمان استرداد المال</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>دعم 24/7</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-8"
              >
                <OrderSummary />
                
                {/* Social Proof */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mt-6">
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#0e25ac' }}>
                    انضم إلى آلاف الطلاب
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">4.9/5 من 15,000+ تقييم</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">+3 مليون طالب حول العالم</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">50+ سنة من الخبرة</span>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mt-6">
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#0e25ac' }}>
                    ما ستحصل عليه
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">ندوة مباشرة تفاعلية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">جلسات TalkingPoints فردية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">اختبار تشخيص مجاني</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">رصيد 500 Global</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">رصيد 500 ريال للدورات</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0e25ac' }}>
                جاري معالجة الدفع...
              </h3>
              <p className="text-gray-600 mb-4">
                يرجى عدم إغلاق هذه الصفحة أو الضغط على زر الرجوع
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>معاملة آمنة ومشفرة</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
} 