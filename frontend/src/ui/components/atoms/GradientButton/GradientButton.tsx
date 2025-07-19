import React from 'react';
import { cn } from '@/ui/utils/cn';

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'casino' | 'premium' | 'gold' | 'success' | 'royal' | 'diamond';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ 
    className, 
    variant = 'casino', 
    size = 'md', 
    children, 
    isLoading = false,
    fullWidth = false,
    glow = false,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      'transform hover:scale-105 active:scale-95',
      'relative overflow-hidden',
    ];

    const variants = {
      casino: [
        'bg-gradient-to-r from-red-500 via-orange-500 to-red-600',
        'hover:from-red-600 hover:via-orange-600 hover:to-red-700',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-red-500',
        glow && 'shadow-red-500/25 hover:shadow-red-500/40'
      ],
      premium: [
        'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600',
        'hover:from-purple-600 hover:via-indigo-600 hover:to-purple-700',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-purple-500',
        glow && 'shadow-purple-500/25 hover:shadow-purple-500/40'
      ],
      gold: [
        'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500',
        'hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-600',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-amber-500',
        glow && 'shadow-amber-500/25 hover:shadow-amber-500/40'
      ],
      success: [
        'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600',
        'hover:from-green-600 hover:via-emerald-600 hover:to-green-700',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-green-500',
        glow && 'shadow-green-500/25 hover:shadow-green-500/40'
      ],
      royal: [
        'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
        'hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-blue-500',
        glow && 'shadow-blue-500/25 hover:shadow-blue-500/40'
      ],
      diamond: [
        'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400',
        'hover:from-gray-500 hover:via-gray-400 hover:to-gray-500',
        'text-gray-800 shadow-lg hover:shadow-xl',
        'focus:ring-gray-500',
        glow && 'shadow-gray-500/25 hover:shadow-gray-500/40'
      ]
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -top-px overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] group-hover:animate-[shimmer_1s_infinite]" />
        </div>
        
        {/* Loading spinner */}
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export { GradientButton }; 