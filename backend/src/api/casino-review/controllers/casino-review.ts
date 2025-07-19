/**
 * casino-review controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::casino-review.casino-review', ({ strapi }) => ({
  // Override find method
  async find(ctx) {
    const { query } = ctx;
    
    // Set default populate
    ctx.query = {
      ...query,
      populate: query.populate || {
        logo: true,
        bonuses: {
          filters: {
            publishedAt: {
              $notNull: true
            }
          }
        },
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
        logo: true,
        bonuses: {
          filters: {
            publishedAt: {
              $notNull: true
            }
          }
        },
        comments: {
          filters: {
            status: 'published'
          }
        }
      }
    };

    return await super.findOne(ctx);
  },

  // Custom method to get top rated casinos
  async findTopRated(ctx) {
    const entities = await strapi.entityService.findMany('api::casino-review.casino-review', {
      filters: {
        rating: {
          $gte: 8
        },
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        logo: true,
        bonuses: {
          filters: {
            publishedAt: {
              $notNull: true
            }
          }
        }
      },
      sort: 'rating:desc',
      pagination: {
        limit: ctx.query.limit || 10
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  },

  // Custom method to get casinos by license
  async findByLicense(ctx) {
    const { license } = ctx.params;
    
    const entities = await strapi.entityService.findMany('api::casino-review.casino-review', {
      filters: {
        license: {
          $containsi: license
        },
        publishedAt: {
          $notNull: true
        }
      },
      populate: {
        logo: true,
        bonuses: true
      },
      sort: 'rating:desc'
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntities);
  }
})); 