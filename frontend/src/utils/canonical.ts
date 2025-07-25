/**
 * Utility functions for generating canonical URLs with proper localization
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chicken-road-project.com';
const DEFAULT_LOCALE = 'it';
const SUPPORTED_LOCALES = ['it', 'en', 'uk'] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

/**
 * Generate canonical URL for the current page
 * Always points to the default locale version (it) for SEO
 * @param locale - Current locale (not used for canonical, always default)
 * @param pathname - Current pathname without locale prefix
 * @returns Canonical URL pointing to default locale
 */
export function getCanonicalUrl(locale: string, pathname: string): string {
  // Remove leading slash if present
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // Canonical always points to default locale (it) version
  const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL;
  
  return canonicalUrl;
}

/**
 * Generate current page URL (for Open Graph, Twitter, etc.)
 * @param locale - Current locale
 * @param pathname - Current pathname without locale prefix
 * @returns Current page URL with locale
 */
export function getCurrentUrl(locale: string, pathname: string): string {
  // Remove leading slash if present
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  let currentUrl: string;
  
  // For default locale (it), don't include locale in URL
  if (locale === DEFAULT_LOCALE) {
    currentUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL;
  } else {
    // For other locales, include locale prefix
    currentUrl = cleanPath ? `${SITE_URL}/${locale}/${cleanPath}` : `${SITE_URL}/${locale}`;
  }
  
  return currentUrl;
}

/**
 * Generate URL for specific locale (for hreflang)
 * @param locale - Target locale
 * @param pathname - Current pathname without locale prefix
 * @returns URL for specific locale
 */
export function getLocaleUrl(locale: string, pathname: string): string {
  // Remove leading slash if present
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // For default locale (it), don't include locale in URL
  if (locale === DEFAULT_LOCALE) {
    return cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL;
  }
  
  // For other locales, include locale prefix
  return cleanPath ? `${SITE_URL}/${locale}/${cleanPath}` : `${SITE_URL}/${locale}`;
}

/**
 * Generate alternate URLs for all supported locales
 * @param pathname - Current pathname without locale prefix
 * @returns Object with locale as key and URL as value
 */
export function getAlternateUrls(pathname: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  SUPPORTED_LOCALES.forEach((locale) => {
    alternates[locale] = getLocaleUrl(locale, pathname);
  });
  
  return alternates;
}

/**
 * Generate hreflang links for SEO
 * @param pathname - Current pathname without locale prefix
 * @returns Array of hreflang objects
 */
export function getHrefLangLinks(pathname: string) {
  return SUPPORTED_LOCALES.map((locale) => ({
    hrefLang: locale,
    href: getCanonicalUrl(locale, pathname),
  }));
}

/**
 * Extract pathname without locale prefix
 * @param fullPath - Full pathname including locale
 * @param locale - Current locale
 * @returns Clean pathname without locale
 */
export function getCleanPathname(fullPath: string, locale: string): string {
  // Remove locale prefix from pathname
  const localePrefix = `/${locale}`;
  if (fullPath.startsWith(localePrefix)) {
    return fullPath.slice(localePrefix.length) || '/';
  }
  return fullPath;
} 