import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['it', 'en', 'uk'],

  // Used when no locale matches
  defaultLocale: 'it',
  
  // Don't show locale prefix for default locale
  localePrefix: 'as-needed'
}); 