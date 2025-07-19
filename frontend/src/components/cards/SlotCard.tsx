import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Slot } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent, Heading, Text } from '@/ui';

interface SlotCardProps {
  slot: Slot;
}

export default function SlotCard({ slot }: SlotCardProps) {
  if (!slot) {
    return null;
  }

  const { name, provider, rating, cover_image, slug } = slot;
  const imageUrl = cover_image?.url 
    ? getStrapiURL(cover_image.url) 
    : '/placeholder.svg';

  return (
    <Link href={`/slots/${slug}`} className="block group">
      <Card variant="slot" padding="none" className="overflow-hidden">
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={cover_image?.alternativeText || name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <Text size="sm" color="muted" className="mb-1">{provider}</Text>
          <Heading 
            as="h3" 
            size="xl" 
            className="mb-4 group-hover:text-blue-600 transition-colors"
          >
            {name}
          </Heading>
          <div className="flex justify-between items-center">
            <Text size="sm" color="muted">
              RTP: <Text as="span" size="sm" weight="semibold">{rating}%</Text>
            </Text>
            <Text size="sm" color="muted">
              Volatility: <Text as="span" size="sm" weight="semibold">N/A</Text>
            </Text>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 