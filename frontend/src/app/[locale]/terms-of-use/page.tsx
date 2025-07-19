import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface TermsOfUsePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: TermsOfUsePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('pages');
  
  const canonicalUrl = getCanonicalUrl(locale, '/terms-of-use');
  const alternates = getAlternateUrls('/terms-of-use');

  return {
    title: t('terms') + ' | Chicken Road Project',
    description: 'Terms of use for Chicken Road Project - rules and conditions for using our casino review site.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t('terms') + ' | Chicken Road Project',
      description: 'Terms of use for Chicken Road Project - rules and conditions for using our casino review site.',
      url: canonicalUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('terms') + ' | Chicken Road Project',
      description: 'Terms of use for Chicken Road Project - rules and conditions for using our casino review site.',
    },
  };
}

export default function TermsOfUsePage() {
  const t = useTranslations('pages');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('terms')}</h1>
      <p>Content for Terms of Use page.</p>
    </div>
  );
} 