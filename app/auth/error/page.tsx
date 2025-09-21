'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const errorMessages: Record<string, string> = {
  Configuration: 'خطأ في إعدادات النظام',
  AccessDenied: 'تم رفض الوصول',
  Verification: 'فشل في التحقق',
  Default: 'حدث خطأ في تسجيل الدخول',
  CredentialsSignin: 'بيانات تسجيل الدخول غير صحيحة',
  Callback: 'خطأ في عملية تسجيل الدخول',
  OAuthSignin: 'خطأ في تسجيل الدخول',
  OAuthCallback: 'خطأ في معالجة تسجيل الدخول',
  OAuthCreateAccount: 'خطأ في إنشاء الحساب',
  EmailCreateAccount: 'خطأ في إنشاء الحساب',
  OAuthAccountNotLinked: 'الحساب غير مربوط',
  SessionRequired: 'يجب تسجيل الدخول أولاً'
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || 'Default';
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-48 h-16 relative">
              <Image 
                src="/logo.png" 
                alt="Wall Street English Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 text-center"
          >
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#0e25ac' }}>
              خطأ في تسجيل الدخول
            </h1>
            
            <p className="text-gray-600 mb-2">
              {errorMessage}
            </p>
            
            {error === 'CredentialsSignin' && (
              <p className="text-sm text-gray-500 mb-6">
                تأكد من صحة البريد الإلكتروني وكلمة المرور
              </p>
            )}

            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-100 p-3 rounded-lg mb-6 text-left">
                <p className="text-xs text-gray-600">
                  <strong>Debug Info:</strong> {error}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="flex items-center justify-center gap-2 w-full text-white py-3 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#e74c3c' }}
              >
                <RefreshCw className="w-5 h-5" />
                <span>المحاولة مرة أخرى</span>
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full text-gray-600 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                إذا استمرت المشكلة، تواصل معنا للحصول على المساعدة
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
