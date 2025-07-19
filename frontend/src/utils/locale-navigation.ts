/**
 * Utility functions for intelligent locale navigation
 * Handles cases where content doesn't exist in target locale
 */

import { 
  getArticleBySlug, 
  getBonusBySlug, 
  getCasinoBySlug, 
  getSlotBySlug 
} from '@/services/strapi';

/**
 * Check if content exists for given slug and locale
 * @param contentType - Type of content (news, bonuses, casino-reviews, slots)
 * @param slug - Content slug
 * @param locale - Target locale
 * @returns Promise<boolean> - true if content exists
 */
async function checkContentExists(
  contentType: string, 
  slug: string, 
  locale: string
): Promise<boolean> {
  try {
    let content = null;
    
    switch (contentType) {
      case 'news':
        content = await getArticleBySlug(slug, locale);
        break;
      case 'bonuses':
        content = await getBonusBySlug(slug, locale);
        break;
      case 'casino-reviews':
        content = await getCasinoBySlug(slug, locale);
        break;
      case 'slots':
        content = await getSlotBySlug(slug, locale);
        break;
      default:
        return false;
    }
    
    return content !== null;
  } catch (error) {
    console.error(`Error checking content existence:`, error);
    return false;
  }
}

/**
 * Get appropriate navigation path for locale switching
 * If content exists in target locale, return same path
 * If content doesn't exist, return parent path (list page)
 * 
 * @param pathname - Current pathname (e.g., "/news/article")
 * @param targetLocale - Target locale
 * @returns Promise<string> - Appropriate path for navigation
 */
export async function getLocaleNavigationPath(
  pathname: string, 
  targetLocale: string
): Promise<string> {
  // Parse pathname to extract content type and slug
  const pathParts = pathname.split('/').filter(Boolean);
  
  // If it's a list page (e.g., /news, /bonuses), return as is
  if (pathParts.length <= 1) {
    return pathname;
  }
  
  // If it's a detail page (e.g., /news/article, /bonuses/bonus-slug)
  if (pathParts.length === 2) {
    const [contentType, slug] = pathParts;
    
    // Check if content exists in target locale
    const contentExists = await checkContentExists(contentType, slug, targetLocale);
    
    if (contentExists) {
      // Content exists, return same path
      return pathname;
    } else {
      // Content doesn't exist, return parent path
      return `/${contentType}`;
    }
  }
  
  // For other cases, return as is
  return pathname;
}

/**
 * Content type mapping for validation
 */
export const CONTENT_TYPES = {
  'news': 'articles',
  'bonuses': 'bonuses', 
  'casino-reviews': 'casino-reviews',
  'slots': 'slots'
} as const;

export type ContentType = keyof typeof CONTENT_TYPES; 