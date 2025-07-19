import { getArticleBySlug } from '@/services/strapi';
import { getStrapiURL } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Chicken Road Project',
    };
  }

  const canonicalUrl = getCanonicalUrl(locale, `/news/${slug}`);
  const currentUrl = getCurrentUrl(locale, `/news/${slug}`);
  const alternates = getAlternateUrls(`/news/${slug}`);
  const imageUrl = article.preview_image?.url ? getStrapiURL(article.preview_image.url) : undefined;

  return {
    title: `${article.title} | Chicken Road Project`,
    description: article.content?.slice(0, 160) + '...' || 'Read the latest casino and gambling news.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: article.title,
      description: article.content?.slice(0, 160) + '...' || 'Read the latest casino and gambling news.',
      url: currentUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'article',
      publishedTime: article.createdAt,
      authors: [article.author || 'Chicken Road Team'],
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.preview_image?.alternativeText || article.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.content?.slice(0, 160) + '...' || 'Read the latest casino and gambling news.',
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const t = await getTranslations('ArticlePage');
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { title, content, preview_image, author, createdAt, reading_time, category } = article;
  const imageUrl = preview_image?.url ? getStrapiURL(preview_image.url) : '/placeholder.svg';
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check if this is demo data
  const isDemoData = title.startsWith('Demo Article:');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status indicator */}
        <div className="inline-flex items-center bg-white rounded-lg shadow-sm px-4 py-2 text-sm mb-6">
          <div className={`w-2 h-2 rounded-full mr-2 ${!isDemoData ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-gray-600">
            {!isDemoData ? 'Data from API' : 'Demonstration data'}
          </span>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href=".." className="text-blue-600 hover:text-blue-800 transition-colors">
            ← {t('backToNews')}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            {category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {category.name}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm space-x-4">
            <span>{t('by')} {author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{reading_time} {t('read')}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-video bg-gray-200 relative">
            <Image
              src={imageUrl}
              alt={preview_image?.alternativeText || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            {/* For now, we'll display content as plain text. In a real app, you'd want to use a markdown renderer */}
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {content}
            </div>
          </div>
        </article>

        {/* Back to News */}
        <div className="mt-12 text-center">
          <Link 
            href=".." 
            className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('backToNews')}
          </Link>
        </div>
      </div>
    </div>
  );
} 