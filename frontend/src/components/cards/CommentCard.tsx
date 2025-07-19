'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card } from '@/ui/components/molecules';
import { Heading, Text } from '@/ui/components/atoms';
import { cn } from '@/ui/utils/cn';
import { Comment } from '@/types';

interface CommentCardProps {
  comment: Comment;
  className?: string;
  showSource?: boolean;
}

export default function CommentCard({ 
  comment, 
  className,
  showSource = true 
}: CommentCardProps) {
  const t = useTranslations('CommentCard');

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getSourceInfo = () => {
    if (comment.casino_review) {
      return {
        type: 'casino',
        name: comment.casino_review.name,
        slug: comment.casino_review.slug,
        href: `/casino-reviews/${comment.casino_review.slug}`
      };
    }
    
    if (comment.article) {
      return {
        type: 'article',
        name: comment.article.title,
        slug: comment.article.slug,
        href: `/news/${comment.article.slug}`
      };
    }
    
    if (comment.slot) {
      return {
        type: 'slot',
        name: comment.slot.name,
        slug: comment.slot.slug,
        href: `/slots/${comment.slot.slug}`
      };
    }
    
    return null;
  };

  const sourceInfo = getSourceInfo();

  return (
    <Card 
      variant="default" 
      padding="lg"
      className={cn(
        'group hover:shadow-md transition-all duration-300',
        className
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {comment.author_name.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <Heading as="h4" size="sm" className="font-semibold text-gray-900">
                  {comment.author_name}
                </Heading>
                <Text size="sm" className="text-gray-500">
                  {formatDate(comment.createdAt)}
                </Text>
              </div>
            </div>
          </div>

          {/* Rating */}
          {comment.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < comment.rating! 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <Text size="sm" className="text-gray-600 ml-1">
                {comment.rating}/5
              </Text>
            </div>
          )}
        </div>

        {/* Comment Text */}
        <div className="pl-13">
          <Text className="text-gray-700 leading-relaxed">
            {comment.text}
          </Text>
        </div>

        {/* Source Info */}
        {showSource && sourceInfo && (
          <div className="pl-13 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Text size="sm" className="text-gray-500">
                {t(`commented_on_${sourceInfo.type}`)}
              </Text>
              <Link 
                href={sourceInfo.href}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {sourceInfo.name}
              </Link>
            </div>
          </div>
        )}

        {/* Status indicator for moderation (if needed) */}
        {comment.status !== 'published' && (
          <div className="pl-13">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              comment.status === 'pending' && 'bg-yellow-100 text-yellow-800',
              comment.status === 'rejected' && 'bg-red-100 text-red-800'
            )}>
              {t(`status.${comment.status}`)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
} 