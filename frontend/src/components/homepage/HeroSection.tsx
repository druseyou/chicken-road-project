import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button, Heading, Text, StatusBadge } from '@/ui/components/atoms';

export default async function HeroSection() {
  const t = await getTranslations('HeroSection');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center">
          {/* Trust Indicators */}
          <div className="flex justify-center gap-4 mb-8">
            <StatusBadge variant="featured" size="md">
              {t('badges.casinoGuide')}
            </StatusBadge>
            <StatusBadge variant="exclusive" size="md">
              {t('badges.independent')}
            </StatusBadge>
            <StatusBadge variant="new" size="md">
              {t('badges.yearsOnline')}
            </StatusBadge>
          </div>

          {/* Main Heading */}
          <Heading 
            as="h1" 
            size="5xl" 
            className="text-white font-bold mb-6 max-w-4xl mx-auto leading-tight"
          >
            {t('title')}
          </Heading>
          
          <Text 
            size="xl" 
            className="text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </Text>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                120+
              </div>
              <Text size="sm" className="text-blue-200 uppercase tracking-wide">
                {t('stats.casinosReviewed')}
              </Text>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                10
              </div>
              <Text size="sm" className="text-blue-200 uppercase tracking-wide">
                {t('stats.yearsExperience')}
              </Text>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                21K+
              </div>
              <Text size="sm" className="text-blue-200 uppercase tracking-wide">
                {t('stats.freeGames')}
              </Text>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                $1M+
              </div>
              <Text size="sm" className="text-blue-200 uppercase tracking-wide">
                {t('stats.bonusesFound')}
              </Text>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/casino-reviews">
              <Button 
                variant="casino" 
                className="px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                {t('buttons.findCasinos')}
              </Button>
            </Link>
            <Link href="/bonuses">
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-bold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                {t('buttons.claimBonuses')}
              </Button>
            </Link>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/casino-reviews" 
              className="text-blue-200 hover:text-white transition-colors underline decoration-blue-300 hover:decoration-white"
            >
              {t('quickNav.casinoReviews')}
            </Link>
            <span className="text-blue-300">•</span>
            <Link 
              href="/bonuses" 
              className="text-blue-200 hover:text-white transition-colors underline decoration-blue-300 hover:decoration-white"
            >
              {t('quickNav.bonusOffers')}
            </Link>
            <span className="text-blue-300">•</span>
            <Link 
              href="/slots" 
              className="text-blue-200 hover:text-white transition-colors underline decoration-blue-300 hover:decoration-white"
            >
              {t('quickNav.freeGames')}
            </Link>
            <span className="text-blue-300">•</span>
            <Link 
              href="/slots" 
              className="text-blue-200 hover:text-white transition-colors underline decoration-blue-300 hover:decoration-white"
            >
              {t('quickNav.slots')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 lg:h-20">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
} 