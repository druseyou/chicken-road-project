/**
 * bonus controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::bonus.bonus', ({ strapi }) => ({
  // Override find method with default population
  async find(ctx) {
    const { query } = ctx;
    
    const baseFilters = {
      publishedAt: { $notNull: true },
      // Only show active bonuses (not expired)
      $or: [
        { valid_until: { $null: true } },
        { valid_until: { $gte: new Date().toISOString() } }
      ]
    };

    ctx.query = {
      ...query,
      populate: query.populate || {
        casino_review: {
          fields: ['name', 'slug', 'rating'],
          populate: ['logo']
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
          populate: ['logo']
        }
      }
    };

    return await super.findOne(ctx);
  },

  // Get bonuses by type
  async findByType(ctx) {
    const { type } = ctx.params;
    const validTypes = ['deposit', 'no-deposit', 'cashback', 'free-spins', 'welcome', 'reload'];
    
    if (!validTypes.includes(type)) {
      return ctx.badRequest('Invalid bonus type');
    }

    const entities = await strapi.entityService.findMany('api::bonus.bonus', {
      filters: {
        bonus_type: type,
        publishedAt: { $notNull: true },
        $or: [
          { valid_until: { $null: true } },
          { valid_until: { $gte: new Date().toISOString() } }
        ]
      },
      populate: {
        casino_review: {
          fields: ['name', 'slug', 'rating'],
          populate: ['logo']
        }
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 20
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  // Get featured bonuses (highest value or most popular)
  async findFeatured(ctx) {
    const entities = await strapi.entityService.findMany('api::bonus.bonus', {
      filters: {
        publishedAt: { $notNull: true },
        $or: [
          { valid_until: { $null: true } },
          { valid_until: { $gte: new Date().toISOString() } }
        ]
      },
      populate: {
        casino_review: {
          fields: ['name', 'slug', 'rating'],
          populate: ['logo']
        }
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 6
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  // Get bonuses for specific casino
  async findByCasino(ctx) {
    const { casinoId } = ctx.params;

    const entities = await strapi.entityService.findMany('api::bonus.bonus', {
      filters: {
        casino_review: { id: casinoId },
        publishedAt: { $notNull: true },
        $or: [
          { valid_until: { $null: true } },
          { valid_until: { $gte: new Date().toISOString() } }
        ]
      },
      populate: {
        casino_review: {
          fields: ['name', 'slug', 'rating'],
          populate: ['logo']
        }
      },
      sort: 'createdAt:desc'
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  }
})); 