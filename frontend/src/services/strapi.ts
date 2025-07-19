import { fetchAPI } from './api';
import { Article, Casino, Slot, APIResponse } from '@/types';

/**
 * Generic function to fetch data from Strapi with error handling
 */
async function fetchStrapiData<T>(
  path: string, 
  params: Record<string, any> = {},
  entityName: string
): Promise<T[]> {
  try {
    console.log(`[${entityName}] Fetching from: ${path}`);
    const response: APIResponse<T[]> = await fetchAPI(path, params);
    
    if (response.error || !response.data) {
      console.warn(`[${entityName}] No data found or API error`);
      return [];
    }
    
    console.log(`[${entityName}] Fetched ${response.data.length} items`);
    return response.data;
  } catch (error) {
    console.error(`[${entityName}] Error fetching data:`, error);
    return [];
  }
}

/**
 * Generic function to fetch single item by slug
 */
async function fetchStrapiItem<T>(
  path: string,
  slug: string,
  populate: string[] = [],
  entityName: string
): Promise<T | null> {
  try {
    const params = {
      populate,
      filters: { slug: { $eq: slug } }
    };
    const response: APIResponse<T[]> = await fetchAPI(path, params);
    
    if (response.error || !response.data || response.data.length === 0) {
      console.warn(`[${entityName}] Item not found: ${slug}`);
      return null;
    }
    
    return response.data[0];
  } catch (error) {
    console.error(`[${entityName}] Error fetching item ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all articles from Strapi
 */
export async function getArticles(locale: string): Promise<Article[]> {
  const params = {
    populate: ['preview_image', 'category'],
    fields: ['title', 'slug', 'excerpt', 'createdAt', 'author', 'reading_time'],
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Article>('/api/articles', params, 'Articles');
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return fetchStrapiItem<Article>(
    '/api/articles',
    slug,
    ['preview_image', 'category'],
    'Article'
  );
}

/**
 * Fetch all casinos from Strapi
 */
export async function getCasinos(locale: string): Promise<Casino[]> {
  const params = {
    populate: ['logo'],
    fields: ['name', 'shortDescription', 'slug', 'rating', 'bonus_text'],
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    sort: 'rating:desc'
  };
  
  return fetchStrapiData<Casino>('/api/casino-reviews', params, 'Casinos');
}

/**
 * Fetch a single casino review by slug
 */
export async function getCasinoBySlug(slug: string): Promise<Casino | null> {
  return fetchStrapiItem<Casino>(
    '/api/casino-reviews',
    slug,
    ['logo'],
    'Casino'
  );
}

/**
 * Fetch all slots from Strapi
 */
export async function getSlots(locale: string): Promise<Slot[]> {
  const params = {
    populate: ['cover_image'],
    fields: ['name', 'description', 'slug', 'provider', 'rating'],
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    sort: 'rating:desc'
  };
  
  return fetchStrapiData<Slot>('/api/slots', params, 'Slots');
}

/**
 * Fetch a single slot by slug
 */
export async function getSlotBySlug(slug: string): Promise<Slot | null> {
  return fetchStrapiItem<Slot>(
    '/api/slots',
    slug,
    ['cover_image'],
    'Slot'
  );
} 