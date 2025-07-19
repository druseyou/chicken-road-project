import qs from 'qs';
import { APIResponse } from '@/types';

/**
 * API Error class for better error handling
 */
export class APIError extends Error {
  public status: number;
  public statusText: string;

  constructor(status: number, statusText: string, message?: string) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'APIError';
    this.status = status;
    this.statusText = statusText;
  }
}

/**
 * Get full Strapi URL from path
 */
export function getStrapiURL(path = ''): string {
  const baseUrl = process.env.STRAPI_API_URL || 
                  process.env.NEXT_PUBLIC_STRAPI_API_URL || 
                  'http://localhost:1337';
  return `${baseUrl}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints with proper error handling
 */
export async function fetchAPI<T = any>(
  path: string, 
  urlParamsObject: Record<string, any> = {}, 
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const requestId = Math.random().toString(36).substr(2, 9);
  console.log(`[fetchAPI:${requestId}] Starting request to: ${path}`);

  try {
    // Merge default and user options
    const mergedOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.STRAPI_API_TOKEN && {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
        }),
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, { 
      encodeValuesOnly: true,
      arrayFormat: 'brackets'
    });
    const requestUrl = `${getStrapiURL(path)}${queryString ? `?${queryString}` : ''}`;

    console.log(`[fetchAPI:${requestId}] URL: ${requestUrl}`);

    // Make the request
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      console.error(`[fetchAPI:${requestId}] ${errorMessage}`);
      
      throw new APIError(response.status, response.statusText, errorMessage);
    }

    // Parse response
    const data = await response.json();
    console.log(`[fetchAPI:${requestId}] Success: ${data.data?.length || 'N/A'} items`);
    
    return data as APIResponse<T>;
  } catch (error) {
    console.error(`[fetchAPI:${requestId}] Error:`, error);
    
    // Handle different types of errors
    if (error instanceof APIError) {
      return {
        data: null,
        error: {
          status: error.status,
          message: error.message
        }
      };
    }
    
    // Network or other errors
    return {
      data: null,
      error: {
        status: 500,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    };
  }
} 