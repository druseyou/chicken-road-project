import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Article } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent, Heading, Text, Button } from '@/ui';

interface DetailedArticleCardProps {
  article: Article;
}

export default function DetailedArticleCard({ article }: DetailedArticleCardProps) {
  if (!article) {
    return null;
  }

  const { title, excerpt, slug, preview_image } = article;
  
  // Handle image URL for new flat structure
  const imageUrl = preview_image?.url ? getStrapiURL(preview_image.url) : '/placeholder.svg';

  return (
    <Card variant="article" padding="none" className="overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:w-1/3">
          <Image 
            src={imageUrl} 
            alt={title} 
            width={400} 
            height={250} 
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <Heading as="h3" size="2xl" color="casino" className="mb-2">
              {title}
            </Heading>
            <Text color="muted" className="mb-4">
              {excerpt}
            </Text>
          </div>
          <Link href={`/news/${slug}`} className="mt-4 inline-block">
            <Button variant="success">
              Read More
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
} 