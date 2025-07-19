import { Link } from '@/i18n/navigation';
import { Article } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent, Heading, Text, Badge } from '@/ui';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  if (!article) {
    return null;
  }

  const { title, excerpt, slug, preview_image, category } = article;
  const imageUrl = preview_image?.url 
    ? getStrapiURL(preview_image.url) 
    : '/placeholder.svg';

  return (
    <Link href={`/news/${slug}`} className="block group">
      <Card variant="article" padding="none" className="overflow-hidden">
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <OptimizedImage
            src={imageUrl}
            alt={preview_image?.alternativeText || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            containerClassName="aspect-video"
            showBlurPlaceholder={true}
            priority={false}
          />
        </div>

        <CardContent>
          {category && (
            <Badge variant="default" size="sm">
              {category.name}
            </Badge>
          )}
          
          <Heading as="h3" size="lg" className="line-clamp-2">
            {title}
          </Heading>
          
          {excerpt && (
            <Text color="muted" size="sm" className="line-clamp-3">
              {excerpt}
            </Text>
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 