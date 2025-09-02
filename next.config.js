/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization for all domains
    unoptimized: false,
    // Allow external image domains if needed
    domains: [
      'localhost',
      'secure.clickpay.com.sa',
      'www.youtube.com',
      'img.youtube.com'
    ],
    // Configure image formats
    formats: ['image/webp', 'image/avif'],
    // Configure image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features if needed
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': __dirname,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
