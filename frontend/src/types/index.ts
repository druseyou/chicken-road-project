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
}

// Interface for Category
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
}

// Interface for License
export interface License extends BaseEntity {
  name: string;
  country: string;
  authority: string;
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
  license: License | null;
  pros: string[];
  cons: string[];
  updatedAt: string;
}

// Interface for Slot
export interface Slot extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  provider: string;
  rating: number;
  cover_image: StrapiMedia;
  features: string[];
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