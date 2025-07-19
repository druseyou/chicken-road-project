'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Card } from '@/ui/components/molecules';
import { Button, Heading, Text } from '@/ui/components/atoms';
import { cn } from '@/ui/utils/cn';
import { Bonus } from '@/types';

interface BonusCardProps {
  bonus: Bonus;
  className?: string;
  showCasino?: boolean;
}

const bonusTypeColors = {
  'welcome': 'bg-gradient-to-r from-yellow-500 to-orange-500',
  'deposit': 'bg-gradient-to-r from-blue-500 to-purple-500',
  'no-deposit': 'bg-gradient-to-r from-green-500 to-teal-500',
  'free-spins': 'bg-gradient-to-r from-pink-500 to-rose-500',
  'cashback': 'bg-gradient-to-r from-indigo-500 to-blue-500',
  'reload': 'bg-gradient-to-r from-gray-500 to-slate-500',
} as const;

export default function BonusCard({ 
  bonus, 
  className,
  showCasino = true 
}: BonusCardProps) {
  const t = useTranslations('BonusCard');

  const isExpired = bonus.valid_until ? new Date(bonus.valid_until) < new Date() : false;
  const expiryDate = bonus.valid_until ? new Date(bonus.valid_until) : null;

  const formatExpiryDate = (date: Date) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card 
      variant="casino" 
      padding="lg"
      className={cn(
        'group hover:shadow-lg transition-all duration-300 border-l-4',
        bonusTypeColors[bonus.bonus_type] || bonusTypeColors.deposit,
        isExpired && 'opacity-60 grayscale',
        className
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Heading 
              as="h3" 
              size="lg" 
              className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2"
            >
              {bonus.name}
            </Heading>
            
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white',
                bonusTypeColors[bonus.bonus_type] || bonusTypeColors.deposit
              )}>
                {t(`types.${bonus.bonus_type}`)}
              </span>
              
              {isExpired && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {t('expired')}
                </span>
              )}
            </div>
          </div>

          {showCasino && bonus.casino_review?.logo && (
            <div className="flex-shrink-0 ml-4">
              <Image
                src={bonus.casino_review.logo.url}
                alt={bonus.casino_review.logo.alternativeText || bonus.casino_review.name}
                width={60}
                height={40}
                className="object-contain rounded-md"
              />
            </div>
          )}
        </div>

        {/* Bonus Amount */}
        {bonus.bonus_amount && (
          <div className="bg-gray-50 rounded-lg p-3">
            <Text size="sm" className="mb-1 text-gray-600">
              {t('amount')}
            </Text>
            <Text size="xl" className="font-bold text-primary-600">
              {bonus.bonus_amount}
            </Text>
          </div>
        )}

        {/* Promo Code */}
        {bonus.promo_code && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <Text size="sm" className="mb-1 text-gray-600">
              {t('promo_code')}
            </Text>
            <Text className="font-mono font-bold text-yellow-800">
              {bonus.promo_code}
            </Text>
          </div>
        )}

        {/* Casino Info */}
        {showCasino && bonus.casino_review && (
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <div className="flex-1">
              <Text size="sm" className="text-gray-600">
                {t('available_at')}
              </Text>
              <Link 
                href={`/casino-reviews/${bonus.casino_review.slug}`}
                className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                {bonus.casino_review.name}
              </Link>
              
              {bonus.casino_review.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < Math.floor(bonus.casino_review.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <Text size="sm" className="text-gray-600">
                    {bonus.casino_review.rating.toFixed(1)}
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expiry Date */}
        {expiryDate && !isExpired && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('valid_until', { date: formatExpiryDate(expiryDate) })}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            disabled={isExpired}
            asChild
          >
            <Link href={`/bonuses/${bonus.slug}`}>
              {isExpired ? t('expired') : t('view_details')}
            </Link>
          </Button>

          {bonus.casino_review && !isExpired && (
            <Button
              variant="secondary"
              size="sm"
              asChild
            >
              <Link href={`/casino-reviews/${bonus.casino_review.slug}`}>
                {t('visit_casino')}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
} 