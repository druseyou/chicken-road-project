/**
 * category router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::category.category', {
  config: {
    find: {
      middlewares: []
    },
    findOne: {
      middlewares: []
    }
  }
});

// Custom routes
export const customRoutes = [
  {
    method: 'GET',
    path: '/categories/featured',
    handler: 'category.findFeatured',
    config: {
      policies: [],
      middlewares: []
    }
  },
  {
    method: 'GET',
    path: '/categories/:id/stats',
    handler: 'category.getStats',
    config: {
      policies: [],
      middlewares: []
    }
  }
]; 