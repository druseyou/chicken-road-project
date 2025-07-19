/**
 * category controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  // Override find method with default population
  async find(ctx) {
    const { query } = ctx;
    
    ctx.query = {
      ...query,
      populate: query.populate || {
        icon: true,
        articles: {
          filters: {
            publishedAt: { $notNull: true }
          },
          fields: ['id', 'title', 'slug'],
          pagination: { limit: 5 }
        },
        slots: {
          filters: {
            publishedAt: { $notNull: true }
          },
          fields: ['id', 'name', 'slug'],
          pagination: { limit: 5 }
        }
      },
      sort: query.sort || 'sort_order:asc,name:asc'
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Override findOne method
  async findOne(ctx) {
    const { query } = ctx;

    ctx.query = {
      ...query,
      populate: query.populate || {
        icon: true,
        articles: {
          filters: {
            publishedAt: { $notNull: true }
          },
          populate: ['preview_image'],
          sort: 'createdAt:desc'
        },
        slots: {
          filters: {
            publishedAt: { $notNull: true }
          },
          populate: ['cover_image'],
          sort: 'rating:desc'
        }
      }
    };

    return await super.findOne(ctx);
  },

  // Custom method to get featured categories
  async findFeatured(ctx) {
    const entities = await strapi.entityService.findMany('api::category.category', {
      filters: {
        is_featured: true,
        publishedAt: { $notNull: true }
      },
      populate: {
        icon: true,
        articles: {
          filters: {
            publishedAt: { $notNull: true }
          },
          fields: ['id'],
          pagination: { limit: 1 }
        },
        slots: {
          filters: {
            publishedAt: { $notNull: true }
          },
          fields: ['id'],
          pagination: { limit: 1 }
        }
      },
      sort: 'sort_order:asc',
      pagination: {
        limit: ctx.query.limit || 6
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  // Get category statistics
  async getStats(ctx) {
    const { id } = ctx.params;
    
    const category = await strapi.entityService.findOne('api::category.category', id, {
      populate: {
        articles: {
          filters: { publishedAt: { $notNull: true } },
          fields: ['id']
        },
        slots: {
          filters: { publishedAt: { $notNull: true } },
          fields: ['id']
        }
      }
    });

    if (!category) {
      return ctx.notFound('Category not found');
    }

    const stats = {
      articles_count: (category as any).articles?.length || 0,
      slots_count: (category as any).slots?.length || 0,
      total_content: ((category as any).articles?.length || 0) + ((category as any).slots?.length || 0)
    };

    return { data: stats };
  }
})); 