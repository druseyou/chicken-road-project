export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '30d',
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'it',
      locales: ['en', 'uk', 'it'],
    },
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000,
      },
    },
  },
});
