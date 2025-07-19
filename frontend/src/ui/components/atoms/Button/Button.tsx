import React from 'react';
import { cn } from '@/ui/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'casino' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild = false, ...props }, ref) => {
    const baseStyles = [
      // Base styles
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ];

    const variants = {
      primary: [
        'bg-blue-600 text-white hover:bg-blue-700',
        'focus-visible:ring-blue-500',
      ],
      secondary: [
        'bg-gray-200 text-gray-900 hover:bg-gray-300',
        'focus-visible:ring-gray-500',
      ],
      casino: [
        'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800',
        'shadow-lg hover:shadow-xl',
        'focus-visible:ring-red-500',
      ],
      outline: [
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
        'focus-visible:ring-gray-500',
      ],
      ghost: [
        'bg-transparent text-gray-700 hover:bg-gray-100',
        'focus-visible:ring-gray-500',
      ],
      success: [
        'bg-green-600 text-white hover:bg-green-700',
        'focus-visible:ring-green-500',
      ],
      warning: [
        'bg-yellow-600 text-white hover:bg-yellow-700',
        'focus-visible:ring-yellow-500',
      ],
      error: [
        'bg-red-600 text-white hover:bg-red-700',
        'focus-visible:ring-red-500',
      ],
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 