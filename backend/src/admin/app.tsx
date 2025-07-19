import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'uk',
      'en',
    ],
    translations: {
      uk: {
        "app.components.LeftMenu.navbrand.title": "Chicken Road CMS",
        "app.components.LeftMenu.navbrand.workplace": "Адміністративна панель",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('Chicken Road CMS Admin Panel initialized');
  },
}; 