import { getCasinos } from '@/services/strapi';
import { Casino } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';
import CasinoCard from '@/components/cards/CasinoCard.v2';

interface CasinoReviewsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CasinoReviewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('CasinoReviewsPage');
  
  // Используем относительные URLs для Next.js metadata
  const canonicalPath = '/casino-reviews';
  const currentPath = locale === 'it' ? '/casino-reviews' : `/${locale}/casino-reviews`;

  return {
    title: t('title') + ' | Chicken Road Project',
    description: t('description') || 'Comprehensive reviews of the best online casinos with bonuses and ratings.',
    alternates: {
      canonical: canonicalPath,
      languages: {
        'it': '/casino-reviews',
        'en': '/en/casino-reviews', 
        'uk': '/uk/casino-reviews',
      },
    },
    openGraph: {
      title: t('title') + ' | Chicken Road Project',
      description: t('description') || 'Comprehensive reviews of the best online casinos with bonuses and ratings.',
      url: currentPath,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') + ' | Chicken Road Project',
      description: t('description') || 'Comprehensive reviews of the best online casinos with bonuses and ratings.',
    },
  };
}

export default async function CasinoReviewsPage(props: CasinoReviewsPageProps) {
  const { params } = props;
  const { locale } = await params;
  const t = await getTranslations('CasinoReviewsPage');
  
  let casinos: Casino[] = [];
  try {
    console.log('Fetching casinos for locale:', locale);
    casinos = await getCasinos(locale);
    console.log('Casinos fetched:', casinos.length, 'casinos');
  } catch (error) {
    console.error('Failed to fetch casinos:', error);
    casinos = [];
  }

  // Если нет казино, показываем fallback
  if (casinos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Нет доступных казино.</p>
            <p className="text-gray-400 text-sm mt-2">Проверьте API: http://localhost:1337/api/casino-reviews</p>
          </div>
        </div>
      </div>
    );
  }

  // Сортируем казино по рейтингу для ранкинга
  const rankedCasinos = [...casinos].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const topCasinos = rankedCasinos.slice(0, 5);
  const otherCasinos = rankedCasinos.slice(5);

  // Статистика
  const avgRating = casinos.reduce((sum, casino) => sum + (casino.rating || 0), 0) / casinos.length;
  const topRatedCount = casinos.filter(casino => (casino.rating || 0) >= 4.5).length;
  const highRtpCount = casinos.filter(casino => (casino.rtp || 0) >= 97).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-800 to-red-800">
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
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">
                {t('badges.topRated')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg text-sm font-medium">
                {t('badges.expertChoice')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">
                {t('badges.verified')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {t('title')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
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
              <div className="text-2xl mb-2">🎰</div>
              <div className="text-2xl font-bold text-gray-900">{casinos.length}</div>
              <div className="text-sm text-gray-600">{t('stats.totalCasinos')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">{t('stats.avgRating')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-gray-900">{topRatedCount}</div>
              <div className="text-sm text-gray-600">{t('stats.topRated')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">💎</div>
              <div className="text-2xl font-bold text-gray-900">{highRtpCount}</div>
              <div className="text-sm text-gray-600">{t('stats.highRtp')}</div>
            </div>
          </div>
        </section>

        {/* Top 5 Casinos */}
        {topCasinos.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.topCasinos')}
              </h2>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">
                {t('badges.expertChoice')}
              </span>
            </div>

            <div className="space-y-6">
              {topCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={casino}
                  rank={index + 1}
                  isFeatured={index < 3}
                  isExclusive={casino.bonus_text?.toLowerCase().includes('exclusive') || false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Other Casinos */}
        {otherCasinos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.allCasinos')}
              </h2>
              <span className="text-sm text-gray-500">
                {casinos.length} {t('stats.totalCasinos').toLowerCase()}
              </span>
            </div>

            <div className="space-y-6">
              {otherCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={casino}
                  rank={index + 6}
                  isFeatured={false}
                  isExclusive={casino.bonus_text?.toLowerCase().includes('exclusive') || false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Trust & Safety Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {t('safety.title')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('safety.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg text-sm font-medium">{t('safety.licensed')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">{t('safety.secured')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">{t('safety.fairPlay')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md text-sm font-medium">{t('safety.verified')}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 