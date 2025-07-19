import { fetchAPI } from './api';
import { 
  Article, 
  Casino, 
  Slot, 
  Category, 
  Bonus, 
  Comment, 
  User,
  APIResponse,
  CategoryStats,
  CommentStats,
  CommentForm,
  BonusFilters,
  CommentFilters
} from '@/types';

/**
 * Generic function to fetch data from Strapi with error handling and locale support
 */
async function fetchStrapiData<T>(
  path: string, 
  params: Record<string, any> = {},
  entityName: string,
  locale?: string
): Promise<T[]> {
  try {
    console.log(`[${entityName}] Fetching from: ${path}`);
    
    // Add locale parameter if provided
    const finalParams = locale ? { ...params, locale } : params;
    
    const response: APIResponse<T[]> = await fetchAPI(path, finalParams);
    
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
 * Generic function to fetch single item by slug with locale support
 */
async function fetchStrapiItem<T>(
  path: string,
  slug: string,
  populate: string[] = [],
  entityName: string,
  locale?: string
): Promise<T | null> {
  try {
    const params: Record<string, any> = {
      populate,
      filters: { slug: { $eq: slug } }
    };
    
    // Add locale parameter if provided
    if (locale) {
      params.locale = locale;
    }
    
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

// ===================== ARTICLES =====================

/**
 * Fetch all articles from Strapi
 */
export async function getArticles(locale: string): Promise<Article[]> {
  const params = {
    populate: ['preview_image', 'category'],
    fields: ['title', 'slug', 'excerpt', 'createdAt', 'author', 'reading_time', 'is_featured', 'view_count'],
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Article>('/api/articles', params, 'Articles', locale);
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string, locale: string): Promise<Article | null> {
  return fetchStrapiItem<Article>(
    '/api/articles',
    slug,
    ['preview_image', 'category', 'comments'],
    'Article',
    locale
  );
}

/**
 * Fetch featured articles
 */
export async function getFeaturedArticles(locale: string, limit: number = 6): Promise<Article[]> {
  const params = {
    populate: ['preview_image', 'category'],
    filters: { is_featured: true },
    fields: ['title', 'slug', 'excerpt', 'createdAt', 'author'],
    'pagination[limit]': limit,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Article>('/api/articles', params, 'Featured Articles', locale);
}

// ===================== CASINOS =====================

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
  
  return fetchStrapiData<Casino>('/api/casino-reviews', params, 'Casinos', locale);
}

/**
 * Fetch a single casino review by slug
 */
export async function getCasinoBySlug(slug: string, locale: string): Promise<Casino | null> {
  return fetchStrapiItem<Casino>(
    '/api/casino-reviews',
    slug,
    ['logo', 'bonuses', 'comments'],
    'Casino',
    locale
  );
}

// ===================== SLOTS =====================

/**
 * Fetch all slots from Strapi
 */
export async function getSlots(locale: string): Promise<Slot[]> {
  const params = {
    populate: ['cover_image', 'category'],
    fields: ['name', 'description', 'slug', 'provider', 'rating', 'rtp', 'volatility'],
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    sort: 'rating:desc'
  };
  
  return fetchStrapiData<Slot>('/api/slots', params, 'Slots', locale);
}

/**
 * Fetch a single slot by slug
 */
export async function getSlotBySlug(slug: string, locale: string): Promise<Slot | null> {
  return fetchStrapiItem<Slot>(
    '/api/slots',
    slug,
    ['cover_image', 'category', 'comments'],
    'Slot',
    locale
  );
}

/**
 * Fetch popular slots
 */
export async function getPopularSlots(locale: string, limit: number = 6): Promise<Slot[]> {
  const params = {
    populate: ['cover_image'],
    filters: { is_popular: true },
    fields: ['name', 'slug', 'provider', 'rating', 'rtp'],
    'pagination[limit]': limit,
    sort: 'rating:desc'
  };
  
  return fetchStrapiData<Slot>('/api/slots', params, 'Popular Slots', locale);
}

// ===================== CATEGORIES =====================

/**
 * Fetch all categories
 */
export async function getCategories(locale: string): Promise<Category[]> {
  const params = {
    populate: ['icon'],
    fields: ['name', 'slug', 'description', 'color', 'is_featured', 'sort_order'],
    sort: 'sort_order:asc,name:asc'
  };
  
  return fetchStrapiData<Category>('/api/categories', params, 'Categories', locale);
}

/**
 * Fetch featured categories
 */
export async function getFeaturedCategories(locale: string, limit: number = 6): Promise<Category[]> {
  const params = {
    populate: ['icon'],
    filters: { is_featured: true },
    fields: ['name', 'slug', 'description', 'color'],
    'pagination[limit]': limit,
    sort: 'sort_order:asc'
  };
  
  return fetchStrapiData<Category>('/api/categories/featured', params, 'Featured Categories', locale);
}

/**
 * Fetch category by slug
 */
export async function getCategoryBySlug(slug: string, locale: string): Promise<Category | null> {
  return fetchStrapiItem<Category>(
    '/api/categories',
    slug,
    ['icon', 'articles', 'slots'],
    'Category',
    locale
  );
}

/**
 * Fetch category statistics
 */
export async function getCategoryStats(id: number, locale: string): Promise<CategoryStats | null> {
  try {
         const response: APIResponse<CategoryStats> = await fetchAPI(`/api/categories/${id}/stats`, { locale });
    return response.data;
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return null;
  }
}

// ===================== BONUSES =====================

/**
 * Fetch bonuses with optional filters and locale
 */
export async function getBonuses(filters: BonusFilters = {}, locale: string): Promise<Bonus[]> {
  const params: Record<string, any> = {
    populate: ['casino_review.logo'],
    fields: ['name', 'slug', 'bonus_type', 'bonus_amount', 'promo_code', 'valid_until'],
    'pagination[page]': 1,
    'pagination[pageSize]': 20,
    sort: 'createdAt:desc'
  };

  if (filters.bonus_type) {
    params.filters = { bonus_type: filters.bonus_type };
  }

  if (filters.casino_review) {
    params.filters = { 
      ...params.filters, 
      casino_review: { id: filters.casino_review } 
    };
  }
  
  return fetchStrapiData<Bonus>('/api/bonuses', params, 'Bonuses', locale);
}

/**
 * Fetch bonus by slug
 */
export async function getBonusBySlug(slug: string, locale: string): Promise<Bonus | null> {
  return fetchStrapiItem<Bonus>(
    '/api/bonuses',
    slug,
    ['casino_review.logo'],
    'Bonus',
    locale
  );
}

/**
 * Fetch bonuses by type
 */
export async function getBonusesByType(type: string, limit: number = 10, locale: string): Promise<Bonus[]> {
  const params = {
    populate: ['casino_review.logo'],
    fields: ['name', 'slug', 'bonus_amount', 'promo_code', 'valid_until'],
    'pagination[limit]': limit,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Bonus>(`/api/bonuses/type/${type}`, params, `${type} Bonuses`, locale);
}

/**
 * Fetch featured bonuses
 */
export async function getFeaturedBonuses(locale: string, limit: number = 6): Promise<Bonus[]> {
  const params = {
    populate: ['casino_review.logo'],
    fields: ['name', 'slug', 'bonus_amount', 'promo_code'],
    'pagination[limit]': limit
  };
  
  return fetchStrapiData<Bonus>('/api/bonuses/featured', params, 'Featured Bonuses', locale);
}

/**
 * Fetch bonuses for specific casino
 */
export async function getBonusesByCasino(casinoId: number, locale: string): Promise<Bonus[]> {
  const params = {
    populate: ['casino_review'],
    fields: ['name', 'slug', 'bonus_type', 'bonus_amount', 'promo_code', 'valid_until'],
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Bonus>(`/api/bonuses/casino/${casinoId}`, params, 'Casino Bonuses', locale);
}

// ===================== COMMENTS =====================

/**
 * Fetch comments with filters
 */
export async function getComments(filters: CommentFilters = {}, locale: string): Promise<Comment[]> {
  const params: Record<string, any> = {
    populate: ['casino_review', 'article', 'slot'],
    fields: ['text', 'author_name', 'rating', 'createdAt'],
    'pagination[page]': 1,
    'pagination[pageSize]': 20,
    sort: 'createdAt:desc'
  };

  if (filters.casino_review) {
    params.filters = { casino_review: { id: filters.casino_review } };
  }

  if (filters.article) {
    params.filters = { ...params.filters, article: { id: filters.article } };
  }

  if (filters.slot) {
    params.filters = { ...params.filters, slot: { id: filters.slot } };
  }

  if (filters.rating) {
    params.filters = { ...params.filters, rating: { $gte: filters.rating } };
  }
  
  return fetchStrapiData<Comment>('/api/comments', params, 'Comments', locale);
}

/**
 * Fetch comments for specific casino
 */
export async function getCommentsByCasino(casinoId: number, limit: number = 10, locale: string): Promise<Comment[]> {
  const params = {
    populate: ['casino_review'],
    fields: ['text', 'author_name', 'rating', 'createdAt'],
    'pagination[limit]': limit,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Comment>(`/api/comments/casino/${casinoId}`, params, 'Casino Comments', locale);
}

/**
 * Fetch comments for specific article
 */
export async function getCommentsByArticle(articleId: number, limit: number = 10, locale: string): Promise<Comment[]> {
  const params = {
    populate: ['article'],
    fields: ['text', 'author_name', 'rating', 'createdAt'],
    'pagination[limit]': limit,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Comment>(`/api/comments/article/${articleId}`, params, 'Article Comments', locale);
}

/**
 * Fetch comments for specific slot
 */
export async function getCommentsBySlot(slotId: number, limit: number = 10, locale: string): Promise<Comment[]> {
  const params = {
    populate: ['slot'],
    fields: ['text', 'author_name', 'rating', 'createdAt'],
    'pagination[limit]': limit,
    sort: 'createdAt:desc'
  };
  
  return fetchStrapiData<Comment>(`/api/comments/slot/${slotId}`, params, 'Slot Comments', locale);
}

/**
 * Create new comment
 */
export async function createComment(commentData: CommentForm, locale: string): Promise<Comment | null> {
  try {
         const response: APIResponse<Comment> = await fetchAPI('/api/comments', { locale });
    
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    return null;
  }
}

/**
 * Fetch comments statistics
 */
export async function getCommentsStats(locale: string): Promise<CommentStats | null> {
  try {
         const response: APIResponse<CommentStats> = await fetchAPI('/api/comments/stats', { locale });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments stats:', error);
    return null;
  }
}

// ===================== USERS =====================

/**
 * Fetch current user profile (requires authentication)
 */
export async function getCurrentUser(locale: string): Promise<User | null> {
  try {
         const response: APIResponse<User> = await fetchAPI('/api/users/me', { locale });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
} 