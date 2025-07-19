import React from 'react';
import { cn } from '@/ui/utils/cn';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'casino' | 'premium' | 'success' | 'warning' | 'error' | 'outline' | 'exclusive' | 'featured' | 'new' | 'popular' | 'rank';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  rank?: number;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, variant = 'default', size = 'md', children, rank, ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center font-medium rounded-full transition-colors',
      'whitespace-nowrap select-none',
    ];

    const variants = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      casino: 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md',
      premium: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md',
      success: 'bg-green-100 text-green-800 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      error: 'bg-red-100 text-red-800 hover:bg-red-200',
      outline: 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50',
      exclusive: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse',
      featured: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg',
      new: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md',
      popular: 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md',
      rank: 'bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-xl border-2 border-gray-300',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs min-h-[20px]',
      md: 'px-2.5 py-1 text-sm min-h-[24px]',
      lg: 'px-3 py-1.5 text-base min-h-[28px]',
    };

    // Специальная обработка для rank variant
    if (variant === 'rank' && rank !== undefined) {
      const rankStyles = getRankStyles(rank);
      const classes = cn(
        baseStyles,
        rankStyles,
        'w-8 h-8 text-lg font-bold rounded-full flex items-center justify-center',
        className
      );

      return (
        <span className={classes} ref={ref} {...props}>
          {rank}
        </span>
      );
    }

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <span className={classes} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

// Функция для получения стилей ранка
function getRankStyles(rank: number): string {
  if (rank === 1) {
    return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 shadow-xl border-2 border-yellow-300';
  }
  if (rank === 2) {
    return 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900 shadow-xl border-2 border-gray-200';
  }
  if (rank === 3) {
    return 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 shadow-xl border-2 border-amber-400';
  }
  if (rank <= 10) {
    return 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg border-2 border-blue-300';
  }
  return 'bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-md border-2 border-gray-400';
}

StatusBadge.displayName = 'StatusBadge';

export { StatusBadge }; 