/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  // Override find method to include relations and optimize queries
  async find(ctx) {
    const { query } = ctx;
    
    // Set default populate
    ctx.query = {
      ...query,
      populate: query.populate || {
        preview_image: true,
        category: true,
        comments: {
          filters: {
            status: 'published'
          }
        }
      },
      sort: query.sort || 'createdAt:desc'
    };

    // Call the default core action
    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  // Override findOne method
  async findOne(ctx) {
    const { query } = ctx;

    ctx.query = {
      ...query,
      populate: query.populate || {
        preview_image: true,
        category: true,
        comments: {
          filters: {
            status: 'published'
          }
        }
      }
    };

    const entity = await super.findOne(ctx);

    // Increment view count
    if (entity.data) {
      await strapi.entityService.update('api::article.article', entity.data.id, {
        data: {
          view_count: (entity.data.attributes.view_count || 0) + 1
        }
      });
    }

    return entity;
  },

  // Custom method to get featured articles
  async findFeatured(ctx) {
    const entities = await strapi.entityService.findMany('api::article.article', {
      filters: {
        is_featured: true,
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        preview_image: true,
        category: true
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 6
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  },

  // Custom method to get popular articles
  async findPopular(ctx) {
    const entities = await strapi.entityService.findMany('api::article.article', {
      filters: {
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        preview_image: true,
        category: true
      },
      sort: 'view_count:desc',
      pagination: {
        limit: ctx.query.limit || 6
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  }
})); 