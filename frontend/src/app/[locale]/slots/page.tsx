import { getSlots } from '@/services/strapi';
import DetailedSlotCard from '@/components/cards/DetailedSlotCard';
import { Slot } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
        
        <div>
          {slots && slots.length > 0 ? (
            slots.map((slot: Slot) => (
              <DetailedSlotCard key={slot.id} slot={slot} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Нет доступных слотов.</p>
              <p className="text-gray-400 text-sm mt-2">Проверьте API: http://localhost:1337/api/slots</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 