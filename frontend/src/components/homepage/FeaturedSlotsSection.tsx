import { Slot } from '@/types';
import SlotCard from '../cards/SlotCard.v2';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface FeaturedSlotsSectionProps {
  slots: Slot[];
}

export default function FeaturedSlotsSection({ slots }: FeaturedSlotsSectionProps) {
  const t = useTranslations('FeaturedSlotsSection');
  
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{t('title')}</h2>
        <p className="text-gray-600 mt-2">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slots.filter(Boolean).map((slot) => (
          <SlotCard key={slot.id} slot={slot} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/slots" className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
          {t('viewAll')}
        </Link>
      </div>
    </section>
  );
} 