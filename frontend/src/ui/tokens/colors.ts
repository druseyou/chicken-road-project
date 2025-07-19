export const colors = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Casino theme colors - расширенная палитра
  casino: {
    red: '#dc2626',
    gold: '#f59e0b',
    green: '#16a34a',
    purple: '#9333ea',
    orange: '#ea580c',
    // Новые casino цвета
    emerald: '#10b981',
    ruby: '#ef4444',
    royal: '#6366f1',
    premium: '#8b5cf6',
    platinum: '#6b7280',
    diamond: '#e5e7eb',
  },
  
  // Градиенты для casino элементов
  gradients: {
    casino: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
    premium: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    gold: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    emerald: 'linear-gradient(135deg, #10b981 0%, #16a34a 100%)',
    royal: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    platinum: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
  },
  
  // Rating colors
  rating: {
    excellent: '#10b981', // Green
    great: '#3b82f6',     // Blue  
    good: '#f59e0b',      // Orange
    fair: '#ef4444',      // Red
    poor: '#6b7280',      // Gray
  },
  
  // Status colors
  status: {
    featured: '#8b5cf6',
    exclusive: '#dc2626',
    new: '#10b981',
    popular: '#f59e0b',
    verified: '#3b82f6',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    700: '#a16207',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  
  // Special colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors; 