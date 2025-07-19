export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: env.bool('IS_PROXIED', false),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  admin: {
    url: env('PUBLIC_ADMIN_URL', '/admin'),
    serveAdminPanel: env.bool('SERVE_ADMIN', true),
    autoOpen: false,
    watchIgnoreFiles: [
      './src/**/*.ts',
      './dist/**',
    ],
    forgotPassword: {
      enabled: env.bool('FORGOT_PASSWORD_ENABLED', true),
      from: env('FORGOT_PASSWORD_FROM', 'noreply@strapi.io'),
      replyTo: env('FORGOT_PASSWORD_REPLY_TO', 'noreply@strapi.io'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  logger: {
    level: env('LOG_LEVEL', 'info'),
    requests: env.bool('LOG_REQUESTS', false),
  },
});
