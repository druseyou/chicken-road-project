import { getSlotBySlug } from '@/services/strapi';
import { getStrapiURL } from '@/services/api';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface SlotPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: SlotPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const slot = await getSlotBySlug(slug, locale);
  
  if (!slot) {
    return {
      title: 'Slot Not Found | Chicken Road Project',
    };
  }

  const canonicalUrl = getCanonicalUrl(locale, `/slots/${slug}`);
  const currentUrl = getCurrentUrl(locale, `/slots/${slug}`);
  const alternates = getAlternateUrls(`/slots/${slug}`);
  const imageUrl = slot.cover_image?.url ? getStrapiURL(slot.cover_image.url) : undefined;

  return {
    title: `${slot.name} Slot Review | Chicken Road Project`,
    description: slot.description?.slice(0, 160) + '...' || `Play ${slot.name} slot by ${slot.provider}. RTP: ${slot.rtp}%, Volatility: ${slot.volatility}.`,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${slot.name} Slot Review`,
      description: slot.description?.slice(0, 160) + '...' || `Play ${slot.name} slot by ${slot.provider}. RTP: ${slot.rtp}%, Volatility: ${slot.volatility}.`,
      url: currentUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'article',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: slot.cover_image?.alternativeText || `${slot.name} slot`,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${slot.name} Slot Review`,
      description: slot.description?.slice(0, 160) + '...' || `Play ${slot.name} slot by ${slot.provider}. RTP: ${slot.rtp}%, Volatility: ${slot.volatility}.`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function SlotPage({ params }: SlotPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations('SlotPage');
  const slot = await getSlotBySlug(slug, locale);
  if (!slot) notFound();

  const { name, provider, rating, cover_image, features, rtp, volatility, min_bet, max_bet, description } = slot;
  const imageUrl = cover_image?.url ? getStrapiURL(cover_image.url) : '/placeholder.svg';
  const isDemo = name.startsWith('Demo Slot');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status */}
        <div className="inline-flex items-center bg-white rounded-lg shadow-sm px-4 py-2 text-sm mb-6">
          <div className={`w-2 h-2 rounded-full mr-2 ${!isDemo ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-gray-600">
            {!isDemo ? 'Data from API' : 'Demonstration data'}
          </span>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href=".." className="text-blue-600 hover:text-blue-800 transition-colors">
            ← {t('backToSlots')}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{t('provider')}: {provider}</p>
          <div className="flex justify-center items-center mb-4">
            <div className="text-yellow-500 text-2xl mr-3">
              {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
            </div>
            <span className="text-xl font-semibold text-gray-700">{rating.toFixed(1)}/5</span>
          </div>
        </header>

        {/* Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-video bg-gray-200 relative">
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">{t('features')}</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {features && features.length > 0 && features.map((f: string, idx: number) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-2 text-gray-700">
            <p><strong>{t('rtp')}:</strong> {rtp}%</p>
            <p><strong>{t('volatility')}:</strong> {volatility}</p>
            <p><strong>{t('minBet')}:</strong> {min_bet}</p>
            <p><strong>{t('maxBet')}:</strong> {max_bet}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('description')}</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{description}</p>
        </div>

        {/* Play button */}
        <div className="text-center">
          <button className="bg-green-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-green-700 transition-colors text-lg">
            {t('playNow')}
          </button>
        </div>
      </div>
    </div>
  );
} 