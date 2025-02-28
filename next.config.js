/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mep-agency/next-iubenda'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '**'
      }
    ],
    // loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  async headers() {
    const headers = [];
    if (
      ['preview', 'development'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV)
    ) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex'
          }
        ],
        source: '/:path*'
      });
    }
    return headers;
  }
};

module.exports = nextConfig;
