import { getSlots } from '@/services/strapi';
import { Slot } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';
import SlotCard from '@/components/cards/SlotCard.v2';

interface SlotsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: SlotsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('SlotsPage');
  
  const canonicalUrl = getCanonicalUrl(locale, '/slots');
  const alternates = getAlternateUrls('/slots');

  return {
    title: t('title') + ' | Chicken Road Project',
    description: t('description') || 'Best online slots reviews, ratings and where to play them with bonuses.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t('title') + ' | Chicken Road Project',
      description: t('description') || 'Best online slots reviews, ratings and where to play them with bonuses.',
      url: canonicalUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') + ' | Chicken Road Project',
      description: t('description') || 'Best online slots reviews, ratings and where to play them with bonuses.',
    },
  };
}

export default async function SlotsPage(props: SlotsPageProps) {
  const { params } = props;
  const { locale } = await params;
  const t = await getTranslations('SlotsPage');
  
  let slots: Slot[] = [];
  try {
    console.log('Fetching slots for locale:', locale);
    slots = await getSlots(locale);
    console.log('Slots fetched:', slots.length, 'slots');
  } catch (error) {
    console.error('Failed to fetch slots:', error);
    slots = [];
  }

  // Если нет слотов, показываем fallback
  if (slots.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Нет доступных слотов.</p>
            <p className="text-gray-400 text-sm mt-2">Проверьте API: http://localhost:1337/api/slots</p>
          </div>
        </div>
      </div>
    );
  }

  // Сортируем слоты по рейтингу и популярности
  const sortedSlots = [...slots].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const popularSlots = sortedSlots.filter(slot => slot.is_popular);
  const newSlots = sortedSlots.filter(slot => {
    const releaseDate = new Date(slot.release_date);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return releaseDate > sixMonthsAgo;
  });

  // Статистика
  const avgRating = slots.reduce((sum, slot) => sum + (slot.rating || 0), 0) / slots.length;
  const avgRtp = slots.reduce((sum, slot) => sum + (slot.rtp || 0), 0) / slots.length;
  const uniqueProviders = Array.from(new Set(slots.map(slot => slot.provider))).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-purple-800">
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
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">
                {t('badges.newReleases')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md text-sm font-medium">
                {t('badges.popular')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">
                {t('badges.freePlay')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {t('title')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
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
              <div className="text-2xl font-bold text-gray-900">{slots.length}</div>
              <div className="text-sm text-gray-600">{t('stats.totalSlots')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">{t('stats.avgRating')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-2xl font-bold text-gray-900">{avgRtp.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">{t('stats.avgRtp')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-2xl font-bold text-gray-900">{uniqueProviders}</div>
              <div className="text-sm text-gray-600">{t('stats.providers')}</div>
            </div>
          </div>
        </section>

        {/* Popular Slots */}
        {popularSlots.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.popularSlots')}
              </h2>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md text-sm font-medium">
                {t('labels.mostPlayed')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularSlots.slice(0, 8).map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isPopular={true}
                  showProvider={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* New Releases */}
        {newSlots.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.newReleases')}
              </h2>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">
                {t('labels.freshGames')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newSlots.slice(0, 8).map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isNew={true}
                  showProvider={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Slots */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('sections.allSlots')}
            </h2>
            <span className="text-sm text-gray-500">
              {slots.length} {t('labels.gamesAvailable')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSlots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                isNew={newSlots.includes(slot)}
                isPopular={popularSlots.includes(slot)}
                showProvider={true}
              />
            ))}
          </div>
        </section>

        {/* Game Features Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {t('features.title')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('features.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">{t('features.freeSpins')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">{t('features.highRtp')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md text-sm font-medium">{t('features.jackpots')}</span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md text-sm font-medium">{t('features.bonusRounds')}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 