import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface PrivacyPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('pages');
  
  const canonicalUrl = getCanonicalUrl(locale, '/privacy-policy');
  const alternates = getAlternateUrls('/privacy-policy');

  return {
    title: t('privacy') + ' | Chicken Road Project',
    description: 'Privacy policy for Chicken Road Project - how we handle your personal information.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t('privacy') + ' | Chicken Road Project',
      description: 'Privacy policy for Chicken Road Project - how we handle your personal information.',
      url: canonicalUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('privacy') + ' | Chicken Road Project',
      description: 'Privacy policy for Chicken Road Project - how we handle your personal information.',
    },
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('pages');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('privacy')}</h1>
      <p>Content for Privacy Policy page.</p>
    </div>
  );
} 