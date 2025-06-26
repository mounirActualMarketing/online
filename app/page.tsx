'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  Heart,
  CheckCircle,
  Globe,
  Headphones,
  GraduationCap,
  Award,
  Star,
  Calendar,
  CreditCard,
  Shield,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// TypeScript declarations for global objects
declare global {
  interface Window {
    richSnippetReviewsWidgets?: (widgetName: string, config: Record<string, unknown>) => void;
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

// Enhanced card component with gradient icons
const FeatureCard = ({ icon, title, text, delay = 0 }: { icon: React.ReactNode, title: string, text: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
  >
    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform" style={{ backgroundColor: '#FF0201' }}>
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2" style={{ color: '#0e25ac' }}>{title}</h3>
    <p className="text-sm" style={{ color: '#0e25ac' }}>{text}</p>
    <div className="h-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
  </motion.div>
);

// Advanced feature card with simpler design
const AdvancedCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center group cursor-pointer"
  >
    <motion.div 
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: '#FF0201' }}
    >
      {icon}
    </motion.div>
    <h4 className="text-lg font-semibold mb-2 transition-colors" style={{ color: '#0e25ac' }}>
      {title}
    </h4>
    <p className="text-sm" style={{ color: '#0e25ac' }}>{text}</p>
  </motion.div>
);

// Why online card
const WhyOnlineCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: '#FF0201' }}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-1 leading-tight" style={{ color: '#0e25ac' }}>{title}</h4>
        <p className="text-xs" style={{ color: '#0e25ac' }}>{text}</p>
      </div>
    </div>
  </motion.div>
);

// Achievement card
const AchievementCard = ({ icon, title, gradient }: { icon: React.ReactNode, title: string, gradient: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <motion.div 
      whileHover={{ scale: 1.1, rotate: 10 }}
      className={`w-24 h-24 mx-auto mb-6 ${gradient} rounded-full flex items-center justify-center text-white shadow-lg`}
    >
      {icon}
    </motion.div>
    <h4 className="text-xl font-semibold" style={{ color: '#0e25ac' }}>{title}</h4>
  </motion.div>
);

// Reviews Widget Component
const ReviewsWidget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Load Reviews.io script dynamically
    const script = document.createElement('script');
    script.src = 'https://widget.reviews.io/rich-snippet-reviews-widgets/dist.js';
    script.type = 'text/javascript';
    script.async = true;
    
          script.onload = () => {
        // Initialize the widget after script loads
        if (typeof window !== 'undefined' && window.richSnippetReviewsWidgets) {
          window.richSnippetReviewsWidgets("carousel-widget", {
          store: "wall-street-english-saudi-arabia",
          primaryClr: "#fed130",
          neutralClr: "#cccccc",
          reviewTextClr: "#333333",
          widgetName: "carousel",
          layout: "fullWidth",
          numReviews: 40,
          showProductImages: false,
          contentMode: "company",
          hideDates: false,
          numberedDates: true,
          css: '@import url("https://fonts.googleapis.com/css?family=Open+Sans"); .CarouselWidget, .CarouselWidget .reviewsContainer {font-family: Open Sans!important;} .CarouselWidget .reviewsContainer .reviewWrap .reviewHeader .author, .js-ruk_word { color: #003359!important; } .RatingStatistics .RatingStatistics__Number, .RatingStatistics .RatingStatistics__Text { color: #4f4f4f!important; font-weight: bold; } .fullWidth.CarouselWidget .cw__header > a { max-width: 100%!important; } .CarouselWidget a.header__content .header__stats { width: 100%!important;} .CarouselWidget a.header__content .stats__right { float:none!important; } @media only screen and (max-width: 820px) { .CarouselWidget a.header__content .stats__right { float:left!important; }}'
        });
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FF0201' }}></div>
          <p style={{ color: '#0e25ac' }}>جاري تحميل التقييمات...</p>
        </div>
      </div>
    );
  }

  return <div id="carousel-widget" style={{ maxWidth: '1200px', margin: '0 auto' }}></div>;
};

