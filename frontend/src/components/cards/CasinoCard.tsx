import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Casino } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card } from '@/ui/components/molecules';
import { Heading, Text, Button, Rating, StatusBadge, StatCard } from '@/ui/components/atoms';
import { useTranslations } from 'next-intl';

interface CasinoCardProps {
  casino: Casino;
  rank: number;
  isExclusive?: boolean;
  isFeatured?: boolean;
}

export default function CasinoCard({ casino, rank, isExclusive, isFeatured }: CasinoCardProps) {
  const t = useTranslations('Cards');
  if (!casino) {
    return null;
  }

  const { name, rating, bonus_text, logo, slug } = casino;
  const imageUrl = logo?.url ? getStrapiURL(logo.url) : '/api/placeholder/400/250';

  return (
    <Card 
      variant="casino" 
      padding="none" 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-white to-gray-50"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Левая часть - Ранг и Лого */}
        <div className="lg:w-1/4 p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
              #{rank}
            </div>
            <div className="relative w-20 h-20 lg:w-24 lg:h-24">
              <Image
                src={imageUrl}
                alt={logo?.alternativeText || name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Центральная часть - Основная информация */}
        <div className="lg:w-1/2 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Link href={`/casino-reviews/${slug}`} className="block group">
                <Heading 
                  as="h3" 
                  size="xl" 
                  className="group-hover:text-blue-600 transition-colors font-bold"
                >
                  {name}
                </Heading>
              </Link>
            </div>
            
            {/* Статус бейджи */}
            <div className="flex gap-2 flex-wrap">
              {isExclusive && (
                <StatusBadge variant="exclusive" size="sm">
                  Exclusive
                </StatusBadge>
              )}
              {isFeatured && (
                <StatusBadge variant="featured" size="sm">
                  Featured
                </StatusBadge>
              )}
              {rank <= 3 && (
                <StatusBadge variant="popular" size="sm">
                  Top {rank}
                </StatusBadge>
              )}
            </div>
          </div>

          {/* Рейтинг */}
          <div className="mb-4">
            <Rating 
              value={rating || 0} 
              variant="casino" 
              showValue={true}
              showLabel={true}
              size="md"
            />
          </div>

          {/* Бонус */}
          <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <Text weight="semibold" className="text-gray-900 mb-1">
              Welcome Bonus
            </Text>
            <Text size="sm" className="text-orange-700">
              {bonus_text}
            </Text>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <StatCard
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>}
              label="RTP"
              value="97.5%"
              variant="compact"
              size="sm"
            />
            <StatCard
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
              label="Payout"
              value="1-3 days"
              variant="compact"
              size="sm"
            />
            <StatCard
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>}
              label="Games"
              value="1000+"
              variant="compact"
              size="sm"
            />
          </div>
        </div>

        {/* Правая часть - CTA */}
        <div className="lg:w-1/4 p-6 bg-gradient-to-br from-red-50 to-orange-50 border-t lg:border-t-0 lg:border-l border-red-100">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                #{rank}
              </div>
              <Text size="sm" color="muted" className="uppercase tracking-wide">
                {t('bestCasino')}
              </Text>
            </div>
            
            <Link href={`/casino-reviews/${slug}`} className="w-full">
              <Button 
                variant="casino" 
                className="w-full py-3 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {t('getBonus')}
              </Button>
            </Link>
            
            <Link 
              href={`/casino-reviews/${slug}`} 
              className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              {t('readReview')}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
} 