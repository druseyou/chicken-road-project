/**
 * Type definitions for the Chicken Road Casino project
 */

// Utility type for Strapi's media format
export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
} | null;

// Base interface for common entity properties
interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Interface for Category - updated with new fields
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: StrapiMedia;
  meta_title?: string;
  meta_description?: string;
  is_featured: boolean;
  sort_order: number;
  articles?: Article[];
  slots?: Slot[];
}

// Interface for User (Strapi built-in)
export interface User extends BaseEntity {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
}

// Interface for Comment
export interface Comment extends BaseEntity {
  text: string;
  author_name: string;
  author_email: string;
  status: 'published' | 'pending' | 'rejected';
  rating?: number;
  casino_review?: Casino;
  article?: Article;
  slot?: Slot;
}

// Interface for Bonus
export interface Bonus extends BaseEntity {
  name: string;
  slug: string;
  bonus_type: 'deposit' | 'no-deposit' | 'cashback' | 'free-spins' | 'welcome' | 'reload';
  promo_code?: string;
  bonus_amount?: string;
  terms?: string;
  wagering_requirements?: string;
  valid_until?: string;
  meta_title?: string;
  meta_description?: string;
  casino_review: Casino;
}

// Interface for Article
export interface Article extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  preview_image: StrapiMedia;
  meta_title: string;
  meta_description: string;
  author: string;
  excerpt: string;
  category: Category | null;
  tags: string[];
  reading_time: number;
  is_featured: boolean;
  view_count: number;
  comments?: Comment[];
}

// Interface for Casino Review
export interface Casino extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: StrapiMedia;
  rating: number;
  bonus_text: string;
  rtp: number;
  payout_speed: string;
  games_count: number;
  established_date: number;
  detailed_review: string;
  meta_title: string;
  meta_description: string;
  url: string;
  pros: string;
  cons: string;
  license: string;
  languages: string[];
  currencies: string[];
  payment_methods: string[];
  bonuses?: Bonus[];
  comments?: Comment[];
}

// Interface for Slot
export interface Slot extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  provider: string;
  rating: number;
  cover_image: StrapiMedia;
  meta_title: string;
  meta_description: string;
  volatility: 'low' | 'medium' | 'high';
  theme: string;
  demo_link: string;
  rtp: number;
  min_bet: number;
  max_bet: number;
  paylines: number;
  reels: number;
  max_win: number;
  features: string[];
  is_popular: boolean;
  release_date: string;
  category: Category | null;
  comments?: Comment[];
}

// API Response types
export interface APIResponse<T> {
  data: T | null;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    message: string;
  };
}

// Statistics interfaces
export interface CategoryStats {
  articles_count: number;
  slots_count: number;
  total_content: number;
}

export interface CommentStats {
  published: number;
  pending: number;
  rejected: number;
  total: number;
  average_rating: number;
}

// Form interfaces
export interface CommentForm {
  text: string;
  author_name: string;
  author_email: string;
  rating?: number;
  casino_review?: number;
  article?: number;
  slot?: number;
}

// Filter interfaces
export interface BonusFilters {
  bonus_type?: string;
  casino_review?: number;
  valid_only?: boolean;
}

export interface CommentFilters {
  status?: 'published' | 'pending' | 'rejected';
  casino_review?: number;
  article?: number;
  slot?: number;
  rating?: number;
} 