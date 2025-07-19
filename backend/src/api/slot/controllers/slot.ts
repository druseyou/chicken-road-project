/**
 * slot controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::slot.slot', ({ strapi }) => ({
  // Override find method
  async find(ctx) {
    const { query } = ctx;
    
    // Set default populate
    ctx.query = {
      ...query,
      populate: query.populate || {
        cover_image: true,
        category: true,
        comments: {
          filters: {
            status: 'published'
          }
        }
      },
      sort: query.sort || 'rating:desc'
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
        cover_image: true,
        category: true,
        comments: {
          filters: {
            status: 'published'
          }
        }
      }
    };

    return await super.findOne(ctx);
  },

  // Custom method to get popular slots
  async findPopular(ctx) {
    const entities = await strapi.entityService.findMany('api::slot.slot', {
      filters: {
        is_popular: true,
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        cover_image: true,
        category: true
      },
      sort: 'rating:desc',
      pagination: {
        limit: ctx.query.limit || 12
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  },

  // Custom method to get slots by provider
  async findByProvider(ctx) {
    const { provider } = ctx.params;
    
    const entities = await strapi.entityService.findMany('api::slot.slot', {
      filters: {
        provider: {
          $containsi: provider
        },
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        cover_image: true,
        category: true
      },
      sort: 'rating:desc'
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  },

  // Custom method to get high RTP slots
  async findHighRTP(ctx) {
    const entities = await strapi.entityService.findMany('api::slot.slot', {
      filters: {
        rtp: {
          $gte: 96
        },
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        cover_image: true,
        category: true
      },
      sort: 'rtp:desc',
      pagination: {
        limit: ctx.query.limit || 12
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  }
})); 