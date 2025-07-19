import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('pages');

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p>&copy; {year} Chicken Road Project. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/contacts" className="hover:underline">{t('contacts')}</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline">{t('privacy')}</Link></li>
              <li><Link href="/terms-of-use" className="hover:underline">{t('terms')}</Link></li>
              <li><Link href="/sitemap" className="hover:underline">{t('sitemap')}</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
} 