'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Casino } from '@/types';
import CasinoCard from '@/components/cards/CasinoCard.v2';
import PageHeader from '@/components/layout/PageHeader';
import { Heading, Text, Button, StatusBadge, StatCard } from '@/ui/components/atoms';
import { Card } from '@/ui/components/molecules';

interface CasinoReviewsPageSimpleProps {
  initialCasinos: Casino[];
}

export default function CasinoReviewsPageSimple({ initialCasinos }: CasinoReviewsPageSimpleProps) {
  const t = useTranslations('CasinoReviewsPage');
  const [casinos, setCasinos] = useState<Casino[]>(initialCasinos);
  const [filteredCasinos, setFilteredCasinos] = useState<Casino[]>(initialCasinos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Сортируем казино по рейтингу для ранкинга
  const rankedCasinos = [...filteredCasinos].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const filterOptions = [
    { label: 'All Casinos', value: '' },
    { label: 'Top Rated (4.5+)', value: 'top-rated' },
    { label: 'High RTP', value: 'high-rtp' },
    { label: 'Fast Payout', value: 'fast-payout' }
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
      case 'high-rtp':
        filtered = filtered.filter(casino => (casino.rtp || 0) >= 97);
        break;
      case 'fast-payout':
        filtered = filtered.filter(casino => 
          casino.payout_speed && (
            casino.payout_speed.toLowerCase().includes('instant') || 
            casino.payout_speed.toLowerCase().includes('fast')
          )
        );
        break;
    }

    setFilteredCasinos(filtered);
  }, [casinos, searchQuery, selectedFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const topCasinos = rankedCasinos.slice(0, 5);

  // Статистика
  const avgRating = casinos.reduce((sum, casino) => sum + (casino.rating || 0), 0) / casinos.length;
  const topRatedCount = casinos.filter(casino => (casino.rating || 0) >= 4.5).length;
  const highRtpCount = casinos.filter(casino => (casino.rtp || 0) >= 97).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        title="🏆 Casino Reviews"
        subtitle="Expert reviews of the best online casinos with bonuses and ratings"
        showSearch={true}
        searchPlaceholder="Search casinos..."
        onSearch={handleSearch}
        showFilters={true}
        filterOptions={filterOptions}
        onFilter={handleFilter}
        filterPlaceholder="Filter casinos"
        badges={[
          { variant: 'featured', text: '🏆 Top Rated' },
          { variant: 'exclusive', text: '💎 Expert Choice' },
          { variant: 'new', text: '🔥 Verified Reviews' }
        ]}
        backgroundGradient="from-red-900 via-orange-800 to-red-800"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<div className="text-2xl">🎰</div>}
              label="Total Casinos"
              value={casinos.length.toString()}
              variant="default"
              size="md"
            />
            <StatCard
              icon={<div className="text-2xl">⭐</div>}
              label="Avg Rating"
              value={avgRating.toFixed(1)}
              variant="default"
              size="md"
            />
            <StatCard
              icon={<div className="text-2xl">🏆</div>}
              label="Top Rated"
              value={topRatedCount.toString()}
              variant="default"
              size="md"
            />
            <StatCard
              icon={<div className="text-2xl">💎</div>}
              label="High RTP"
              value={highRtpCount.toString()}
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
                🏆 Top 5 Casinos
              </Heading>
              <StatusBadge variant="featured" size="md">
                Expert Choice
              </StatusBadge>
            </div>

            <div className="space-y-6">
              {topCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={casino}
                  rank={index + 1}
                  isFeatured={index < 3}
                  isExclusive={casino.bonus_text?.toLowerCase().includes('exclusive') || false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Results Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <Heading as="h2" size="2xl" className="font-bold text-gray-900">
              🎲 All Casino Reviews
            </Heading>
            <div className="flex items-center gap-4">
              <Text size="sm" className="text-gray-500">
                {filteredCasinos.length} results
              </Text>
              
              {(searchQuery || selectedFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('');
                  }}
                >
                  🔄 Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Casinos List */}
          {filteredCasinos.length > 0 ? (
            <div className="space-y-6">
              {rankedCasinos.slice(5).map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={casino}
                  rank={index + 6}
                  isFeatured={false}
                  isExclusive={casino.bonus_text?.toLowerCase().includes('exclusive') || false}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <Heading as="h3" size="lg" className="mb-2">
                No casinos found
              </Heading>
              <Text className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </Text>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('');
                }}
              >
                Clear Filters
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
                Safe & Trusted Reviews
              </Heading>
              <Text className="text-gray-600 mb-6 max-w-2xl mx-auto">
                All casinos are thoroughly tested by our experts for safety, fairness, and reliability.
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