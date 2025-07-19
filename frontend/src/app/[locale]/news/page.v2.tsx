'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Article } from '@/types';
import ArticleCard from '@/components/cards/ArticleCard';
import PageHeader from '@/components/layout/PageHeader';
import { Heading, Text, Button } from '@/ui/components/atoms';
import { Card } from '@/ui/components/molecules';

interface NewsPageV2Props {
  initialArticles: Article[];
}

export default function NewsPageV2({ initialArticles }: NewsPageV2Props) {
  const t = useTranslations('NewsPage');
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Получаем уникальные категории
  const categories = Array.from(
    new Set(articles.map(article => article.category?.name).filter(Boolean))
  ).map(name => ({ label: name!, value: name! }));

  const filterOptions = [
    { label: t('filters.all'), value: '' },
    ...categories
  ];

  // Фильтрация статей
  useEffect(() => {
    let filtered = articles;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории
    if (selectedCategory) {
      filtered = filtered.filter(article => 
        article.category?.name === selectedCategory
      );
    }

    setFilteredArticles(filtered);
  }, [articles, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const featuredArticles = filteredArticles.filter(article => article.is_featured);
  const regularArticles = filteredArticles.filter(article => !article.is_featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        showSearch={true}
        searchPlaceholder={t('searchPlaceholder')}
        onSearch={handleSearch}
        showFilters={true}
        filterOptions={filterOptions}
        onFilter={handleFilter}
        filterPlaceholder={t('filterPlaceholder')}
        badges={[
          { variant: 'featured', text: '📰 Latest News' },
          { variant: 'new', text: '🔥 Breaking' },
          { variant: 'exclusive', text: '💎 Expert Analysis' }
        ]}
        backgroundGradient="from-purple-900 via-blue-900 to-indigo-800"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <Heading as="h2" size="2xl" className="font-bold text-gray-900">
                🌟 {t('sections.featured')}
              </Heading>
              <Text size="sm" className="text-gray-500">
                {featuredArticles.length} {t('articles')}
              </Text>
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
            <Heading as="h2" size="2xl" className="font-bold text-gray-900">
              📚 {selectedCategory ? `${selectedCategory}` : t('sections.allNews')}
            </Heading>
            <div className="flex items-center gap-4">
              <Text size="sm" className="text-gray-500">
                {filteredArticles.length} {t('results')}
              </Text>
              {(searchQuery || selectedCategory) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                >
                  🔄 {t('clearFilters')}
                </Button>
              )}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
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
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <Heading as="h3" size="lg" className="mb-2">
                {t('noResults.title')}
              </Heading>
              <Text className="text-gray-600 mb-6">
                {t('noResults.description')}
              </Text>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
              >
                {t('noResults.clearFilters')}
              </Button>
            </Card>
          )}
        </section>

        {/* Load More Button */}
        {filteredArticles.length > 12 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              disabled={isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? '⏳ Loading...' : '📖 Load More Articles'}
            </Button>
          </div>
        )}
      </div>

      {/* Statistics Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">{articles.length}+</div>
              <div className="text-sm opacity-90">{t('stats.totalArticles')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{categories.length}+</div>
              <div className="text-sm opacity-90">{t('stats.categories')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{featuredArticles.length}+</div>
              <div className="text-sm opacity-90">{t('stats.featured')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-90">{t('stats.updates')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 