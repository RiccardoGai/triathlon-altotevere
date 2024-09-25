export const CONFIG = {
  SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ??
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  APP_NAME: 'Triathlon Altotevere',
  IUBENDA: {
    siteId: 3768958,
    cookiePolicyId: 12131529,
    lang: 'it'
  }
};
