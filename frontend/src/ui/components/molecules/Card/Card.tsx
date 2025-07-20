import React from 'react';
import { cn } from '@/ui/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'casino' | 'slot' | 'article' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = [
      // Base styles
      'rounded-lg transition-all duration-300',
    ];

    const variants = {
      default: [
        'bg-white border border-gray-200 shadow-sm hover:shadow-md',
      ],
      casino: [
        'bg-gradient-to-br from-red-50 to-red-100 border border-red-200',
        'shadow-md hover:shadow-lg hover:from-red-100 hover:to-red-200',
      ],
      slot: [
        'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200',
        'shadow-md hover:shadow-lg hover:from-purple-100 hover:to-purple-200',
      ],
      article: [
        'bg-white border border-gray-200 shadow-sm hover:shadow-lg',
        'hover:border-gray-300',
      ],
      elevated: [
        'bg-white shadow-lg hover:shadow-xl border-0',
      ],
      outlined: [
        'bg-transparent border-2 border-gray-300 hover:border-gray-400',
        'shadow-none hover:shadow-sm',
      ],
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      paddings[padding],
      className
    );

    return (
      <div
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 