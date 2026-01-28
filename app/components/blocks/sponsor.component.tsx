import { PageBlocksGridGrid_ColumnsBlocksSponsor, PageBlocksSponsor } from '@/tina/__generated__/types';
import Image from 'next/image';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

export default function SponsorBlock({
  data,
}: {
  data: PageBlocksSponsor | PageBlocksGridGrid_ColumnsBlocksSponsor;
}) {
  const width = data.sponsor_image_width ?? 200;
  const height = data.sponsor_image_height ?? 200;

  return (
    <div data-tina-field={tinaField(data)} className="py-16 md:py-20">
      {/* Header */}
      {data.sponsor_title && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {data.sponsor_title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
        </div>
      )}

      {/* Sponsor grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-4 md:px-8">
        {(data.sponsor_image ?? []).map((image, i) =>
          image?.sponsor_image_image ? (
            <div
              key={i}
              className="group relative bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center border-2 border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              {image?.sponsor_image_href ? (
                <Link
                  href={image?.sponsor_image_href ?? '#'}
                  target="_blank"
                  className="flex-grow flex items-center justify-center w-full"
                >
                  <Image
                    src={image?.sponsor_image_image}
                    alt={image?.sponsor_image_name || ''}
                    loading="lazy"
                    width={width}
                    height={height}
                    className="object-contain w-full h-auto max-h-20 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  />
                </Link>
              ) : (
                <div className="flex-grow flex items-center justify-center w-full">
                  <Image
                    src={image?.sponsor_image_image}
                    alt={image?.sponsor_image_name || ''}
                    loading="lazy"
                    width={width}
                    height={height}
                    className="object-contain w-full h-auto max-h-20 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              )}

              {image?.sponsor_image_name && (
                <div className="mt-4 pt-3 border-t border-gray-100 w-full">
                  {image?.sponsor_image_href ? (
                    <Link
                      href={image.sponsor_image_href}
                      target="_blank"
                      className="text-xs font-bold text-gray-500 group-hover:text-primary uppercase tracking-wider transition-colors duration-200"
                    >
                      {image.sponsor_image_name}
                    </Link>
                  ) : (
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {image.sponsor_image_name}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
