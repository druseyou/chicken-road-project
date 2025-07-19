'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button, Heading, Text, Rating } from '@/ui/components/atoms';
import { StatusBadge } from '@/ui/components/atoms/Badge';
import { cn } from '@/ui/utils/cn';
import { Bonus } from '@/types';

interface BonusCardProps {
  bonus: Bonus;
  className?: string;
  showCasino?: boolean;
  featured?: boolean;
}

const bonusTypeConfig = {
  'welcome': { 
    badge: 'featured' as const,
    icon: '🎉'
  },
  'deposit': { 
    badge: 'casino' as const,
    icon: '💰'
  },
  'no-deposit': { 
    badge: 'success' as const,
    icon: '🎁'
  },
  'free-spins': { 
    badge: 'premium' as const,
    icon: '🎰'
  },
  'cashback': { 
    badge: 'premium' as const,
    icon: '🔄'
  },
  'reload': { 
    badge: 'default' as const,
    icon: '⚡'
  },
} as const;

export default function BonusCard({ 
  bonus, 
  className,
  showCasino = true,
  featured = false
}: BonusCardProps) {
  const t = useTranslations('BonusCard');
  
  // State для клієнтських обчислень
  const [isExpired, setIsExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const config = bonusTypeConfig[bonus.bonus_type] || bonusTypeConfig.deposit;

  // Обчислення дат тільки на клієнті
  useEffect(() => {
    setIsClient(true);
    
    if (bonus.valid_until) {
      const expiry = new Date(bonus.valid_until);
      const now = new Date();
      const expired = expiry < now;
      const diffTime = expiry.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setExpiryDate(expiry);
      setIsExpired(expired);
      setDaysLeft(diffDays);
      setFormattedDate(new Intl.DateTimeFormat('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(expiry));
    }
  }, [bonus.valid_until]);

  return (
    <div 
      className={cn(
        // Base card styles
        'rounded-lg p-6 transition-all duration-300 overflow-hidden',
        'bg-white border border-gray-200 shadow-sm hover:shadow-lg',
        // Interactive styles
        'group hover:shadow-xl',
        // Conditional styles
        isClient && isExpired && 'opacity-60 grayscale',
        featured && 'ring-2 ring-yellow-400 ring-opacity-75',
        className
      )}
    >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <StatusBadge variant={config.badge} size="sm">
                {t(`types.${bonus.bonus_type}`)}
              </StatusBadge>
              {featured && (
                <StatusBadge variant="featured" size="sm">
                  {t('featured')}
                </StatusBadge>
              )}
              {isClient && bonus.valid_until && isExpired && (
                <StatusBadge variant="error" size="sm">
                  {t('expired')}
                </StatusBadge>
              )}
            </div>
            
            <Heading 
              as="h3" 
              size="lg" 
              className="font-bold text-gray-900 line-clamp-2"
            >
              {bonus.name}
            </Heading>
          </div>

          {showCasino && bonus.casino_review?.logo && (
            <div className="flex-shrink-0 ml-4">
              <div className="bg-gray-100 rounded-lg p-2">
                <Image
                  src={bonus.casino_review.logo.url}
                  alt={bonus.casino_review.logo.alternativeText || bonus.casino_review.name}
                  width={50}
                  height={35}
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
        {/* Bonus Amount - prominent display */}
        {bonus.bonus_amount && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-center border">
            <Text size="sm" className="mb-1 text-gray-600 uppercase tracking-wide font-medium">
              {t('amount')}
            </Text>
            <Text size="xl" className="font-bold text-gray-900 text-2xl">
              {bonus.bonus_amount}
            </Text>
          </div>
        )}

        {/* Promo Code - enhanced display */}
        {bonus.promo_code && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" className="mb-1 text-amber-700 uppercase tracking-wide font-medium">
                  {t('promo_code')}
                </Text>
                <Text className="font-mono font-bold text-amber-900 text-lg">
                  {bonus.promo_code}
                </Text>
              </div>
              <div className="text-2xl">🎫</div>
            </div>
          </div>
        )}

        {/* Casino Info with Rating */}
        {showCasino && bonus.casino_review && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Text size="sm" className="text-gray-600 mb-1">
                  {t('available_at')}
                </Text>
                <Link 
                  href={`/casino-reviews/${bonus.casino_review.slug}`}
                  className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  {bonus.casino_review.name}
                </Link>
                
                {bonus.casino_review.rating && (
                  <div className="mt-2">
                    <Rating 
                      value={bonus.casino_review.rating} 
                      size="sm" 
                      variant="casino"
                      showValue={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Show fallback when no casino is associated */}
        {showCasino && !bonus.casino_review && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⚠️</span>
              <Text size="sm" className="text-yellow-700">
                {t('no_casino_associated')}
              </Text>
            </div>
          </div>
        )}

        {/* Expiry Date with urgency indicator */}
        {isClient && expiryDate && !isExpired && formattedDate && (
          <div className={cn(
            'flex items-center gap-2 p-3 rounded-lg',
            daysLeft && daysLeft <= 3 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : daysLeft && daysLeft <= 7 
              ? 'bg-orange-50 text-orange-700 border border-orange-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          )}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <Text size="sm" className="font-medium">
                {t('valid_until', { date: formattedDate })}
              </Text>
              {daysLeft && daysLeft <= 7 && (
                <Text size="xs" className="opacity-75">
                  {daysLeft === 1 ? t('expires_tomorrow') : t('expires_in_days', { days: daysLeft })}
                </Text>
              )}
            </div>
            {daysLeft && daysLeft <= 3 && <span className="text-lg">⚠️</span>}
          </div>
        )}

        {/* Action Buttons - enhanced */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="casino"
            size="md"
            className="flex-1"
            disabled={isClient && isExpired}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isClient || !isExpired) {
                window.location.href = `/bonuses/${bonus.slug}`;
              }
            }}
          >
            {isClient && isExpired ? t('expired') : t('view_details')}
          </Button>

          {bonus.casino_review && !(isClient && bonus.valid_until && isExpired) && (
            <Button
              variant="outline"
              size="md"
              className="border-gray-300 hover:border-gray-400"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/casino-reviews/${bonus.casino_review.slug}`;
              }}
            >
              {t('visit_casino')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 