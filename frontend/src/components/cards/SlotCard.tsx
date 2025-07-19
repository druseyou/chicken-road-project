'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Slot } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent } from '@/ui/components/molecules';
import { Heading, StatusBadge, Rating, StatCard, GradientButton } from '@/ui/components/atoms';

interface SlotCardProps {
  slot: Slot;
  featured?: boolean;
  showProvider?: boolean;
}

export default function SlotCard({ 
  slot, 
  featured = false,
  showProvider = true 
}: SlotCardProps) {
  if (!slot) {
    return null;
  }

  const { name, provider, rating, cover_image, slug, rtp, volatility, max_win } = slot;
  const imageUrl = cover_image?.url 
    ? getStrapiURL(cover_image.url) 
    : '/placeholder.svg';

  const getVolatilityLabel = (vol: string) => {
    const volatilityMap: Record<string, { label: string; color: string }> = {
      'low': { label: 'Низька', color: 'success' },
      'medium': { label: 'Середня', color: 'warning' },
      'high': { label: 'Висока', color: 'error' },
    };
    return volatilityMap[vol] || { label: vol, color: 'default' };
  };

  const getPopularityBadge = () => {
    if (rating >= 4.5) return 'popular';
    if (featured) return 'featured';
    return null;
  };

  const popularityBadge = getPopularityBadge();
  const volatilityInfo = volatility ? getVolatilityLabel(volatility) : null;

  return (
    <Link href={`/slots/${slug}`} className="block group">
      <Card 
        variant="slot" 
        padding="none" 
        className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
          featured ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
        }`}
      >
        {/* Image with overlay */}
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={cover_image?.alternativeText || name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {popularityBadge && (
              <StatusBadge 
                variant={popularityBadge === 'popular' ? 'popular' : 'featured'} 
                size="sm"
              >
                {popularityBadge === 'popular' ? '🔥 Popular' : '⭐ Featured'}
              </StatusBadge>
            )}
          </div>

          {/* Provider badge */}
          {showProvider && provider && (
            <div className="absolute top-3 right-3">
              <StatusBadge variant="default" size="sm" className="bg-white/90 text-gray-800">
                {provider}
              </StatusBadge>
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title and Rating */}
          <div className="mb-3">
            <Heading 
              as="h3" 
              size="lg" 
              className="line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors"
            >
              {name}
            </Heading>
            
            {rating && (
              <Rating 
                value={rating} 
                size="sm" 
                variant="casino"
                showValue={true}
                readonly={true}
              />
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {rtp && (
              <StatCard
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                label="RTP"
                value={`${rtp}%`}
                variant="compact"
                size="sm"
              />
            )}
            
            {volatilityInfo && (
              <StatCard
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                label="Волатильність"
                value={volatilityInfo.label}
                variant="compact"
                size="sm"
              />
            )}
            
            {max_win && (
              <StatCard
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                label="Макс виграш"
                value={String(max_win)}
                variant="compact"
                size="sm"
              />
            )}
            
            <StatCard
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              label="Тип"
              value="Video Slot"
              variant="compact"
              size="sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <GradientButton
              variant="casino"
              size="sm"
              className="flex-1"
              glow={featured}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/slots/${slug}`;
              }}
            >
              🎰 Грати
            </GradientButton>
            
            <GradientButton
              variant="premium"
              size="sm"
              className="px-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle favorite logic here
              }}
            >
              ❤️
            </GradientButton>
          </div>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Безкоштовна демо-версія</span>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Швидкий старт</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 