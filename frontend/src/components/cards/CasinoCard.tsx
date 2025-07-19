import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Casino } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent, Heading, Text, Button } from '@/ui';

interface CasinoCardProps {
  casino: Casino;
  rank: number;
}

export default function CasinoCard({ casino, rank }: CasinoCardProps) {
  if (!casino) {
    return null;
  }

  const { name, rating, bonus_text, logo, slug } = casino;
  const imageUrl = logo?.url ? getStrapiURL(logo.url) : '/api/placeholder/400/250';

  return (
    <Card variant="casino" padding="none" className="overflow-hidden flex flex-col md:flex-row items-center">
      <div className="md:w-1/4 p-4 flex justify-center items-center">
        <div className="text-4xl font-bold text-gray-200">{rank}</div>
        <div className="w-24 h-24 relative ml-4">
          <Image
            src={imageUrl}
            alt={logo?.alternativeText || name}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <CardContent className="p-6 md:w-1/2">
        <Link href={`/casino-reviews/${slug}`} className="block">
          <Heading 
            as="h3" 
            size="xl" 
            className="hover:text-blue-600 transition-colors"
          >
            {name}
          </Heading>
        </Link>
        <div className="flex items-center my-2">
          <div className="text-yellow-500">
            {'★'.repeat(Math.min(Math.max(Math.round(rating || 0), 0), 5))}
            {'☆'.repeat(Math.max(5 - Math.min(Math.max(Math.round(rating || 0), 0), 5), 0))}
          </div>
          <Text size="sm" color="muted" className="ml-2">{rating?.toFixed(1)}</Text>
        </div>
        <Text weight="semibold">{bonus_text}</Text>
      </CardContent>
      <div className="p-6 md:w-1/4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
        <Link href={`/casino-reviews/${slug}`} className="w-full">
          <Button variant="casino" className="w-full">
            Visit
          </Button>
        </Link>
      </div>
    </Card>
  );
} 