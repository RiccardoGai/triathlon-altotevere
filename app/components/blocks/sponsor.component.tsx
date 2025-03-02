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
    <div data-tina-field={tinaField(data)} className="py-12 bg-gray-100">
      {data.sponsor_title && (
        <div className="mb-8 text-center">
          <h2 className="font-bold text-4xl text-gray-900 leading-tight">{data.sponsor_title}</h2>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-10 px-4 md:px-8">
        {(data.sponsor_image ?? []).map((image, i) =>
          image?.sponsor_image_image ? (
            <div key={i} className="flex flex-col items-center text-center">
              {image?.sponsor_image_href ? (
                <Link
                  href={image?.sponsor_image_href ?? '#'}
                  target="_blank"
                  className="group relative block p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <Image
                    src={image?.sponsor_image_image}
                    alt={image?.sponsor_image_name || ''}
                    loading="lazy"
                    width={width}
                    height={height}
                    className="max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              ) : (
                <div className="relative p-4 rounded-lg bg-white shadow-md">
                  <Image
                    src={image?.sponsor_image_image}
                    alt={image?.sponsor_image_name || ''}
                    loading="lazy"
                    width={width}
                    height={height}
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              )}

              {image?.sponsor_image_name &&
                (image?.sponsor_image_href ? (
                  <Link
                    href={image.sponsor_image_href}
                    target="_blank"
                    className="mt-2 text-sm font-medium text-primary hover:underline underline-offset-2 flex items-center gap-1 transition-colors duration-200"
                  >
                    {image.sponsor_image_name}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm font-medium text-gray-700">{image.sponsor_image_name}</p>
                ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
