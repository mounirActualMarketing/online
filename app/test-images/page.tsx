'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TestImages() {
  const [imageErrors, setImageErrors] = useState<Record<string, string>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const images = [
    { src: '/logo.png', name: 'Logo' },
    { src: '/Ask-Fayez-1.png', name: 'Fayez' },
    { src: '/Ask-Haifa-1.png', name: 'Haifa' },
    { src: '/hdrtv.webp', name: 'Hero TV' },
    { src: '/hero-image.jpg', name: 'Hero Image' },
    { src: '/logowhite.png', name: 'Logo White' },
  ];

  const handleImageError = (imageName: string, error: any) => {
    console.error(`Image failed to load: ${imageName}`, error);
    setImageErrors(prev => ({ ...prev, [imageName]: 'Failed to load' }));
  };

  const handleImageLoad = (imageName: string) => {
    console.log(`Image loaded successfully: ${imageName}`);
    setImageLoaded(prev => ({ ...prev, [imageName]: true }));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#0e25ac' }}>
          اختبار الصور
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div key={image.src} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#0e25ac' }}>
                {image.name}
              </h2>
              
              {/* Next.js Image Component */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-600">Next.js Image:</h3>
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.name}
                    fill
                    className="object-contain"
                    onError={(e) => handleImageError(image.name + '-nextjs', e)}
                    onLoad={() => handleImageLoad(image.name + '-nextjs')}
                    priority={image.name === 'Logo'}
                  />
                </div>
                <div className="mt-2 text-xs">
                  {imageLoaded[image.name + '-nextjs'] && (
                    <span className="text-green-600">✅ تم التحميل</span>
                  )}
                  {imageErrors[image.name + '-nextjs'] && (
                    <span className="text-red-600">❌ فشل التحميل</span>
                  )}
                </div>
              </div>

              {/* Regular img tag for comparison */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-600">Regular img:</h3>
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => handleImageError(image.name + '-regular', e)}
                    onLoad={() => handleImageLoad(image.name + '-regular')}
                  />
                </div>
                <div className="mt-2 text-xs">
                  {imageLoaded[image.name + '-regular'] && (
                    <span className="text-green-600">✅ تم التحميل</span>
                  )}
                  {imageErrors[image.name + '-regular'] && (
                    <span className="text-red-600">❌ فشل التحميل</span>
                  )}
                </div>
              </div>

              {/* File info */}
              <div className="text-xs text-gray-500">
                <p>المسار: {image.src}</p>
                <p>
                  <a 
                    href={image.src} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    فتح مباشر
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#0e25ac' }}>
            معلومات التشخيص
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Environment:</h3>
              <p className="text-sm text-gray-600">
                Development Mode: {process.env.NODE_ENV === 'development' ? 'Yes' : 'No'}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Image Errors:</h3>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify(imageErrors, null, 2)}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Image Loaded:</h3>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify(imageLoaded, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            العودة للصفحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  );
}

