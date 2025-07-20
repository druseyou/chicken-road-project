import { getTranslations } from 'next-intl/server';
import { Bonus } from '@/types';

interface ServerBonusCardProps {
  bonus: Bonus;
  showCasino?: boolean;
  locale: string;
}

export default async function ServerBonusCard({ bonus, showCasino = true, locale }: ServerBonusCardProps) {
  const t = await getTranslations('SimpleBonusCard');

  return (
    <div className="rounded-lg p-6 transition-all duration-300 overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg group hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {bonus.bonus_type === 'welcome' && '🎉'}
              {bonus.bonus_type === 'deposit' && '💰'}
              {bonus.bonus_type === 'no-deposit' && '🎁'}
              {bonus.bonus_type === 'free-spins' && '🎰'}
              {bonus.bonus_type === 'cashback' && '🔄'}
              {bonus.bonus_type === 'reload' && '⚡'}
            </span>
            <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {bonus.bonus_type.charAt(0).toUpperCase() + bonus.bonus_type.slice(1).replace('-', ' ')}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {bonus.name}
          </h3>
        </div>

        {showCasino && bonus.casino_review?.logo && (
          <div className="flex-shrink-0 ml-4">
            <div className="bg-gray-100 rounded-lg p-2">
              <img
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
              {t('bonusAmount')}
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
                  {t('promoCode')}
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
                  {t('availableAt')}
                </p>
                <a 
                  href={`/casino-reviews/${bonus.casino_review.slug}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {bonus.casino_review.name}
                </a>
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
                {t('casinoNotSpecified')}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <a
            href={`/bonuses/${bonus.slug}`}
            className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-center block"
          >
            {t('viewDetails')}
          </a>

          {bonus.casino_review && (
            <a
              href={`/casino-reviews/${bonus.casino_review.slug}`}
              className="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 text-center block"
            >
              {t('visitCasino')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 