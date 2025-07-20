import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getBonusBySlug } from '@/services/strapi';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Heading, Text, Button } from '@/ui/components/atoms';
import { Card } from '@/ui/components/molecules';
import { cn } from '@/ui/utils/cn';
import { Bonus } from '@/types';
import { CopyButton } from '@/ui/components/atoms/CopyButton';

interface BonusPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ 
  params 
}: BonusPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const bonus = await getBonusBySlug(slug, locale);
  
  if (!bonus) {
    return {
      title: 'Bonus Not Found | Chicken Road Project'
    };
  }

  const canonicalUrl = getCanonicalUrl(locale, `/bonuses/${slug}`);
  const currentUrl = getCurrentUrl(locale, `/bonuses/${slug}`);
  const alternates = getAlternateUrls(`/bonuses/${slug}`);

  return {
    title: `${bonus.meta_title || bonus.name} | Chicken Road Project`,
    description: bonus.meta_description || `${bonus.name} - ${bonus.bonus_amount || 'Exclusive bonus'}`,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: bonus.name,
      description: bonus.meta_description || `${bonus.name} - ${bonus.bonus_amount || 'Exclusive bonus'}`,
      url: currentUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: bonus.name,
      description: bonus.meta_description || `${bonus.name} - ${bonus.bonus_amount || 'Exclusive bonus'}`,
    },
  };
}

const bonusTypeColors = {
  'welcome': 'bg-gradient-to-r from-yellow-500 to-orange-500',
  'deposit': 'bg-gradient-to-r from-blue-500 to-purple-500',
  'no-deposit': 'bg-gradient-to-r from-green-500 to-teal-500',
  'free-spins': 'bg-gradient-to-r from-pink-500 to-rose-500',
  'cashback': 'bg-gradient-to-r from-indigo-500 to-blue-500',
  'reload': 'bg-gradient-to-r from-gray-500 to-slate-500',
} as const;

export default async function BonusPage({ params }: BonusPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('BonusPage');
  const bonus = await getBonusBySlug(slug, locale);

  if (!bonus) {
    notFound();
  }

  const isExpired = bonus.valid_until ? new Date(bonus.valid_until) < new Date() : false;
  const expiryDate = bonus.valid_until ? new Date(bonus.valid_until) : null;

  const formatExpiryDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary-600">
            {t('home')}
          </Link>
          <span>/</span>
          <Link href="/bonuses" className="hover:text-primary-600">
            {t('bonuses')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{bonus.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <Heading as="h1" size="2xl" className="font-bold text-gray-900 mb-2">
                  {bonus.name}
                </Heading>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white',
                    bonusTypeColors[bonus.bonus_type] || bonusTypeColors.deposit
                  )}>
                    {t(`types.${bonus.bonus_type}`)}
                  </span>
                  
                  {isExpired && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      {t('expired')}
                    </span>
                  )}
                </div>
              </div>

              {bonus.casino_review?.logo && (
                <div className="flex-shrink-0">
                  <Image
                    src={bonus.casino_review.logo.url}
                    alt={bonus.casino_review.logo.alternativeText || bonus.casino_review.name}
                    width={100}
                    height={60}
                    className="object-contain rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Casino Info */}
            {bonus.casino_review && (
              <Card variant="default" padding="lg" className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="sm" className="text-gray-600 mb-1">
                      {t('availableAt')}
                    </Text>
                    <Heading as="h3" size="lg" className="font-bold text-gray-900">
                      {bonus.casino_review.name}
                    </Heading>
                    
                    {bonus.casino_review.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={cn(
                                'w-5 h-5',
                                i < Math.floor(bonus.casino_review.rating) 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-300'
                              )}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <Text size="sm" className="text-gray-600 ml-1">
                          {bonus.casino_review.rating.toFixed(1)}/10
                        </Text>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    disabled={isExpired}
                    asChild
                  >
                    <Link href={`/casino-reviews/${bonus.casino_review.slug}`}>
                      {t('visitCasino')}
                    </Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Terms and Conditions */}
          {bonus.terms && (
            <Card variant="default" padding="lg" className="mb-6">
              <Heading as="h3" size="lg" className="font-bold text-gray-900 mb-4">
                {t('termsAndConditions')}
              </Heading>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: bonus.terms }}
              />
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Bonus Details */}
          <Card variant="casino" padding="lg">
            <Heading as="h3" size="lg" className="font-bold text-gray-900 mb-4">
              {t('bonusDetails')}
            </Heading>

            <div className="space-y-4">
              {/* Bonus Amount */}
              {bonus.bonus_amount && (
                <div>
                  <Text size="sm" className="text-gray-600 mb-1">
                    {t('amount')}
                  </Text>
                  <Text size="xl" className="font-bold text-primary-600">
                    {bonus.bonus_amount}
                  </Text>
                </div>
              )}

              {/* Promo Code */}
              {bonus.promo_code && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <Text size="sm" className="text-gray-600 mb-1">
                    {t('promoCode')}
                  </Text>
                  <div className="flex items-center justify-between">
                    <Text className="font-mono font-bold text-yellow-800">
                      {bonus.promo_code}
                    </Text>
                    <CopyButton text={bonus.promo_code} />
                  </div>
                </div>
              )}

              {/* Wagering Requirements */}
              {bonus.wagering_requirements && (
                <div>
                  <Text size="sm" className="text-gray-600 mb-1">
                    {t('wageringRequirements')}
                  </Text>
                  <Text className="font-medium text-gray-900">
                    {bonus.wagering_requirements}
                  </Text>
                </div>
              )}

              {/* Expiry Date */}
              {expiryDate && (
                <div>
                  <Text size="sm" className="text-gray-600 mb-1">
                    {t('validUntil')}
                  </Text>
                  <Text className={cn(
                    'font-medium',
                    isExpired ? 'text-red-600' : 'text-gray-900'
                  )}>
                    {formatExpiryDate(expiryDate)}
                  </Text>
                </div>
              )}
            </div>
          </Card>

          {/* Action Button */}
          <Card variant="default" padding="lg">
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isExpired}
                asChild
              >
                <Link href={bonus.casino_review ? `/casino-reviews/${bonus.casino_review.slug}` : '#'}>
                  {isExpired ? t('expired') : t('claimBonus')}
                </Link>
              </Button>
              
              {!isExpired && (
                <Text size="sm" className="text-gray-500 mt-2">
                  {t('termsApply')}
                </Text>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 