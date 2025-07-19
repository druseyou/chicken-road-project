import { getCasinos, getSlots, getArticles } from '@/services/strapi';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/homepage/HeroSection';
import TopCasinosSection from '@/components/homepage/TopCasinosSection';
import FeaturedSlotsSection from '@/components/homepage/FeaturedSlotsSection';
import LatestNewsSection from '@/components/homepage/LatestNewsSection';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('pages');
  
  // Використовуємо відносні URLs для Next.js metadata
  const canonicalPath = '/';
  const currentPath = locale === 'it' ? '/' : `/${locale}`;

  return {
    title: t('home') + ' | Chicken Road Project',
    description: t('homeDescription') || 'Best online casinos and slots reviews. Find top bonuses and games.',
    alternates: {
      canonical: canonicalPath,
      languages: {
        'it': '/',
        'en': '/en',
        'uk': '/uk',
      },
    },
    openGraph: {
      title: t('home') + ' | Chicken Road Project',
      description: t('homeDescription') || 'Best online casinos and slots reviews. Find top bonuses and games.',
      url: currentPath,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home') + ' | Chicken Road Project',
      description: t('homeDescription') || 'Best online casinos and slots reviews. Find top bonuses and games.',
    },
  };
}

export default async function HomePage(props: HomePageProps) {
  const { params } = props;
  const { locale } = await params;
  const t = await getTranslations('pages');

  const [casinos, slots, articles] = await Promise.all([
    getCasinos(locale),
    getSlots(locale),
    getArticles(locale),
  ]);

  return (
    <>
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <TopCasinosSection casinos={casinos.slice(0, 5)} />
        <FeaturedSlotsSection slots={slots.slice(0, 8)} />
        <LatestNewsSection articles={articles.slice(0, 6)} />
      </main>
    </>
  );
} 