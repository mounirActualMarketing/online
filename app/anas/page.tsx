'use client';

import { useEffect } from 'react';

export default function AnasLandingPage() {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Cairo', sans-serif;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden;
      }
      
      .hero-section {
        width: 100vw;
        height: 100vh;
        position: relative;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
        background-image: url('/anas/anas.jpg');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      @media (max-width: 768px) {
        html, body {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .hero-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-attachment: scroll;
          background-size: contain;
          background-position: center center;
          background-color: #f8f9fa;
          margin: 0 !important;
          padding: 0 !important;
          z-index: 1;
        }
        
        .hero-section + section {
          margin-top: 100vh;
        }
      }
      
      @media (max-width: 480px) {
        .hero-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-size: contain;
          background-position: center center;
          background-color: #f8f9fa;
          margin: 0 !important;
          padding: 0 !important;
          z-index: 1;
        }
        
        .hero-section + section {
          margin-top: 100vh;
        }
      }
      .cta-bg {
        background-image: linear-gradient(rgba(36,62,156,0.9), rgba(36,62,156,0.9)), url('https://images.unsplash.com/photo-1517842645767-c639042777db?w=1920');
        background-size: cover;
        background-position: center;
      }
    `;
    document.head.appendChild(style);

    // Set page title and meta
    document.title = 'منصة التعلم - ابدأ رحلتك التعليمية';
    
    return () => {
      // Cleanup
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <>


      {/* Hero Section with Background Image */}
      <section className="hero-section">
        {/* Text removed since the background image contains the text */}
      </section>

      {/* YouTube Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-4 border-[#ed1e40] rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-black">
                {/* YouTube Video Embed */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/lz9DmvnyZdU"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Video Info Bar - Removed */}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section with Blue Background */}
      <section className="bg-[#243e9c] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Image */}
            <div className="order-2 md:order-1">
              <img
                src="/anas/12months.png"
                alt="Learning Progress"
                className="rounded-2xl w-full"
              />
            </div>
            {/* Right Content with Big Number */}
            <div className="order-1 md:order-2 text-center md:text-right">
              <div className="relative inline-block">
                <div className="text-[150px] md:text-[200px] font-bold text-[#ed1e40] leading-none">
                  12
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold">
                    شهر
                  </span>
                </div>
              </div>
              <div className="text-white text-2xl md:text-3xl font-semibold mt-4">
                من مستوى 1 إلى مستوى 20
              </div>
              <p className="text-white/80 text-lg mt-4">
                رحلة تعليمية متكاملة تأخذك من البداية إلى الاحتراف
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src="/anas/level.png"
                  alt="حدد مستواك"
                  className="w-full h-48 object-contain group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#243e9c]">
                حدد مستواك
              </h3>
            </div>
            {/* Feature 2 */}
            <div className="text-center group">
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src="/anas/plan.png"
                  alt="ضع خطة"
                  className="w-full h-48 object-contain group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#243e9c]">
                ضع خطة
              </h3>
            </div>
            {/* Feature 3 */}
            <div className="text-center group">
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src="/anas/go.png"
                  alt="انطلق"
                  className="w-full h-48 object-contain group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#243e9c]">
                انطلق
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Checklist */}
      <section className="bg-[#243e9c] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center" dir="ltr">
            {/* Left Image */}
            <div className="order-1">
              <img
                src="/anas/wse.jpg"
                alt="Benefits"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            {/* Right Checklist */}
            <div className="order-2" dir="rtl">
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <svg
                    className="w-10 h-10 text-[#ff003a] mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/>
                  </svg>
                  <span className="text-white text-3xl font-bold">
                    نظام تعليمي عالمي معتمد
                  </span>
                </li>
                <li className="flex items-start gap-6">
                  <svg
                    className="w-10 h-10 text-[#ff003a] mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/>
                  </svg>
                  <span className="text-white text-3xl font-bold">
                    جلسات محادثة واقعية
                  </span>
                </li>
                <li className="flex items-start gap-6">
                  <svg
                    className="w-10 h-10 text-[#ff003a] mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/>
                  </svg>
                  <span className="text-white text-3xl font-bold">
                    دعم مستمر من المدرسين
                  </span>
                </li>
                <li className="flex items-start gap-6">
                  <svg
                    className="w-10 h-10 text-[#ff003a] mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/>
                  </svg>
                  <span className="text-white text-3xl font-bold">
                    مواعيد مرنة تناسب الجميع
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="cta-bg py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            سجّل الآن وابدأ قصتك!
          </h2>
          <p className="text-xl md:text-2xl text-white mb-8">
            انضم إلى أكثر من 2 مليون متعلم حول العالم
          </p>
          <button className="bg-[#ed1e40] text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-[#d11832] transform hover:scale-105 transition duration-300 shadow-2xl">
            ابدأ التعلم مجاناً
          </button>
          <p className="text-white mt-6 text-lg">
            لا تحتاج لبطاقة ائتمان • ابدأ فوراً
          </p>
        </div>
      </section>

    </>
  );
}

