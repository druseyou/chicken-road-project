'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Casino } from '@/types';
import CasinoCard from '@/components/cards/CasinoCard.v2';
import PageHeader from '@/components/layout/PageHeader';
import { Heading, Text, Button, StatusBadge, StatCard } from '@/ui/components/atoms';
import { Card } from '@/ui/components/molecules';

interface CasinoReviewsPageV2Props {
  initialCasinos: Casino[];
}

export default function CasinoReviewsPageV2({ initialCasinos }: CasinoReviewsPageV2Props) {
  const t = useTranslations('CasinoReviewsPage');
  const [casinos, setCasinos] = useState<Casino[]>(initialCasinos);
  const [filteredCasinos, setFilteredCasinos] = useState<Casino[]>(initialCasinos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Сортируем казино по рейтингу для ранкинга
  const rankedCasinos = [...filteredCasinos].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const filterOptions = [
    { label: t('filters.all'), value: '' },
    { label: t('filters.topRated'), value: 'top-rated' },
    { label: t('filters.newCasinos'), value: 'new' },
    { label: t('filters.exclusive'), value: 'exclusive' },
    { label: t('filters.highBonus'), value: 'high-bonus' },
    { label: t('filters.fastPayout'), value: 'fast-payout' }
  ];

  // Фильтрация казино
  useEffect(() => {
    let filtered = casinos;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(casino =>
        casino.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        casino.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории
    switch (selectedFilter) {
      case 'top-rated':
        filtered = filtered.filter(casino => (casino.rating || 0) >= 4.5);
        break;
      case 'new':
        filtered = filtered.filter(casino => casino.established_date && casino.established_date > 2020);
        break;
      case 'exclusive':
        filtered = filtered.filter(casino => casino.bonus_text && casino.bonus_text.toLowerCase().includes('exclusive'));
        break;
      case 'high-bonus':
        filtered = filtered.filter(casino => casino.bonus_text && casino.bonus_text.includes('€') || casino.bonus_text.includes('$'));
        break;
      case 'fast-payout':
        filtered = filtered.filter(casino => casino.payout_speed === 'instant' || casino.payout_speed === 'fast');
        break;
    }

    // Сортировка
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'bonus':
        filtered.sort((a, b) => a.bonus_text.localeCompare(b.bonus_text));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredCasinos(filtered);
  }, [casinos, searchQuery, selectedFilter, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const topCasinos = rankedCasinos.slice(0, 5);
  const otherCasinos = rankedCasinos.slice(5);

  // Статистика
  const avgRating = casinos.reduce((sum, casino) => sum + (casino.rating || 0), 0) / casinos.length;
  const topRatedCount = casinos.filter(casino => (casino.rating || 0) >= 4.5).length;
  const exclusiveCount = casinos.filter(casino => casino.bonus_text && casino.bonus_text.toLowerCase().includes('exclusive')).length;

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
          { variant: 'featured', text: '🏆 Top Rated' },
          { variant: 'exclusive', text: '💎 Exclusive Deals' },
          { variant: 'new', text: '🔥 Expert Reviews' }
        ]}
        backgroundGradient="from-red-900 via-orange-800 to-red-800"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<div className="text-2xl">🎰</div>}
              label={t('stats.totalCasinos')}
              value={casinos.length.toString()}
              variant="default"
              size="md"
            />
            <StatCard
              icon={<div className="text-2xl">⭐</div>}
              label={t('stats.avgRating')}
              value={avgRating.toFixed(1)}
              variant="default"
              size="md"
            />
            <StatCard
              icon={<div className="text-2xl">🏆</div>}
              label={t('stats.topRated')}
              value={topRatedCount.toString()}
              variant="default"
              size="md"
            />
            <StatCard
              icon={<div className="text-2xl">💎</div>}
              label={t('stats.exclusive')}
              value={exclusiveCount.toString()}
              variant="default"
              size="md"
            />
          </div>
        </section>

        {/* Top 5 Casinos */}
        {topCasinos.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <Heading as="h2" size="2xl" className="font-bold text-gray-900">
                🏆 {t('sections.topCasinos')}
              </Heading>
              <StatusBadge variant="featured" size="md">
                {t('expertChoice')}
              </StatusBadge>
            </div>

            <div className="space-y-6">
              {topCasinos.map((casino, index) => (
                                 <CasinoCard
                   key={casino.id}
                   casino={casino}
                   rank={index + 1}
                   isFeatured={index < 3}
                   isExclusive={casino.bonus_text && casino.bonus_text.toLowerCase().includes('exclusive')}
                 />
              ))}
            </div>
          </section>
        )}

        {/* All Casinos Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <Heading as="h2" size="2xl" className="font-bold text-gray-900">
              🎲 {selectedFilter ? t(`filters.${selectedFilter}`) : t('sections.allCasinos')}
            </Heading>
            <div className="flex items-center gap-4">
              <Text size="sm" className="text-gray-500">
                {filteredCasinos.length} {t('results')}
              </Text>
              
              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="rating">{t('sortBy.rating')}</option>
                <option value="bonus">{t('sortBy.bonus')}</option>
                <option value="name">{t('sortBy.name')}</option>
              </select>
              
              {(searchQuery || selectedFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('');
                  }}
                >
                  🔄 {t('clearFilters')}
                </Button>
              )}
            </div>
          </div>

          {/* Casinos Grid */}
          {filteredCasinos.length > 0 ? (
            <div className="space-y-6">
              {otherCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={casino}
                  rank={index + 6}
                  isFeatured={false}
                  isExclusive={casino.is_exclusive}
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
                  setSelectedFilter('');
                }}
              >
                {t('noResults.clearFilters')}
              </Button>
            </Card>
          )}
        </section>

        {/* Trust & Safety Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                {t('safety.title')}
              </Heading>
              <Text className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('safety.description')}
              </Text>
              <div className="flex flex-wrap justify-center gap-3">
                <StatusBadge variant="exclusive" size="md">✅ Licensed</StatusBadge>
                <StatusBadge variant="featured" size="md">🔒 SSL Secured</StatusBadge>
                <StatusBadge variant="new" size="md">⚡ Fair Play</StatusBadge>
                <StatusBadge variant="casino" size="md">💯 Verified</StatusBadge>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
} 