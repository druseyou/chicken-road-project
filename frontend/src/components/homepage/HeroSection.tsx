import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function HeroSection() {
  const t = await getTranslations('HeroSection');

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/casino-reviews"
            className="bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </div>
  );
} 