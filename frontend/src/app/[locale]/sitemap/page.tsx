import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface SitemapPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: SitemapPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('pages');
  
  const canonicalUrl = getCanonicalUrl(locale, '/sitemap');
  const alternates = getAlternateUrls('/sitemap');

  return {
    title: t('sitemap') + ' | Chicken Road Project',
    description: 'Site map for Chicken Road Project - find all pages and sections of our casino review site.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t('sitemap') + ' | Chicken Road Project',
      description: 'Site map for Chicken Road Project - find all pages and sections of our casino review site.',
      url: canonicalUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('sitemap') + ' | Chicken Road Project',
      description: 'Site map for Chicken Road Project - find all pages and sections of our casino review site.',
    },
  };
}

export default function SitemapPage() {
  const t = useTranslations('pages');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('sitemap')}</h1>
      <ul>
        <li><Link href="/">{t('home')}</Link></li>
        <li><Link href="/contacts">{t('contacts')}</Link></li>
        <li><Link href="/privacy-policy">{t('privacy')}</Link></li>
        <li><Link href="/terms-of-use">{t('terms')}</Link></li>
        <li><Link href="/news">{t('news')}</Link></li>
        <li><Link href="/casino-reviews">{t('casino-reviews')}</Link></li>
        <li><Link href="/slots">{t('slots')}</Link></li>
      </ul>
    </div>
  );
} 