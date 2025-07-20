'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Shield, Gamepad2, TrendingUp, Award } from 'lucide-react';
import { Casino } from '@/types';
import { getStrapiURL } from '@/services/api';
import { Card } from '@/ui/components/molecules';
import { Heading, Text, Button, Rating, StatusBadge, StatCard } from '@/ui/components/atoms';
import { useTranslations } from 'next-intl';

interface CasinoCardProps {
  casino: Casino;
  rank: number;
  isExclusive?: boolean;
  isFeatured?: boolean;
}

export default function CasinoCard({ casino, rank, isExclusive, isFeatured }: CasinoCardProps) {
  const t = useTranslations('Cards');
  
  if (!casino) {
    return null;
  }

  const { name, rating, bonus_text, logo, slug } = casino;
  const imageUrl = logo?.url ? getStrapiURL(logo.url) : '/api/placeholder/400/250';

  return (
    <Link href={`/casino-reviews/${slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Card 
          variant="casino" 
          padding="none"
          className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-l-red-500 bg-white"
        >
          <div className="lg:flex">
            {/* Левая часть - Ранг и Лого */}
            <div className="lg:w-1/4 p-6 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <StatusBadge variant="rank" size="md" rank={rank} />
                <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                  <Image
                    src={imageUrl}
                    alt={logo?.alternativeText || name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </div>

            {/* Центральная часть - Основная информация */}
            <div className="lg:w-1/2 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Heading 
                    as="h3" 
                    size="xl" 
                    className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2"
                  >
                    {name}
                  </Heading>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {isFeatured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <StatusBadge variant="featured" size="sm">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </StatusBadge>
                      </motion.div>
                    )}
                    {isExclusive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <StatusBadge variant="exclusive" size="sm">
                          <Shield className="w-3 h-3 mr-1" />
                          Exclusive
                        </StatusBadge>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Рейтинг */}
              {rating && (
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Rating 
                    value={rating} 
                    size="md" 
                    variant="casino"
                    showValue={true}
                    showLabel={true}
                  />
                </motion.div>
              )}

              {/* Статистика */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, staggerChildren: 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <StatCard
                    icon={<TrendingUp className="w-4 h-4" />}
                    label={t('rtp')}
                    value="97.5%"
                    variant="compact"
                    size="sm"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <StatCard
                    icon={<Clock className="w-4 h-4" />}
                    label={t('payout')}
                    value="1-3 days"
                    variant="compact"
                    size="sm"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <StatCard
                    icon={<Gamepad2 className="w-4 h-4" />}
                    label={t('games')}
                    value="1000+"
                    variant="compact"
                    size="sm"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Правая часть - Бонус и кнопки */}
            <div className="lg:w-1/4 p-6 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-between">
              {/* Бонус */}
              {bonus_text && (
                <motion.div 
                  className="mb-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Text size="sm" className="text-green-600 mb-1 font-medium">
                    {t('welcomeBonus')}
                  </Text>
                  <Text className="font-bold text-green-800 text-lg">
                    {bonus_text}
                  </Text>
                </motion.div>
              )}

              {/* Кнопки действий */}
              <motion.div 
                className="space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="success"
                  size="lg"
                  className="w-full"
                  animated={true}
                >
                  <Star className="w-4 h-4 mr-2" />
                  {t('playNow')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  animated={true}
                >
                  {t('review')}
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
} 