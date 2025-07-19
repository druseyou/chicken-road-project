import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    console.log('🔧 Registering API routes...');
    console.log('📋 Strapi server initialized');
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap: async ({ strapi }: { strapi: Core.Strapi }) => {
    console.log('🚀 Chicken Road CMS Bootstrap started');
    
    // Перевіряємо, чи існують контент-типи
    try {
      const contentTypes = await strapi.db.query('strapi::content-type').findMany();
      console.log('📋 Available content types:', contentTypes.map(ct => ct.apiID));
      
      const casinoReviewType = contentTypes.find(ct => ct.apiID === 'casino-review');
      console.log('🎰 Casino Review content type exists:', !!casinoReviewType);
      
      if (casinoReviewType) {
        console.log('🎰 Casino Review content type details:', {
          apiID: casinoReviewType.apiID,
          kind: casinoReviewType.kind,
          collectionName: casinoReviewType.collectionName
        });
      }
    } catch (error) {
      console.log('❌ Error checking content types:', error);
    }
    
    // Налаштування дозволів для Public ролі
    const publicRoleId = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
      select: ['id']
    });

    // Налаштування дозволів для Authenticated ролі
    const authenticatedRoleId = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' },
      select: ['id']
    });

    console.log('📋 Public Role ID:', publicRoleId?.id);
    console.log('🔐 Authenticated Role ID:', authenticatedRoleId?.id);

    if (publicRoleId) {
      const publicPermissions = [
        // Casino Review permissions
        {
          action: 'api::casino-review.casino-review.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::casino-review.casino-review.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        // Slot permissions
        {
          action: 'api::slot.slot.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::slot.slot.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        // Article permissions
        {
          action: 'api::article.article.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::article.article.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        // Bonus permissions
        {
          action: 'api::bonus.bonus.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::bonus.bonus.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        // Comment permissions
        {
          action: 'api::comment.comment.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::comment.comment.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::comment.comment.create',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        // Category permissions
        {
          action: 'api::category.category.find',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
        {
          action: 'api::category.category.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: publicRoleId.id,
        },
      ];

      // Створюємо дозволи для публічної ролі якщо їх ще немає
      for (const permission of publicPermissions) {
        const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: {
            action: permission.action,
            role: permission.role,
          },
        });

        if (!existingPermission) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: permission,
          });
          console.log(`✅ Created public permission: ${permission.action}`);
        }
      }
    }

    if (authenticatedRoleId) {
      const authenticatedPermissions = [
        // Casino Review permissions
        {
          action: 'api::casino-review.casino-review.find',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::casino-review.casino-review.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::casino-review.casino-review.create',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::casino-review.casino-review.update',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::casino-review.casino-review.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        // Slot permissions
        {
          action: 'api::slot.slot.find',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::slot.slot.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::slot.slot.create',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::slot.slot.update',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::slot.slot.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        // Article permissions
        {
          action: 'api::article.article.find',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::article.article.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::article.article.create',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::article.article.update',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::article.article.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        // Bonus permissions
        {
          action: 'api::bonus.bonus.find',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::bonus.bonus.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::bonus.bonus.create',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::bonus.bonus.update',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::bonus.bonus.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        // Comment permissions
        {
          action: 'api::comment.comment.find',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::comment.comment.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::comment.comment.create',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::comment.comment.update',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::comment.comment.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        // Category permissions
        {
          action: 'api::category.category.find',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::category.category.findOne',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::category.category.create',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::category.category.update',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
        {
          action: 'api::category.category.delete',
          subject: null,
          properties: {},
          conditions: [],
          role: authenticatedRoleId.id,
        },
      ];

      // Створюємо дозволи для авторизованої ролі якщо їх ще немає
      for (const permission of authenticatedPermissions) {
        const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: {
            action: permission.action,
            role: permission.role,
          },
        });

        if (!existingPermission) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: permission,
          });
          console.log(`✅ Created authenticated permission: ${permission.action}`);
        }
      }
    }

    console.log('🎉 Chicken Road CMS Bootstrap completed');
  },
};
