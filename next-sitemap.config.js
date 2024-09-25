const config = require('./app/config/config.ts');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: config.SITE_URL,
  exclude: [''],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/'
      }
    ]
  }
};
