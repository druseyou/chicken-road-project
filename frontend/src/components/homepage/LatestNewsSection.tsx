import { Article } from '@/types';
import ArticleCard from '../cards/ArticleCard';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface LatestNewsSectionProps {
  articles: Article[];
}

export default function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  const t = useTranslations('LatestNewsSection');
  
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{t('title')}</h2>
        <p className="text-gray-600 mt-2">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.filter(Boolean).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/news" className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
          {t('viewAll')}
        </Link>
      </div>
    </section>
  );
} 