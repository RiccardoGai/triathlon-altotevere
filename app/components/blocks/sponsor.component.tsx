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
    <div data-tina-field={tinaField(data)}>
      {data.sponsor_title && (
        <div className="mb-8 text-center">
          <h2 className="font-bold text-2xl text-gray-900 leading-tight">{data.sponsor_title}</h2>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-8">
        {(data.sponsor_image ?? []).map((image, i) =>
          image?.sponsor_image_image ? (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-4 min-h-full"
            >
              {image?.sponsor_image_href ? (
                <Link
                  href={image?.sponsor_image_href ?? '#'}
                  target="_blank"
                  className="group relative flex-grow flex items-center"
                >
                  <Image
                    src={image?.sponsor_image_image}
                    alt={image?.sponsor_image_name || ''}
                    loading="lazy"
                    width={width}
                    height={height}
                    className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              ) : (
                <div className="relative flex-grow flex items-center">
                  <Image
                    src={image?.sponsor_image_image}
                    alt={image?.sponsor_image_name || ''}
                    loading="lazy"
                    width={width}
                    height={height}
                    className="object-contain w-full h-auto"
                  />
                </div>
              )}

              {image?.sponsor_image_name && (
                <div className="mt-2">
                  {image?.sponsor_image_href ? (
                    <Link
                      href={image.sponsor_image_href}
                      target="_blank"
                      className="text-sm font-medium text-primary hover:underline underline-offset-2 flex items-center gap-1 transition-colors duration-200"
                    >
                      {image.sponsor_image_name}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium text-gray-700">{image.sponsor_image_name}</p>
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
