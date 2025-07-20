'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/ui/utils/cn';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /** Показувати blur placeholder під час завантаження */
  showBlurPlaceholder?: boolean;
  /** Кастомний placeholder колір */
  placeholderColor?: string;
  /** Fallback зображення при помилці */
  fallbackSrc?: string;
  /** Клас контейнера */
  containerClassName?: string;
}

const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

/**
 * Оптимізований компонент зображень з:
 * - Автоматичний WebP/AVIF формат
 * - Lazy loading
 * - Blur placeholder
 * - Error handling з fallback
 * - Responsive images
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  containerClassName,
  showBlurPlaceholder = true,
  placeholderColor = 'bg-gray-200',
  fallbackSrc = '/placeholder.svg',
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Blur placeholder */}
      {isLoading && showBlurPlaceholder && (
        <div 
          className={cn(
            'absolute inset-0 animate-pulse',
            placeholderColor
          )}
          aria-hidden="true"
        />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'opacity-50',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={showBlurPlaceholder ? 'blur' : 'empty'}
        blurDataURL={showBlurPlaceholder ? BLUR_DATA_URL : undefined}
        priority={priority}
        // Автоматичні формати WebP/AVIF через next.config.ts
        quality={85}
        {...props}
      />
      
      {/* Error overlay */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          Зображення недоступне
        </div>
      )}
    </div>
  );
};

export { OptimizedImage }; 