/**
 * Custom Next.js image loader that leverages Cloudinary's on-the-fly
 * transformations to serve correctly-sized, optimised images — for free
 * (within the Cloudinary plan limits) and without Vercel Image Optimization.
 *
 * For every `<Image>` component Next.js calls this loader with the requested
 * `width` (derived from `sizes` + `deviceSizes`/`imageSizes` in next.config).
 * We inject Cloudinary transformation parameters into the URL so the CDN
 * delivers the image at exactly the right size, in the best format (WebP/AVIF)
 * and with automatic quality.
 *
 * ## Smart crop support
 *
 * Append query parameters to the `src` to enable Cloudinary's smart-crop:
 *
 *   `src={`${url}?_ar=16:9`}`
 *
 * Supported params (prefixed with `_` to avoid clashes):
 *   - `_ar`   — aspect ratio (e.g. `16:9`, `2.5`)
 *   - `_crop` — crop mode (default: `fill` when `_ar` is set)
 *   - `_g`    — gravity (default: `auto` = AI-based smart crop)
 */

interface CloudinaryLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderParams): string {
  // Only transform Cloudinary URLs
  if (!src.includes('res.cloudinary.com')) {
    return `${src}?w=${width}&q=${quality ?? 75}`;
  }

  // Parse optional hint params from the src query string
  let cleanSrc = src;
  let aspectRatio: string | null = null;
  let cropMode: string | null = null;
  let gravity: string | null = null;

  const qsIndex = src.indexOf('?');
  if (qsIndex !== -1) {
    const searchParams = new URLSearchParams(src.slice(qsIndex));
    aspectRatio = searchParams.get('_ar');
    cropMode = searchParams.get('_crop');
    gravity = searchParams.get('_g');
    cleanSrc = src.slice(0, qsIndex);
  }

  const params = [
    'f_auto', // Best format (WebP / AVIF) for the browser
    `q_${quality ?? 'auto'}`, // Automatic quality or explicit quality
    `w_${width}`, // Width requested by the browser
  ];

  if (aspectRatio) {
    // Smart crop: fill to exact aspect ratio using AI gravity
    params.push(`ar_${aspectRatio}`);
    params.push(`c_${cropMode ?? 'fill'}`);
    params.push(`g_${gravity ?? 'auto'}`);
  } else {
    params.push('c_limit'); // Don't upscale, only downscale
  }

  // Insert transformation params right after "/upload/"
  // Cloudinary URL pattern: .../image/upload/[existing_transforms/]v123/path.ext
  return cleanSrc.replace(/\/image\/upload\//, `/image/upload/${params.join(',')}/`);
}
