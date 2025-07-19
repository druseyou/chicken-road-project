import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Metadata } from 'next';
import { getBonuses } from '@/services/strapi';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import BonusCard from '@/components/cards/BonusCard';
import { Heading, Text } from '@/ui/components/atoms';
import { Bonus, BonusFilters } from '@/types';

interface BonusesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; casino?: string }>;
}

export async function generateMetadata({ 
  params,
  searchParams 
}: BonusesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { type } = await searchParams;
  const t = await getTranslations('BonusesPage');
  
  const title = type 
    ? `${t('title')} - ${t(`types.${type}`)}`
    : t('title');

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

async function BonusesContent({ 
  locale, 
  searchParams 
}: { 
  locale: string; 
  searchParams: { type?: string; casino?: string };
}) {
  const t = await getTranslations('BonusesPage');
  
  // Build filters from search params
  const filters: BonusFilters = {};
  if (searchParams.type) {
    filters.bonus_type = searchParams.type;
  }
  if (searchParams.casino) {
    filters.casino_review = parseInt(searchParams.casino);
  }

  const bonuses = await getBonuses(filters, locale);

  if (!bonuses || bonuses.length === 0) {
    return (
      <div className="text-center py-12">
        <Text size="lg" className="text-gray-600">
          {t('noBonuses')}
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bonuses.map((bonus: Bonus) => (
        <BonusCard 
          key={bonus.id} 
          bonus={bonus}
          showCasino={true}
        />
      ))}
    </div>
  );
}

async function BonusTypeFilter({ currentType }: { currentType?: string }) {
  const t = await getTranslations('BonusesPage');
  
  const bonusTypes = [
    'welcome',
    'deposit', 
    'no-deposit',
    'free-spins',
    'cashback',
    'reload'
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/bonuses"
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !currentType 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('allTypes')}
        </Link>
        
        {bonusTypes.map((type) => (
          <a
            key={type}
            href={`/bonuses?type=${type}`}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentType === type
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`types.${type}`)}
          </a>
        ))}
      </div>
    </div>
  );
}

export default async function BonusesPage({ params, searchParams }: BonusesPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations('BonusesPage');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Heading as="h1" size="2xl" className="font-bold text-gray-900 mb-4">
          {t('title')}
        </Heading>
        <Text size="lg" className="text-gray-600 max-w-2xl">
          {t('description')}
        </Text>
      </div>

      {/* Filters */}
      <BonusTypeFilter currentType={resolvedSearchParams.type} />

      {/* Content */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg" />
          ))}
        </div>
      }>
        <BonusesContent locale={locale} searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
} 