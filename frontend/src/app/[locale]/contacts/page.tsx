import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface ContactsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('pages');
  
  const canonicalUrl = getCanonicalUrl(locale, '/contacts');
  const alternates = getAlternateUrls('/contacts');

  return {
    title: t('contacts') + ' | Chicken Road Project',
    description: 'Contact us for questions about casino reviews, slots and gambling information.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t('contacts') + ' | Chicken Road Project',
      description: 'Contact us for questions about casino reviews, slots and gambling information.',
      url: canonicalUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contacts') + ' | Chicken Road Project',
      description: 'Contact us for questions about casino reviews, slots and gambling information.',
    },
  };
}

export default function ContactsPage() {
  const t = useTranslations('pages');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('contacts')}</h1>
      <p>Content for Contacts page.</p>
    </div>
  );
} 