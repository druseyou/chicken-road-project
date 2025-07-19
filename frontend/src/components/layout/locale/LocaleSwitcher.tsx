'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ChangeEvent, useTransition, useMemo, useState, useEffect } from 'react';
import { getLocaleNavigationPath } from '@/utils/locale-navigation';

// Виносимо константи за межі компонента для оптимізації
const LOCALES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' }
] as const;

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isClient, setIsClient] = useState(false);

  // Синхронізуємо з клієнтом для уникнення hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Мемоізуємо поточну локаль
  const currentLocale = useMemo(
    () => LOCALES.find(l => l.code === locale) || LOCALES[0],
    [locale]
  );

  // Оновлений обробник зміни з умною навігацією
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    
    if (nextLocale !== locale && isClient) {
      startTransition(async () => {
        try {
          // Отримуємо правильний шлях для навігації
          const navigationPath = await getLocaleNavigationPath(pathname, nextLocale);
          
          // Навігуємо до відповідного шляху
          router.replace(navigationPath, { locale: nextLocale });
        } catch (error) {
          console.error('Error during locale navigation:', error);
          // Fallback: стандартна навігація
          router.replace(pathname, { locale: nextLocale });
        }
      });
    }
  };

  return (
    <div className="relative">
      <label className="relative text-gray-600 transition-opacity">
        <span className="sr-only">{t('selectLanguage')}</span>
        <select
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          value={currentLocale.code}
          disabled={isPending}
          onChange={handleSelectChange}
          aria-label={t('selectLanguage')}
          style={{ opacity: isPending ? 0.5 : 1 }}
        >
          {LOCALES.map((loc) => (
            <option key={loc.code} value={loc.code}>
              {loc.flag} {loc.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          {isClient && isPending ? (
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            <svg 
              className="h-4 w-4 text-gray-400 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          )}
        </div>
      </label>
    </div>
  );
} 