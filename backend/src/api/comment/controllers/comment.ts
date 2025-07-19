/**
 * comment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
  // Override find method - only show published comments
  async find(ctx) {
    const { query } = ctx;
    
    const baseFilters = {
      status: 'published',
      publishedAt: { $notNull: true }
    };
    
    ctx.query = {
      ...query,
      populate: query.populate || {
        casino_review: {
          fields: ['name', 'slug']
        },
        article: {
          fields: ['title', 'slug']
        },
        slot: {
          fields: ['name', 'slug']
        }
      },
      filters: query.filters ? Object.assign({}, query.filters, baseFilters) : baseFilters,
      sort: query.sort || 'createdAt:desc'
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
        casino_review: {
          fields: ['name', 'slug']
        },
        article: {
          fields: ['title', 'slug']
        },
        slot: {
          fields: ['name', 'slug']
        }
      },
      filters: {
        status: 'published'
      }
    };

    return await super.findOne(ctx);
  },

  // Create new comment (goes to pending status by default)
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // Force status to pending for new comments
    const commentData = {
      ...data,
      status: 'pending'
    };

    const entity = await strapi.entityService.create('api::comment.comment', {
      data: commentData,
      populate: {
        casino_review: {
          fields: ['name', 'slug']
        },
        article: {
          fields: ['title', 'slug']
        },
        slot: {
          fields: ['name', 'slug']
        }
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  // Get comments for specific casino
  async findByCasino(ctx) {
    const { casinoId } = ctx.params;

    const entities = await strapi.entityService.findMany('api::comment.comment', {
      filters: {
        casino_review: { id: casinoId },
        status: 'published',
        publishedAt: { $notNull: true }
      },
      populate: {
        casino_review: {
          fields: ['name', 'slug']
        }
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 10
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  // Get comments for specific article
  async findByArticle(ctx) {
    const { articleId } = ctx.params;

    const entities = await strapi.entityService.findMany('api::comment.comment', {
      filters: {
        article: { id: articleId },
        status: 'published',
        publishedAt: { $notNull: true }
      },
      populate: {
        article: {
          fields: ['title', 'slug']
        }
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 10
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  // Get comments for specific slot
  async findBySlot(ctx) {
    const { slotId } = ctx.params;

    const entities = await strapi.entityService.findMany('api::comment.comment', {
      filters: {
        slot: { id: slotId },
        status: 'published',
        publishedAt: { $notNull: true }
      },
      populate: {
        slot: {
          fields: ['name', 'slug']
        }
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 10
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  // Get comments statistics
  async getStats(ctx) {
    const publishedCount = await strapi.entityService.count('api::comment.comment', {
      filters: { status: 'published' }
    });

    const pendingCount = await strapi.entityService.count('api::comment.comment', {
      filters: { status: 'pending' }
    });

    const rejectedCount = await strapi.entityService.count('api::comment.comment', {
      filters: { status: 'rejected' }
    });

    // Get average rating
    const comments = await strapi.entityService.findMany('api::comment.comment', {
      filters: { 
        status: 'published',
        rating: { $notNull: true }
      },
      fields: ['rating']
    });

    const averageRating = comments.length > 0 
      ? comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) / comments.length
      : 0;

    return {
      data: {
        published: publishedCount,
        pending: pendingCount,
        rejected: rejectedCount,
        total: publishedCount + pendingCount + rejectedCount,
        average_rating: Math.round(averageRating * 10) / 10
      }
    };
  }
})); 