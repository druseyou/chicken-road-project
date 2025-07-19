import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Вказуємо правильний шлях до нового файлу конфігурації
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

// Bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  
  // Експериментальні функції для оптимізації
  experimental: {
    optimizePackageImports: ['next-intl', 'clsx', 'tailwind-merge'],
  },
  
  // Оптимізація зображень
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 рік
  },
  
  // Компресія
  compress: true,
  
  // Оптимізація продуктивності
  poweredByHeader: false, // Видаляємо X-Powered-By header
  
  // Webpack оптимізації для vendor chunks
  webpack: (config, { isServer, dev }) => {
    // Оптимізація для клієнтського bundle
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Framework chunk (React, Next.js) - найважливіший
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          
          // Internationalization chunk - розділяємо i18n
          intl: {
            name: 'intl',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](next-intl)[\\/]/,
            priority: 30,
            enforce: true,
          },
          
          // Utilities chunk - маленькі утиліти разом
          utils: {
            name: 'utils',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|qs)[\\/]/,
            priority: 25,
            enforce: true,
          },
          
          // Vendor chunk для решти бібліотек
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
          },
          
          // Common chunk для спільного коду додатка
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers для кешування
  headers: async () => [
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000',
        },
      ],
    },
  ],
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
