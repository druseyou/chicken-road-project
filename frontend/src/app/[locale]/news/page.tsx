import { getArticles } from '@/services/strapi';
import { Article } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';
import ArticleCard from '@/components/cards/ArticleCard';

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
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    articles = [];
  }

  // Если нет статей, показываем fallback
  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-red-600 mb-10 text-left">{t('title')}</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('noArticles')}</p>
            <p className="text-gray-400 text-sm mt-2">Перевірте чи працює API: http://localhost:1337/api/articles</p>
          </div>
        </div>
      </div>
    );
  }

  // Разделяем статьи на featured и обычные
  const featuredArticles = articles.filter(article => article.is_featured);
  const regularArticles = articles.filter(article => !article.is_featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badges */}
            <div className="flex justify-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg text-sm font-medium">
                {t('badges.latest')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md text-sm font-medium">
                {t('badges.breaking')}
              </span>
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg text-sm font-medium">
                {t('badges.expert')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {t('title')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('sections.featured')}
              </h2>
              <span className="text-sm text-gray-500">
                {featuredArticles.length} {t('stats.totalArticles').toLowerCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredArticles.slice(0, 3).map((article, index) => (
                <div key={article.id} className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}>
                  <ArticleCard 
                    article={article} 
                    featured={true}
                    showCategory={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Articles Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('sections.allNews')}
            </h2>
            <span className="text-sm text-gray-500">
              {articles.length} {t('stats.totalArticles').toLowerCase()}
            </span>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularArticles.map((article) => (
              <ArticleCard 
                key={article.id}
                article={article}
                featured={false}
                showCategory={true}
              />
            ))}
          </div>
        </section>

        {/* Statistics Footer */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 rounded-lg mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold mb-1">{articles.length}+</div>
                <div className="text-sm opacity-90">{t('stats.totalArticles')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">{featuredArticles.length}+</div>
                <div className="text-sm opacity-90">{t('stats.featured')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-sm opacity-90">{t('stats.updates')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">{t('stats.expertContent')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 