// HubSpot Contact Form Component
const ContactFormWidget = ({ formId = "default" }: { formId?: string }) => {
  const [mounted, setMounted] = useState(false);
  const targetId = `hubspot-form-target-${formId}`;

  useEffect(() => {
    setMounted(true);
    
    // Only run on client side after component is mounted
    if (typeof window !== 'undefined') {
      // Check if script is already loaded
      const existingScript = document.querySelector('script[src*="js.hsforms.net"]');
      
      const createForm = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "2550768",
            formId: "e4adf247-7ad9-4ba5-878b-0257d030b7ee",
            target: `#${targetId}`
          });
        }
      };

      if (existingScript) {
        // Script already exists, just create the form
        setTimeout(createForm, 500);
      } else {
        // Load HubSpot script
        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        
        script.onload = () => {
          setTimeout(createForm, 1000);
        };
        
        document.head.appendChild(script);
      }
    }
  }, [targetId]);

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <div className="w-full h-96 bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FF0201' }}></div>
          <p style={{ color: '#0e25ac' }}>جاري تحميل النموذج...</p>
        </div>
      </div>
    );
  }

  return <div id={targetId} className="w-full min-h-[400px]"></div>;
};

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-white" dir="rtl">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm"
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-42 h-20 relative">
              <Image 
                src="/logo.png" 
                alt="Wall Street English Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">المميزات</a>
            <a href="#methods" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">طرق التعلم</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">من نحن</a>
            <a href="#payment" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">الدفع</a>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-right"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#0e25ac' }}>
                تعلم
                <span style={{ color: '#FF0201' }}> الانجليزي </span>
                من أي مكان
              </h2>
              <p className="text-xl mb-8 leading-relaxed" style={{ color: '#0e25ac' }}>
                احترف اللغة الإنجليزية مع أفضل المدرسين والطرق التفاعلية الحديثة
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#FF0201' }}
              >
                سجل الآن
              </motion.button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-96"
            >
        <Image
                src="/hdrtv.webp" 
                alt="تعلم الإنجليزية أونلاين مع Wall Street English"
                fill
                className="object-cover rounded-2xl"
          priority
        />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#FF0201' }}
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Method Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>طريقة التعلم</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Users className="w-8 h-8" />} 
              title="حصص مباشرة أونلاين" 
              text="تفاعل مباشر مع المعلمين"
              delay={0}
            />
            <FeatureCard 
              icon={<Clock className="w-8 h-8" />} 
              title="الوقت والمكان حسب اختيارك" 
              text="مرونة في التوقيت"
              delay={0.1}
            />
            <FeatureCard 
              icon={<GraduationCap className="w-8 h-8" />} 
              title="فصول صغيرة تتضمن ٤ طلاب فقط" 
              text="اهتمام شخصي أكبر"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Heart className="w-8 h-8" />} 
              title="أنشطة ممتعة وتفاعلية لممارسة اللغة" 
              text="تعلم بطريقة ممتعة"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Ask Experts Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>اسأل خبراءنا</h3>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0201' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#0e25ac' }}>
              تواصل مع خبرائنا المتخصصين للحصول على استشارة مجانية وخطة تعليمية مخصصة
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Expert - Fayez */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden hover:shadow-3xl transition-all duration-300">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-8 -translate-x-8 opacity-30" style={{ backgroundColor: '#FF0201' }}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-full h-80 mx-auto mb-6 relative">
                    <Image
                      src="/Ask-Fayez-1.png"
                      alt="فايز - خبير تعليم اللغة الإنجليزية"
                      fill
                      className="object-contain rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FF0201' }}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-3" style={{ color: '#0e25ac' }}>فايز</h4>

                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.getElementById('contact-form-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: '#FF0201' }}
                  >
                    استشر فايز
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Expert - Haifa */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden hover:shadow-3xl transition-all duration-300">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full -translate-y-16 -translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500 rounded-full translate-y-8 translate-x-8 opacity-30"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-full h-80 mx-auto mb-6 relative">
            <Image
                      src="/Ask-Haifa-1.png"
                      alt="هيفاء - خبيرة تعليم اللغة الإنجليزية"
                      fill
                      className="object-contain rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-3" style={{ color: '#0e25ac' }}>هيفاء</h4>

                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.getElementById('contact-form-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: '#0e25ac' }}
                  >
                    استشيري هيفاء
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Advanced Learning Method */}
      <section id="methods" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>طريقة التعلم المتقدمة</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AdvancedCard 
              icon={<GraduationCap className="w-10 h-10" />}
              title="إنجليش 100%"
              text="تعلم اللغة الإنجليزية بالكامل"
            />
            <AdvancedCard 
              icon={<Headphones className="w-10 h-10" />}
              title="دعم متواصل على مدار الساعة"
              text="24/7 مساعدة فورية"
            />
            <AdvancedCard 
              icon={<Globe className="w-10 h-10" />}
              title="مجتمع عالمي بثقافات مختلفة"
              text="تواصل مع طلاب من جميع أنحاء العالم"
            />
            <AdvancedCard 
              icon={<Users className="w-10 h-10" />}
              title="تواصل مباشر مع المدرسين"
              text="تفاعل شخصي مع أفضل المعلمين"
            />
          </div>
        </div>
      </section>

      {/* Why Online Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>ليش الأونلاين أفضل؟</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <WhyOnlineCard 
              icon={<Calendar className="w-6 h-6" />}
              title="لأن وقتك محدود أيام الدراسة"
              text="ممكن تتعلم في الوقت المناسب"
            />
            <WhyOnlineCard 
              icon={<Clock className="w-6 h-6" />}
              title="لأن وقتك مع العائلة ثمين"
              text="‏حدّد الجدول اللي يناسبك"
            />
            <WhyOnlineCard 
              icon={<Heart className="w-6 h-6" />}
              title="لأنك تبي تطور نفسك والوقت ما يوقف"
              text="ادرس في الوقت اللي تحبه"
            />
            <WhyOnlineCard 
              icon={<CheckCircle className="w-6 h-6" />}
              title="لأنك ما تبغى تسوق بعد الشغل"
              text="الصف يجي لعندك"
            />
          </div>
        </div>
      </section>

             {/* YouTube Video Section */}
       <section className="py-20">
         <div className="container mx-auto px-4">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-center mb-16"
           >
             <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>شاهد كيف نعلم الإنجليزية</h3>
             <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0201' }}></div>
             <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#0e25ac' }}>
               اكتشف طريقتنا المبتكرة في تعليم اللغة الإنجليزية من خلال هذا الفيديو
             </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6 }}
             className="max-w-4xl mx-auto"
           >
             <div className="relative bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-3xl shadow-2xl">
               <div className="relative rounded-2xl overflow-hidden shadow-lg">
                 {/* YouTube Video */}
                 <div className="aspect-video">
                   <iframe 
                     width="100%" 
                     height="100%" 
                     src="https://www.youtube.com/embed/S4arTLoBD5s" 
                     title="GOC- الفصول الدراسية العالمية الجديدة من وول ستريت إنجلش #تعلم_الانجليزية" 
                     frameBorder="0" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                     referrerPolicy="strict-origin-when-cross-origin" 
                     allowFullScreen
                     className="w-full h-full rounded-2xl"
                   ></iframe>
                 </div>

                 {/* Floating elements for modern look */}
                 <motion.div 
                   animate={{ y: [-10, 10, -10] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                   style={{ backgroundColor: '#FF0201' }}
                 >
                   <Globe className="w-6 h-6 text-white" />
                 </motion.div>

                 <motion.div 
                   animate={{ y: [10, -10, 10] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-4 left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                 >
                   <GraduationCap className="w-5 h-5 text-white" />
                 </motion.div>
               </div>

               {/* Decorative elements */}
               <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full opacity-20"></div>
               <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full opacity-30" style={{ backgroundColor: '#FF0201' }}></div>
             </div>

             {/* Call to action below video */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="text-center mt-8"
             >
               <p className="text-lg mb-6" style={{ color: '#0e25ac' }}>
                 جاهز لتبدأ رحلتك في تعلم الإنجليزية؟
               </p>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => {
                   const element = document.getElementById('contact-form-section');
                   element?.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className="text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mx-4 cursor-pointer"
                 style={{ backgroundColor: '#FF0201' }}
               >
                 ابدأ الآن 
               </motion.button>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => {
                   const element = document.getElementById('contact-form-section');
                   element?.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className="border-2 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300 mx-4 cursor-pointer"
                 style={{ borderColor: '#0e25ac', color: '#0e25ac' }}
               >
                 تعرف على المزيد
               </motion.button>
             </motion.div>
           </motion.div>
         </div>
       </section>

       {/* Reviews Section */}
       <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
         <div className="container mx-auto px-4">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-center mb-16"
           >
             <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>قالوا عن وول ستريت إنجلش</h3>
             <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0201' }}></div>
             <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#0e25ac' }}>
               اكتشف ما يقوله طلابنا عن تجربتهم معنا في تعلم اللغة الإنجليزية
             </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="max-w-6xl mx-auto"
           >
             {/* Reviews.io Widget Container */}
             <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
               {/* Decorative elements */}
               <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
               <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full -translate-x-8 translate-y-8 opacity-30" style={{ backgroundColor: '#FF0201' }}></div>
               
               {/* Reviews Widget */}
               <ReviewsWidget />
               
               {/* Floating review stats */}
               <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-8 right-8 bg-white rounded-2xl shadow-lg p-4 border-l-4"
                 style={{ borderLeftColor: '#FF0201' }}
               >
                 <div className="flex items-center gap-2">
                   <div className="flex">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                     ))}
                   </div>
                   <span className="text-sm font-semibold" style={{ color: '#0e25ac' }}>4.9/5</span>
                 </div>
                 <p className="text-xs mt-1" style={{ color: '#0e25ac' }}>+1000 تقييم</p>
               </motion.div>

               <motion.div 
                 animate={{ y: [5, -5, 5] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-lg p-4 border-l-4 border-l-blue-500"
               >
                 <div className="flex items-center gap-2">
                   <Users className="w-5 h-5 text-blue-500" />
                   <span className="text-sm font-semibold" style={{ color: '#0e25ac' }}>+3M</span>
                 </div>
                 <p className="text-xs mt-1" style={{ color: '#0e25ac' }}>طالب راضي</p>
               </motion.div>
             </div>

             {/* Trust indicators */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
             >
               <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                 <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF0201' }}>
                   <Shield className="w-8 h-8 text-white" />
                 </div>
                 <h4 className="font-semibold mb-2" style={{ color: '#0e25ac' }}>تقييمات موثقة</h4>
                 <p className="text-sm" style={{ color: '#0e25ac' }}>جميع التقييمات من طلاب حقيقيين</p>
               </div>

               <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                 <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                   <Award className="w-8 h-8 text-white" />
                 </div>
                 <h4 className="font-semibold mb-2" style={{ color: '#0e25ac' }}>معتمد دولياً</h4>
                 <p className="text-sm" style={{ color: '#0e25ac' }}>شهادات معترف بها عالمياً</p>
               </div>

               <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                 <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                   <CheckCircle className="w-8 h-8 text-white" />
                 </div>
                 <h4 className="font-semibold mb-2" style={{ color: '#0e25ac' }}>نتائج مضمونة</h4>
                 <p className="text-sm" style={{ color: '#0e25ac' }}>ضمان تحسن مستواك في الإنجليزية</p>
               </div>
             </motion.div>
           </motion.div>
         </div>
       </section>

       {/* Contact Form Section */}
       <section className="py-20">
         <div className="container mx-auto px-4">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-center mb-16"
           >
             <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>املأ بياناتك لتحديد موعد مع المستشار التدريبي</h3>
             <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0201' }}></div>
             <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#0e25ac' }}>
               احجز استشارة مجانية مع خبرائنا لتحديد أفضل برنامج تعليمي يناسب احتياجاتك
             </p>
           </motion.div>

           <div className="max-w-4xl mx-auto">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Form Container */}
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6 }}
                 className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
               >
                 {/* Decorative elements */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-8 -translate-x-8 opacity-30" style={{ backgroundColor: '#FF0201' }}></div>
                 
                 {/* Form Header */}
                 <div className="relative z-10 mb-6">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF0201' }}>
                       <Calendar className="w-6 h-6 text-white" />
                     </div>
                     <h4 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>احجز استشارتك المجانية</h4>
                   </div>
                   <p className="text-sm" style={{ color: '#0e25ac' }}>
                     سيتواصل معك مستشارنا خلال 24 ساعة لتحديد الموعد المناسب
                   </p>
                 </div>

                 {/* HubSpot Form */}
                 <div className="relative z-10">
                   <ContactFormWidget formId="first" />
                 </div>
               </motion.div>

               {/* Benefits Side */}
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="space-y-6"
               >
                 <div className="text-center lg:text-right">
                   <h4 className="text-3xl font-bold mb-6" style={{ color: '#0e25ac' }}>
                     ماذا ستحصل عليه؟
                   </h4>
                 </div>

                 {/* Benefits List */}
                 <div className="space-y-4">
                   <motion.div 
                     whileHover={{ x: 5 }}
                     className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg"
                   >
                     <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF0201' }}>
                       <CheckCircle className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <h5 className="font-semibold mb-1" style={{ color: '#0e25ac' }}>تقييم مستواك الحالي</h5>
                       <p className="text-sm" style={{ color: '#0e25ac' }}>اختبار شامل لتحديد نقطة البداية المناسبة</p>
                     </div>
                   </motion.div>

                   <motion.div 
                     whileHover={{ x: 5 }}
                     className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg"
                   >
                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                       <GraduationCap className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <h5 className="font-semibold mb-1" style={{ color: '#0e25ac' }}>خطة تعليمية مخصصة</h5>
                       <p className="text-sm" style={{ color: '#0e25ac' }}>برنامج مصمم خصيصاً لأهدافك وجدولك</p>
                     </div>
                   </motion.div>

                   <motion.div 
                     whileHover={{ x: 5 }}
                     className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg"
                   >
                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                       <Users className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <h5 className="font-semibold mb-1" style={{ color: '#0e25ac' }}>مستشار شخصي</h5>
                       <p className="text-sm" style={{ color: '#0e25ac' }}>متابعة مستمرة لضمان تحقيق أهدافك</p>
                     </div>
                   </motion.div>

                   <motion.div 
                     whileHover={{ x: 5 }}
                     className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg"
                   >
                     <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                       <Award className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <h5 className="font-semibold mb-1" style={{ color: '#0e25ac' }}>شهادة معتمدة</h5>
                       <p className="text-sm" style={{ color: '#0e25ac' }}>شهادة دولية معترف بها عالمياً</p>
                     </div>
                   </motion.div>
                 </div>

                 {/* Trust badges */}
                 <div className="pt-6">
                   <div className="flex items-center justify-center lg:justify-start gap-6">
                     <div className="text-center">
                       <div className="flex justify-center mb-2">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                         ))}
                       </div>
                       <p className="text-xs" style={{ color: '#0e25ac' }}>4.9/5 تقييم</p>
                     </div>
                     <div className="w-px h-8 bg-gray-300"></div>
                     <div className="text-center">
                       <p className="font-bold text-lg" style={{ color: '#0e25ac' }}>+50</p>
                       <p className="text-xs" style={{ color: '#0e25ac' }}>سنة خبرة</p>
                     </div>
                     <div className="w-px h-8 bg-gray-300"></div>
                     <div className="text-center">
                       <p className="font-bold text-lg" style={{ color: '#0e25ac' }}>+3M</p>
                       <p className="text-xs" style={{ color: '#0e25ac' }}>طالب</p>
                     </div>
                   </div>
                 </div>
               </motion.div>
             </div>
           </div>
         </div>
       </section>

       {/* Why Choose Us Section */}
       <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>ليش الكل بختارنا</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <AchievementCard 
              icon={<Users className="w-12 h-12" />}
              title="أكثر من ٣ مليون طالب تفوقوا معنا"
              gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <AchievementCard 
              icon={<Award className="w-12 h-12" />}
              title="شهادة معتمدة"
              gradient="bg-gradient-to-r from-green-500 to-green-600"
            />
            <AchievementCard 
              icon={<Star className="w-12 h-12" />}
              title="خبرة ٥٠ سنة في التعليم"
              gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>طرق دفع آمنة وسهلة</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Single Payment */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg border"
            >
              <h4 className="text-2xl font-bold text-center mb-8" style={{ color: '#0e25ac' }}>دفعة واحدة</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  <span style={{ color: '#0e25ac' }}>تحويل بنكي</span>
                  <CheckCircle className="w-5 h-5 text-green-500 mr-auto" />
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span style={{ color: '#0e25ac' }}>بطاقات ائتمانية</span>
                  <CheckCircle className="w-5 h-5 text-green-500 mr-auto" />
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span style={{ color: '#0e25ac' }}>نظام Teler</span>
                  <CheckCircle className="w-5 h-5 text-green-500 mr-auto" />
                </div>
              </div>
            </motion.div>

            {/* Multiple Payments */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-lg text-white"
            >
              <h4 className="text-2xl font-bold text-center mb-4">على عدة أقساط</h4>
              <p className="text-center mb-6 text-blue-100">تطبيق الشروط والأحكام، بدون فوائد ولا رسم</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm">tabby</div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm">tamara</div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm">alinma bank</div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm">SNB</div>
              </div>

                              <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-white py-3 rounded-lg font-semibold transition-colors mb-6"
                  style={{ backgroundColor: '#FF0201' }}
                >
                  سجل الآن وادفع لاحقاً
                </motion.button>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm">JeelPay</div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm">alrajhi bank</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - After Payment */}
      <section id="contact-form-section" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#0e25ac' }}>املأ بياناتك لتحديد موعد مع المستشار التدريبي</h3>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0201' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#0e25ac' }}>
              احجز استشارة مجانية مع خبرائنا لتحديد أفضل برنامج تعليمي يناسب احتياجاتك
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-8 -translate-x-8 opacity-30" style={{ backgroundColor: '#FF0201' }}></div>
              
              {/* Form Header */}
              <div className="relative z-10 mb-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF0201' }}>
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold" style={{ color: '#0e25ac' }}>احجز استشارتك المجانية</h4>
                </div>
                <p className="text-sm" style={{ color: '#0e25ac' }}>
                  سيتواصل معك مستشارنا خلال 24 ساعة لتحديد الموعد المناسب
                </p>
              </div>

              {/* HubSpot Form */}
              <div className="relative z-10">
                <ContactFormWidget formId="second" />
              </div>

              {/* Trust indicators below form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 pt-6 mt-6 border-t border-gray-100"
              >
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: '#0e25ac' }}>4.9/5 تقييم</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <p className="font-bold text-lg" style={{ color: '#0e25ac' }}>+50</p>
                    <p className="text-xs" style={{ color: '#0e25ac' }}>سنة خبرة</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <p className="font-bold text-lg" style={{ color: '#0e25ac' }}>+3M</p>
                    <p className="text-xs" style={{ color: '#0e25ac' }}>طالب</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 relative">
          <Image
                  src="/logo.png" 
                  alt="Wall Street English Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
           
            <div className="flex justify-center gap-6 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-400">
              Copyright © 2025 Wall Street English - جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
