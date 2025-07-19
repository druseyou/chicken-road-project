import { getArticles } from '@/services/strapi';
import DetailedArticleCard from '@/components/cards/DetailedArticleCard';
import { Article } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

interface NewsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('NewsPage');
  
  const canonicalUrl = getCanonicalUrl(locale, '/news');
  const currentUrl = getCurrentUrl(locale, '/news');
  const alternates = getAlternateUrls('/news');

  return {
    title: t('title') + ' | Chicken Road Project',
    description: t('description') || 'Latest casino and gambling news, reviews and updates.',
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t('title') + ' | Chicken Road Project',
      description: t('description') || 'Latest casino and gambling news, reviews and updates.',
      url: currentUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') + ' | Chicken Road Project',
      description: t('description') || 'Latest casino and gambling news, reviews and updates.',
    },
  };
}

export default async function NewsPage(props: NewsPageProps) {
  const { params } = props;
  const { locale } = await params;
  const t = await getTranslations('NewsPage');
  
  let articles: Article[] = [];
  try {
    console.log('Fetching articles for locale:', locale);
    articles = await getArticles(locale);
    console.log('Articles fetched:', articles.length, 'articles');
    console.log('First article:', articles[0]);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    // Optionally, you can render an error message to the user
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
        
        <div>
          {articles && articles.length > 0 ? (
            articles.map((article: Article) => (
              <DetailedArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('noArticles')}</p>
              <p className="text-gray-400 text-sm mt-2">Перевірте чи працює API: http://localhost:1337/api/articles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 