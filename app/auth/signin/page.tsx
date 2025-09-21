'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('بيانات تسجيل الدخول غير صحيحة');
      } else {
        // Get session to check user role
        const session = await getSession();
        if (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/assessment');
        }
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#0e25ac' }}>
                تسجيل الدخول
              </h1>
              <p className="text-gray-600">
                ادخل بيانات تسجيل الدخول للوصول إلى اختبار تحديد المستوى
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="أدخل كلمة المرور"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-3 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#e74c3c' }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    <span>تسجيل الدخول</span>
                  </div>
                )}
              </motion.button>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                لم تتلق بيانات تسجيل الدخول؟ تحقق من بريدك الإلكتروني أو تواصل معنا
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3 text-blue-700">
                <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">تسجيل دخول آمن</p>
                  <p className="text-sm">جميع البيانات محمية ومشفرة</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
