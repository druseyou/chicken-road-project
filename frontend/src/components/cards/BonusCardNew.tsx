'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
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
    badge: 'bg-yellow-100 text-yellow-800',
    icon: '🎉'
  },
  'deposit': { 
    badge: 'bg-blue-100 text-blue-800',
    icon: '💰'
  },
  'no-deposit': { 
    badge: 'bg-green-100 text-green-800',
    icon: '🎁'
  },
  'free-spins': { 
    badge: 'bg-purple-100 text-purple-800',
    icon: '🎰'
  },
  'cashback': { 
    badge: 'bg-indigo-100 text-indigo-800',
    icon: '🔄'
  },
  'reload': { 
    badge: 'bg-gray-100 text-gray-800',
    icon: '⚡'
  },
} as const;

export default function BonusCardNew({ 
  bonus, 
  className,
  showCasino = true,
  featured = false
}: BonusCardProps) {
  const t = useTranslations('BonusCard');
  
  // State для клієнтських обчислень
  const [isClient, setIsClient] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const config = bonusTypeConfig[bonus.bonus_type] || bonusTypeConfig.deposit;

  // Обчислення дат тільки на клієнті
  useEffect(() => {
    setIsClient(true);
    
    if (bonus.valid_until) {
      const expiry = new Date(bonus.valid_until);
      const now = new Date();
      const expired = expiry < now;
      
      setIsExpired(expired);
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
            <span className={cn(
              'inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium',
              config.badge
            )}>
              {t(`types.${bonus.bonus_type}`)}
            </span>
            {featured && (
              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                {t('featured')}
              </span>
            )}
            {isClient && bonus.valid_until && isExpired && (
              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                {t('expired')}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {bonus.name}
          </h3>
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
        {/* Bonus Amount */}
        {bonus.bonus_amount && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-center border">
            <p className="text-sm mb-1 text-gray-600 uppercase tracking-wide font-medium">
              {t('amount')}
            </p>
            <p className="font-bold text-gray-900 text-2xl">
              {bonus.bonus_amount}
            </p>
          </div>
        )}

        {/* Promo Code */}
        {bonus.promo_code && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 text-amber-700 uppercase tracking-wide font-medium">
                  {t('promo_code')}
                </p>
                <p className="font-mono font-bold text-amber-900 text-lg">
                  {bonus.promo_code}
                </p>
              </div>
              <div className="text-2xl">🎫</div>
            </div>
          </div>
        )}

        {/* Casino Info */}
        {showCasino && bonus.casino_review && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">
                  {t('available_at')}
                </p>
                <Link 
                  href={`/casino-reviews/${bonus.casino_review.slug}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {bonus.casino_review.name}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Show fallback when no casino is associated */}
        {showCasino && !bonus.casino_review && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⚠️</span>
              <p className="text-sm text-yellow-700">
                {t('no_casino_associated')}
              </p>
            </div>
          </div>
        )}

        {/* Expiry Date */}
        {isClient && bonus.valid_until && !isExpired && formattedDate && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {t('valid_until', { date: formattedDate })}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            className={cn(
              'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
              'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800',
              'shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500',
              (isClient && isExpired) && 'opacity-50 cursor-not-allowed'
            )}
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
          </button>

          {bonus.casino_review && !(isClient && bonus.valid_until && isExpired) && (
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/casino-reviews/${bonus.casino_review.slug}`;
              }}
            >
              {t('visit_casino')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 