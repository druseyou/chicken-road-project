import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Slot } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent, Heading, Text, Button } from '@/ui';

interface DetailedSlotCardProps {
  slot: Slot;
}

export default function DetailedSlotCard({ slot }: DetailedSlotCardProps) {
  const { name, description, slug, cover_image } = slot;
  const imageUrl = cover_image?.url 
    ? getStrapiURL(cover_image.url) 
    : '/api/placeholder/400/250';

  return (
    <Card variant="slot" padding="none" className="overflow-hidden mb-8">
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
              {description}
            </Text>
          </div>
          <Link href={`/slots/${slug}`} className="mt-4 inline-block">
            <Button variant="success">
              Play Now
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
} 