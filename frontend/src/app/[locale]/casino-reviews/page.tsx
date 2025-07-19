import { getCasinos } from '@/services/strapi';
import DetailedCasinoCard from '@/components/cards/DetailedCasinoCard';
import { Casino } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';
import Head from 'next/head';

interface CasinoReviewsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CasinoReviewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('CasinoReviewsPage');
  
  // Використовуємо відносні URLs для Next.js metadata
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
  
  // Генеруємо canonical URLs
  const canonicalUrl = getCanonicalUrl(locale, '/casino-reviews');
  const alternates = getAlternateUrls('/casino-reviews');
  
  let casinos: Casino[] = [];
  try {
    console.log('Fetching casinos for locale:', locale);
    casinos = await getCasinos(locale);
    console.log('Casinos fetched:', casinos.length, 'casinos');
  } catch (error) {
    console.error('Failed to fetch casinos:', error);
  }

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        {Object.entries(alternates).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
          
          <div>
            {casinos && casinos.length > 0 ? (
              casinos.map((casino: Casino) => (
                <DetailedCasinoCard key={casino.id} casino={casino} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Нет доступных казино.</p>
                <p className="text-gray-400 text-sm mt-2">Проверьте API: http://localhost:1337/api/casino-reviews</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 