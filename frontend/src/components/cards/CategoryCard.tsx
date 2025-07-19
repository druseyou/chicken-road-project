'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Card } from '@/ui/components/molecules';
import { Heading, Text, Badge } from '@/ui/components/atoms';
import { cn } from '@/ui/utils/cn';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
  showStats?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

export default function CategoryCard({ 
  category, 
  className,
  showStats = true,
  variant = 'default'
}: CategoryCardProps) {
  const t = useTranslations('CategoryCard');

  const totalContent = (category.articles?.length || 0) + (category.slots?.length || 0);

  const renderIcon = () => {
    if (category.icon?.url) {
      return (
        <Image
          src={category.icon.url}
          alt={category.icon.alternativeText || category.name}
          width={variant === 'compact' ? 32 : 48}
          height={variant === 'compact' ? 32 : 48}
          className="object-contain"
        />
      );
    }

    // Fallback icon based on category name
    return (
      <div 
        className={cn(
          'rounded-lg flex items-center justify-center text-white font-bold',
          variant === 'compact' ? 'w-8 h-8 text-sm' : 'w-12 h-12 text-lg'
        )}
        style={{ backgroundColor: category.color || '#6366f1' }}
      >
        {category.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <Link href={`/categories/${category.slug}`}>
        <Card 
          variant="default" 
          padding="md"
          className={cn(
            'group hover:shadow-md transition-all duration-300 cursor-pointer',
            className
          )}
        >
          <div className="flex items-center gap-3">
            {renderIcon()}
            
            <div className="flex-1 min-w-0">
              <Heading as="h4" size="sm" className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                {category.name}
              </Heading>
              
              {showStats && totalContent > 0 && (
                <Text size="sm" className="text-gray-500">
                  {t('content_count', { count: totalContent })}
                </Text>
              )}
            </div>

            {category.is_featured && (
              <Badge variant="success" size="sm">
                {t('featured')}
              </Badge>
            )}
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/categories/${category.slug}`}>
      <Card 
        variant="default" 
        padding="lg"
        className={cn(
          'group hover:shadow-lg transition-all duration-300 cursor-pointer h-full',
          variant === 'featured' && 'border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white',
          className
        )}
      >
        <div className="space-y-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {renderIcon()}
              
              <div className="flex-1">
                <Heading 
                  as="h3" 
                  size={variant === 'featured' ? 'lg' : 'md'} 
                  className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2"
                >
                  {category.name}
                </Heading>
              </div>
            </div>

            {category.is_featured && (
              <Badge variant="success">
                {t('featured')}
              </Badge>
            )}
          </div>

          {/* Description */}
          {category.description && (
            <div className="flex-1">
              <Text className="text-gray-600 leading-relaxed line-clamp-3">
                {category.description}
              </Text>
            </div>
          )}

          {/* Stats */}
          {showStats && (
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                {category.articles && category.articles.length > 0 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <Text size="sm">{t('articles')}</Text>
                    </div>
                    <Text size="lg" className="font-bold text-primary-600">
                      {category.articles.length}
                    </Text>
                  </div>
                )}

                {category.slots && category.slots.length > 0 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <Text size="sm">{t('slots')}</Text>
                    </div>
                    <Text size="lg" className="font-bold text-primary-600">
                      {category.slots.length}
                    </Text>
                  </div>
                )}
              </div>

              {totalContent === 0 && (
                <div className="text-center py-2">
                  <Text size="sm" className="text-gray-400">
                    {t('no_content')}
                  </Text>
                </div>
              )}
            </div>
          )}

          {/* Action indicator */}
          <div className="flex items-center justify-between pt-2">
            <Text size="sm" className="text-primary-600 group-hover:text-primary-700 transition-colors">
              {t('view_category')}
            </Text>
            <svg 
              className="w-4 h-4 text-primary-600 group-hover:text-primary-700 group-hover:translate-x-1 transition-all duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
} 