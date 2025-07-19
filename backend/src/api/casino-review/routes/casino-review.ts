/**
 * casino-review router
 */

import { factories } from '@strapi/strapi';

console.log('🎰 Registering casino-review routes...');

const router = factories.createCoreRouter('api::casino-review.casino-review');

console.log('🎰 Casino-review routes created:', router);

export default router; 