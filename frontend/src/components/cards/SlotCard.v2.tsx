import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Slot } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card } from '@/ui/components/molecules';
import { Heading, Text, Button, Rating, StatusBadge, StatCard, GradientButton } from '@/ui/components/atoms';
import { useTranslations } from 'next-intl';

interface SlotCardProps {
  slot: Slot;
  isNew?: boolean;
  isPopular?: boolean;
  showProvider?: boolean;
}

export default function SlotCard({ slot, isNew, isPopular, showProvider }: SlotCardProps) {
  const t = useTranslations('Cards');
  
  if (!slot) {
    return null;
  }

  const { name, description, cover_image, slug, provider, rating, rtp, volatility } = slot;
  const imageUrl = cover_image?.url ? getStrapiURL(cover_image.url) : '/api/placeholder/400/300';

  return (
    <Link href={`/slots/${slug}`} className="block group">
      <Card 
        variant="default" 
        padding="none"
        className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Изображение слота */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={cover_image?.alternativeText || name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Оверлей с бейджами */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute top-3 left-3 flex gap-2">
              {isNew && (
                <StatusBadge variant="new" size="sm">
                  🆕 New
                </StatusBadge>
              )}
              {isPopular && (
                <StatusBadge variant="popular" size="sm">
                  🔥 Hot
                </StatusBadge>
              )}
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="primary"
                size="lg"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
                Play Now
              </Button>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="p-4">
          {/* Заголовок */}
          <div className="mb-3">
            <Heading 
              as="h3" 
              size="lg" 
              className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1 mb-1"
            >
              {name}
            </Heading>
            
            {showProvider && provider && (
              <Text size="sm" className="text-gray-500">
                by {provider}
              </Text>
            )}
          </div>

          {/* Рейтинг */}
          {rating && (
            <div className="mb-3">
                             <Rating 
                value={rating} 
                size="sm" 
                variant="casino"
                showValue={true}
               />
            </div>
          )}

          {/* Описание */}
          {description && (
            <Text size="sm" className="text-gray-600 line-clamp-2 mb-3">
              {description}
            </Text>
          )}

          {/* Статистика */}
          {(rtp || volatility) && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {rtp && (
                <StatCard
                  icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>}
                  label={t('rtp')}
                  value={`${rtp}%`}
                  variant="compact"
                  size="sm"
                />
              )}
              {volatility && (
                <StatCard
                  icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>}
                  label={t('volatility')}
                  value={volatility}
                  variant="compact"
                  size="sm"
                />
              )}
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex gap-2">
            <GradientButton
              variant="casino"
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {t('playFree')}
            </GradientButton>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {t('playReal')}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
} 