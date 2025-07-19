'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Slot } from '@/types';
import { getStrapiURL } from '@/services/api';
// Временно исключаем все UI компоненты
// import { Heading } from '@/ui/components/atoms';

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

  const { name, provider, rating, cover_image, slug } = slot;
  const imageUrl = cover_image?.url 
    ? getStrapiURL(cover_image.url) 
    : '/placeholder.svg';

  return (
    <Link href={`/slots/${slug}`} className="block group">
      <div className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white rounded-lg border">
        {/* Image */}
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={cover_image?.alternativeText || name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
            {name}
          </h3>
          
          {/* Provider */}
          {showProvider && provider && (
            <p className="text-sm text-gray-600 mb-2">{provider}</p>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Rating:</span>
              <span className="text-sm font-medium">{rating}/5</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 