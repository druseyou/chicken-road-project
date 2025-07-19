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
    <Link href={`/casino-reviews/${slug}`} className="block group">
      <Card 
        variant="casino" 
        padding="none"
        className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-l-red-500"
      >
        <div className="lg:flex">
          {/* Левая часть - Ранг и Лого */}
          <div className="lg:w-1/4 p-6 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
            <div className="flex items-center gap-4">
              <StatusBadge variant="casino" size="md">
                #{rank}
              </StatusBadge>
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
                <Heading 
                  as="h3" 
                  size="xl" 
                  className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2"
                >
                  {name}
                </Heading>
                
                <div className="flex items-center gap-2 mb-3">
                  {isFeatured && (
                    <StatusBadge variant="featured" size="sm">
                      ⭐ Featured
                    </StatusBadge>
                  )}
                  {isExclusive && (
                    <StatusBadge variant="exclusive" size="sm">
                      💎 Exclusive
                    </StatusBadge>
                  )}
                </div>
              </div>
            </div>

            {/* Рейтинг */}
            {rating && (
              <div className="mb-4">
                <Rating 
                  value={rating} 
                  size="md" 
                  variant="casino"
                  showValue={true}
                  showLabel={true}
                />
              </div>
            )}

            {/* Статистика */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              <StatCard
                icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>}
                label={t('rtp')}
                value="97.5%"
                variant="compact"
                size="sm"
              />
              <StatCard
                icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                label={t('payout')}
                value="1-3 days"
                variant="compact"
                size="sm"
              />
              <StatCard
                icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>}
                label={t('games')}
                value="1000+"
                variant="compact"
                size="sm"
              />
            </div>
          </div>

          {/* Правая часть - Бонус и кнопки */}
          <div className="lg:w-1/4 p-6 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-between">
            {/* Бонус */}
            {bonus_text && (
              <div className="mb-4">
                <Text size="sm" className="text-green-600 mb-1 font-medium">
                  {t('welcomeBonus')}
                </Text>
                <Text className="font-bold text-green-800 text-lg">
                  {bonus_text}
                </Text>
              </div>
            )}

            {/* Кнопки действий */}
            <div className="space-y-2">
              <Button
                variant="primary"
                size="md"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {t('playNow')}
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full"
              >
                {t('review')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 