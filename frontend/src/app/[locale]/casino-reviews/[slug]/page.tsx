import { getCasinoBySlug } from '@/services/strapi';
import { getStrapiURL } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface CasinoReviewPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CasinoReviewPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const casino = await getCasinoBySlug(slug);
  
  if (!casino) {
    return {
      title: 'Casino Review Not Found | Chicken Road Project',
    };
  }

  const canonicalUrl = getCanonicalUrl(locale, `/casino-reviews/${slug}`);
  const alternates = getAlternateUrls(`/casino-reviews/${slug}`);
  const imageUrl = casino.logo?.url ? getStrapiURL(casino.logo.url) : undefined;

  return {
    title: `${casino.name} Review | Chicken Road Project`,
    description: casino.detailed_review?.slice(0, 160) + '...' || `Complete review of ${casino.name} casino with bonuses, games and ratings.`,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${casino.name} Review`,
      description: casino.detailed_review?.slice(0, 160) + '...' || `Complete review of ${casino.name} casino with bonuses, games and ratings.`,
      url: canonicalUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'article',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: casino.logo?.alternativeText || `${casino.name} logo`,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${casino.name} Review`,
      description: casino.detailed_review?.slice(0, 160) + '...' || `Complete review of ${casino.name} casino with bonuses, games and ratings.`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function CasinoReviewPage({ params }: CasinoReviewPageProps) {
  const { slug } = await params;
  const t = await getTranslations('CasinoReviewPage');
  const casino = await getCasinoBySlug(slug);

  if (!casino) {
    notFound();
  }

  const { name, rating, bonus_text, logo, license, detailed_review, pros, cons } = casino;
  const imageUrl = logo?.url ? getStrapiURL(logo.url) : '/placeholder.svg';

  // Check if this is demo data
  const isDemoData = name.startsWith('Demo Casino') || name.startsWith('Demo Lucky');

  // Debug: Log the structure of pros and cons
  console.log('Casino data debug:', {
    name,
    prosType: typeof pros,
    prosValue: pros,
    consType: typeof cons,
    consValue: cons,
    prosIsArray: Array.isArray(pros),
    consIsArray: Array.isArray(cons)
  });

  // Safely handle pros and cons - ensure they are arrays
  const safeProsList = Array.isArray(pros) ? pros : 
                      typeof pros === 'string' ? (pros as string).split('\n').filter((p: string) => p.trim()) :
                      pros ? [String(pros)] : [];
  
  const safeConsList = Array.isArray(cons) ? cons : 
                      typeof cons === 'string' ? (cons as string).split('\n').filter((c: string) => c.trim()) :
                      cons ? [String(cons)] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Status indicator */}
        <div className="inline-flex items-center bg-white rounded-lg shadow-sm px-4 py-2 text-sm mb-6">
          <div className={`w-2 h-2 rounded-full mr-2 ${!isDemoData ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-gray-600">
            {!isDemoData ? 'Data from API' : 'Demonstration data'}
          </span>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href=".." className="text-blue-600 hover:text-blue-800 transition-colors">
            ← {t('backToCasinos')}
          </Link>
        </nav>

        {/* Casino Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="w-32 h-32 relative flex-shrink-0">
              <Image
                src={imageUrl}
                alt={logo?.alternativeText || name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 text-2xl mr-3">
                  {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
                </div>
                <span className="text-xl font-semibold text-gray-700">{rating.toFixed(1)}/5</span>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">{t('bonus')}</h3>
                <p className="text-blue-800 text-lg font-bold">{bonus_text}</p>
              </div>
              
              <div className="text-gray-600">
                <strong>{t('license')}:</strong> {license?.name || 'N/A'}
              </div>
            </div>
            
            <div className="flex flex-col gap-4 lg:w-48">
              <button className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg">
                {t('playNow')}
              </button>
            </div>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-4">{t('pros')}</h2>
            {safeProsList.length > 0 ? (
              <ul className="space-y-2">
                {safeProsList.map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Нет доступных преимуществ</p>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">{t('cons')}</h2>
            {safeConsList.length > 0 ? (
              <ul className="space-y-2">
                {safeConsList.map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Нет доступных недостатков</p>
            )}
          </div>
        </div>

        {/* Review Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('detailedReview')}</h2>
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {detailed_review}
            </div>
          </div>
        </div>

        {/* Back to Casinos */}
        <div className="text-center">
          <Link 
            href=".." 
            className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('backToCasinos')}
          </Link>
        </div>
      </div>
    </div>
  );
} 