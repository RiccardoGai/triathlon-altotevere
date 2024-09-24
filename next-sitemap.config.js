/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.triathlonaltotevere.it/',
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
