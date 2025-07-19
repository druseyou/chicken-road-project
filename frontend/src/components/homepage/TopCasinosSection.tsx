import { Casino } from '@/types';
import CasinoCard from '@/components/cards/CasinoCard.v2';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface TopCasinosSectionProps {
  casinos: Casino[];
}

export default function TopCasinosSection({ casinos }: TopCasinosSectionProps) {
  const t = useTranslations('TopCasinosSection');
  
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{t('title')}</h2>
        <p className="text-gray-600 mt-2">{t('subtitle')}</p>
      </div>

      <div className="space-y-6">
        {casinos.filter(Boolean).map((casino, index) => (
          <CasinoCard key={casino.id} casino={casino} rank={index + 1} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/casino-reviews" className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
          {t('viewAll')}
        </Link>
      </div>
    </section>
  );
} 