'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Card } from '@/ui/components/molecules';
import { Button, Heading, Text, StatusBadge, Rating, GradientButton } from '@/ui/components/atoms';
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
    gradient: 'from-yellow-500 to-orange-500',
    badge: 'featured',
    icon: '🎉'
  },
  'deposit': { 
    gradient: 'from-blue-500 to-purple-500',
    badge: 'casino',
    icon: '💰'
  },
  'no-deposit': { 
    gradient: 'from-green-500 to-teal-500',
    badge: 'success',
    icon: '🎁'
  },
  'free-spins': { 
    gradient: 'from-pink-500 to-rose-500',
    badge: 'premium',
    icon: '🎰'
  },
  'cashback': { 
    gradient: 'from-indigo-500 to-blue-500',
    badge: 'premium',
    icon: '🔄'
  },
  'reload': { 
    gradient: 'from-gray-500 to-slate-500',
    badge: 'default',
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

  const isExpired = bonus.valid_until ? new Date(bonus.valid_until) < new Date() : false;
  const expiryDate = bonus.valid_until ? new Date(bonus.valid_until) : null;
  const config = bonusTypeConfig[bonus.bonus_type] || bonusTypeConfig.deposit;

  const formatExpiryDate = (date: Date) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntilExpiry = () => {
    if (!expiryDate) return null;
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilExpiry();

  return (
    <Card 
      variant="casino" 
      padding="none"
      className={cn(
        'group hover:shadow-xl transition-all duration-300 overflow-hidden',
        'border-l-4 bg-gradient-to-br from-white to-gray-50',
        `border-l-${config.gradient.split(' ')[0].replace('from-', '')}`,
        isExpired && 'opacity-60 grayscale',
        featured && 'ring-2 ring-yellow-400 ring-opacity-75',
        className
      )}
    >
      {/* Header with gradient background */}
      <div className={cn(
        'bg-gradient-to-r p-4 text-white relative overflow-hidden',
        config.gradient
      )}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative z-10 flex items-start justify-between">
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
              {isExpired && (
                <StatusBadge variant="error" size="sm">
                  {t('expired')}
                </StatusBadge>
              )}
            </div>
            
            <Heading 
              as="h3" 
              size="lg" 
              className="font-bold text-white line-clamp-2"
            >
              {bonus.name}
            </Heading>
          </div>

          {showCasino && bonus.casino_review?.logo && (
            <div className="flex-shrink-0 ml-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
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
      </div>

      <div className="p-4 space-y-4">
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
                      readonly={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expiry Date with urgency indicator */}
        {expiryDate && !isExpired && (
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
                {t('valid_until', { date: formatExpiryDate(expiryDate) })}
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
          <GradientButton
            variant="casino"
            size="md"
            className="flex-1"
            disabled={isExpired}
            glow={featured}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isExpired) {
                window.location.href = `/bonuses/${bonus.slug}`;
              }
            }}
          >
            {isExpired ? t('expired') : t('view_details')}
          </GradientButton>

          {bonus.casino_review && !isExpired && (
            <Button
              variant="outline"
              size="md"
              className="border-gray-300 hover:border-gray-400"
              onClick={(e) => {
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
    </Card>
  );
} 