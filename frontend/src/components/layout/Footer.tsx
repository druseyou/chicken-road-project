import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold mb-4">Chicken Road</h3>
            <p className="text-gray-300 text-sm">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">{t('quickLinks')}</h4>
            <nav>
              <ul className="space-y-2">
                <li><Link href="/casino-reviews" className="text-gray-300 hover:text-white text-sm transition-colors">{t('casinos')}</Link></li>
                <li><Link href="/slots" className="text-gray-300 hover:text-white text-sm transition-colors">{t('slots')}</Link></li>
                <li><Link href="/bonuses" className="text-gray-300 hover:text-white text-sm transition-colors">{t('bonuses')}</Link></li>
                <li><Link href="/news" className="text-gray-300 hover:text-white text-sm transition-colors">{t('news')}</Link></li>
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-md font-semibold mb-4">{t('legal')}</h4>
            <nav>
              <ul className="space-y-2">
                <li><Link href="/contacts" className="text-gray-300 hover:text-white text-sm transition-colors">{t('contacts')}</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">{t('privacyPolicy')}</Link></li>
                <li><Link href="/terms-of-use" className="text-gray-300 hover:text-white text-sm transition-colors">{t('termsOfUse')}</Link></li>
                <li><Link href="/sitemap" className="text-gray-300 hover:text-white text-sm transition-colors">{t('sitemap')}</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {year} Chicken Road Project. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
} 