import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import LocaleSwitcher from './locale/LocaleSwitcher';

export default function Header() {
  const t = useTranslations('pages');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Chicken Road
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/news" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t('news')}
              </Link>
            </li>
            <li>
              <Link href="/casino-reviews" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t('casino-reviews')}
              </Link>
            </li>
            <li>
              <Link href="/slots" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t('slots')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <LocaleSwitcher />
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 