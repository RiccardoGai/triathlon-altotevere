/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
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
  },
  //transpilePackages: ['next-image-export-optimizer'],
  env: {
    // nextImageExportOptimizer_imageFolderPath: 'public/uploads',
    // nextImageExportOptimizer_exportFolderPath: 'out',
    // nextImageExportOptimizer_quality: '70',
    // nextImageExportOptimizer_storePicturesInWEBP: 'true',
    // nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    // nextImageExportOptimizer_generateAndUseBlurImages: 'true'
  }
};

module.exports = nextConfig;
