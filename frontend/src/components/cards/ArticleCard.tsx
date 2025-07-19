import { Link } from '@/i18n/navigation';
import { Article } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card, CardContent } from '@/ui/components/molecules';
import { Heading, Text, StatusBadge } from '@/ui/components/atoms';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  showCategory?: boolean;
}

export default function ArticleCard({ 
  article, 
  featured = false,
  showCategory = true 
}: ArticleCardProps) {
  if (!article) {
    return null;
  }

  const { title, excerpt, slug, preview_image, category, publishedAt } = article;
  const imageUrl = preview_image?.url 
    ? getStrapiURL(preview_image.url) 
    : '/placeholder.svg';

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const isRecent = () => {
    if (!publishedAt) return false;
    const now = new Date();
    const publishDate = new Date(publishedAt);
    const diffTime = now.getTime() - publishDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  return (
    <Link href={`/news/${slug}`} className="block group">
      <Card 
        variant="article" 
        padding="none" 
        className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
          featured ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
        }`}
      >
        {/* Image with overlay badges */}
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
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            {featured && (
              <StatusBadge variant="featured" size="sm">
                ⭐ Featured
              </StatusBadge>
            )}
            {isRecent() && (
              <StatusBadge variant="new" size="sm">
                🔥 New
              </StatusBadge>
            )}
          </div>

          {/* Category badge in bottom right */}
          {showCategory && category && (
            <div className="absolute bottom-3 right-3">
              <StatusBadge variant="casino" size="sm" className="bg-white/90 text-gray-800">
                {category.name}
              </StatusBadge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Date */}
          {publishedAt && (
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(publishedAt)}</span>
            </div>
          )}
          
          {/* Title */}
          <Heading 
            as="h3" 
            size="lg" 
            className="line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors"
          >
            {title}
          </Heading>
          
          {/* Excerpt */}
          {excerpt && (
            <Text 
              color="muted" 
              size="sm" 
              className="line-clamp-3 mb-4"
            >
              {excerpt}
            </Text>
          )}

          {/* Read more link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
              <span>Читати більше</span>
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* Reading time estimate */}
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>3 хв</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 