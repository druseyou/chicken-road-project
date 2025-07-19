import React from 'react';
import { cn } from '@/ui/utils/cn';
import { useTranslations } from 'next-intl';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'casino' | 'minimal';
  showValue?: boolean;
  showLabel?: boolean;
  precision?: number;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ 
    className, 
    value = 0, 
    maxValue = 5, 
    size = 'md', 
    variant = 'default',
    showValue = false,
    showLabel = false,
    precision = 1,
    ...props 
  }, ref) => {
    const t = useTranslations('Rating');
    
    const normalizedValue = Math.min(Math.max(value, 0), maxValue);
    const filledStars = Math.floor(normalizedValue);
    const hasHalfStar = normalizedValue % 1 >= 0.5;
    const emptyStars = maxValue - filledStars - (hasHalfStar ? 1 : 0);

    const sizes = {
      sm: 'text-sm',
      md: 'text-base', 
      lg: 'text-lg',
    };

    const starColors = {
      default: 'text-yellow-400',
      casino: 'text-yellow-500',
      minimal: 'text-gray-400',
    };

    const getRatingLabel = (rating: number): string => {
      if (rating >= 4.5) return t('excellent');
      if (rating >= 4.0) return t('great');
      if (rating >= 3.5) return t('good');
      if (rating >= 3.0) return t('fair');
      return t('poor');
    };

    const getRatingColor = (rating: number): string => {
      if (rating >= 4.5) return 'text-green-600';
      if (rating >= 4.0) return 'text-blue-600';
      if (rating >= 3.5) return 'text-yellow-600';
      if (rating >= 3.0) return 'text-orange-600';
      return 'text-red-600';
    };

    const classes = cn(
      'inline-flex items-center gap-1',
      sizes[size],
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="flex items-center">
          {/* Filled stars */}
          {Array.from({ length: filledStars }).map((_, index) => (
            <span key={`filled-${index}`} className={cn('select-none', starColors[variant])}>
              ★
            </span>
          ))}

          {/* Half star */}
          {hasHalfStar && (
            <span className={cn('relative select-none', starColors[variant])}>
              <span className="text-gray-300">★</span>
              <span 
                className={cn('absolute inset-0 overflow-hidden', starColors[variant])}
                style={{ width: '50%' }}
              >
                ★
              </span>
            </span>
          )}

          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <span key={`empty-${index}`} className="text-gray-300 select-none">
              ★
            </span>
          ))}
        </div>

        {showValue && (
          <span className="text-sm font-medium text-gray-600 ml-1">
            {value.toFixed(precision)}/5
          </span>
        )}

        {showLabel && (
          <span className={cn('text-sm font-medium ml-1', getRatingColor(value))}>
            {getRatingLabel(value)}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export { Rating }; 