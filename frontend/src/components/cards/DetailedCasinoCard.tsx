import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Casino } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent, Heading, Text, Button } from '@/ui';

interface DetailedCasinoCardProps {
  casino: Casino;
}

export default function DetailedCasinoCard({ casino }: DetailedCasinoCardProps) {
  const { name, shortDescription, slug, logo } = casino;
  
  const imageUrl = logo?.url
    ? getStrapiURL(logo.url)
    : '/placeholder.svg'; // Fallback image

  return (
    <Card variant="casino" padding="none" className="overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:w-1/3">
          <Image 
            src={imageUrl} 
            alt={name} 
            width={400} 
            height={250} 
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <Heading as="h3" size="2xl" color="casino" className="mb-2">
              {name}
            </Heading>
            <Text color="muted" className="mb-4">
              {shortDescription}
            </Text>
          </div>
          <Link href={`/casino-reviews/${slug}`} className="mt-4 inline-block">
            <Button variant="success">
              Read Review
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
} 