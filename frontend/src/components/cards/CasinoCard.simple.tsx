import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Casino } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card } from '@/ui/components/molecules';
import { Heading, Text, Button } from '@/ui/components/atoms';

interface CasinoCardProps {
  casino: Casino;
  rank: number;
  isExclusive?: boolean;
  isFeatured?: boolean;
}

export default function CasinoCard({ casino, rank, isExclusive, isFeatured }: CasinoCardProps) {
  if (!casino) {
    return null;
  }

  const { name, rating, bonus_text, logo, slug } = casino;
  const imageUrl = logo?.url ? getStrapiURL(logo.url) : '/api/placeholder/400/250';

  return (
    <Link href={`/casino-reviews/${slug}`} className="block group">
      <Card 
        variant="casino" 
        padding="lg"
        className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                  #{rank}
                </div>
                {isFeatured && (
                  <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                    Featured
                  </div>
                )}
                {isExclusive && (
                  <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                    Exclusive
                  </div>
                )}
              </div>
              
              <Heading 
                as="h3" 
                size="xl" 
                className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2"
              >
                {name}
              </Heading>
              
              {/* Simple rating display */}
              {rating && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <Text size="sm" className="text-gray-600 ml-1">
                    {rating.toFixed(1)}
                  </Text>
                </div>
              )}
            </div>

            {logo && (
              <div className="flex-shrink-0 ml-4">
                <Image
                  src={imageUrl}
                  alt={logo.alternativeText || name}
                  width={80}
                  height={60}
                  className="object-contain rounded-md"
                />
              </div>
            )}
          </div>

          {/* Bonus */}
          {bonus_text && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <Text size="sm" className="text-green-600 mb-1">
                Welcome Bonus
              </Text>
              <Text className="font-bold text-green-800">
                {bonus_text}
              </Text>
            </div>
          )}

          {/* Action Button */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="primary"
              size="md"
              className="flex-1"
            >
              Play Now
            </Button>
            <Button
              variant="outline"
              size="md"
            >
              Review
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
} 