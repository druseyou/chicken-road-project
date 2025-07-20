import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getBonuses } from '@/services/strapi';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import BonusCard from '@/components/cards/BonusCard';
import { Bonus } from '@/types';

interface BonusesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ 
  params
}: BonusesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('BonusesPage');
  
  const title = t('title');
  const canonicalUrl = getCanonicalUrl(locale, '/bonuses');
  const currentUrl = getCurrentUrl(locale, '/bonuses');
  const alternates = getAlternateUrls('/bonuses');
  
  return {
    title: `${title} | Chicken Road Project`,
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${title} | Chicken Road Project`,
      description: t('description'),
      url: currentUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Chicken Road Project`,
      description: t('description'),
    },
  };
}

export default async function BonusesPage(props: BonusesPageProps) {
  const { params } = props;
  const { locale } = await params;
  const t = await getTranslations('BonusesPage');
  
  let bonuses: Bonus[] = [];
  try {
    console.log('Fetching bonuses for locale:', locale);
    bonuses = await getBonuses({}, locale);
    console.log('Bonuses fetched:', bonuses.length, 'bonuses');
  } catch (error) {
    console.error('Failed to fetch bonuses:', error);
    bonuses = [];
  }

  // Если нет бонусов, показываем fallback
  if (bonuses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Нет доступных бонусов.</p>
            <p className="text-gray-400 text-sm mt-2">Проверьте API: http://localhost:1337/api/bonuses</p>
          </div>
        </div>
      </div>
    );
  }

  // Группируем бонусы по типам
  const welcomeBonuses = bonuses.filter(bonus => bonus.bonus_type === 'welcome');
  const freeSpinsBonuses = bonuses.filter(bonus => bonus.bonus_type === 'free-spins');
  const noDepositBonuses = bonuses.filter(bonus => bonus.bonus_type === 'no-deposit');
  const otherBonuses = bonuses.filter(bonus => 
    !['welcome', 'free-spins', 'no-deposit'].includes(bonus.bonus_type)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-green-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badges */}
            <div className="flex justify-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg text-sm font-medium">
                {t('badges.welcome')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">
                {t('badges.noDeposit')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">
                {t('badges.freeSpins')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {t('title')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">🎁</div>
              <div className="text-2xl font-bold text-gray-900">{bonuses.length}</div>
              <div className="text-sm text-gray-600">{t('stats.totalBonuses')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-2xl font-bold text-gray-900">{welcomeBonuses.length}</div>
              <div className="text-sm text-gray-600">{t('stats.welcome')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">🆓</div>
              <div className="text-2xl font-bold text-gray-900">{noDepositBonuses.length}</div>
              <div className="text-sm text-gray-600">{t('stats.noDeposit')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">🎰</div>
              <div className="text-2xl font-bold text-gray-900">{freeSpinsBonuses.length}</div>
              <div className="text-sm text-gray-600">{t('stats.freeSpins')}</div>
            </div>
          </div>
        </section>

        {/* Welcome Bonuses */}
        {welcomeBonuses.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.welcomeBonuses')}
              </h2>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg text-sm font-medium">
                {t('labels.bestValue')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {welcomeBonuses.map((bonus) => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus}
                  showCasino={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Deposit Bonuses */}
        {noDepositBonuses.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.noDepositBonuses')}
              </h2>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">
                {t('labels.riskFree')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noDepositBonuses.map((bonus) => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus}
                  showCasino={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Free Spins */}
        {freeSpinsBonuses.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.freeSpins')}
              </h2>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">
                {t('labels.playFree')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeSpinsBonuses.map((bonus) => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus}
                  showCasino={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Other Bonuses */}
        {otherBonuses.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.otherBonuses')}
              </h2>
              <span className="text-sm text-gray-500">
                {otherBonuses.length} {t('labels.moreOffers')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherBonuses.map((bonus) => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus}
                  showCasino={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Bonus Terms Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {t('terms.title')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('terms.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md text-sm font-medium">{t('terms.tcApply')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg text-sm font-medium">{t('terms.wagering')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">{t('terms.timeLimits')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">{t('terms.ageRestriction')}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 