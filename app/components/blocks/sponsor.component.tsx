import {
  PageBlocksGridGrid_ColumnsBlocksSponsor,
  PageBlocksSponsor
} from '@/tina/__generated__/types';
import Image from 'next/image';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

export default function SponsorBlock({
  data
}: {
  data: PageBlocksSponsor | PageBlocksGridGrid_ColumnsBlocksSponsor;
}) {
  const width = data.sponsor_image_width ?? 350;
  const height = data.sponsor_image_height ?? 350;

  return (
    <div data-tina-field={tinaField(data)}>
      <div className={'mb-8 md:mx-auto md:mb-12 text-center'}>
        {data.sponsor_title && (
          <h2
            className={
              'font-bold leading-tighter tracking-tighter  text-heading text-3xl'
            }
          >
            {data.sponsor_title}
          </h2>
        )}
      </div>
      <div className='flex gap-4 pb-2 flex-wrap	justify-center'>
        {(data.sponsor_image ?? []).map(
          (image, i) =>
            image?.sponsor_image_image &&
            (image?.sponsor_image_href ? (
              <Link
                key={i}
                href={image?.sponsor_image_href ?? '#'}
                target='_blank'
              >
                <Image
                  src={image?.sponsor_image_image!}
                  alt={image?.sponsor_image_name ?? ''}
                  loading='lazy'
                  width={width}
                  height={height}
                  className='cursor-pointer'
                ></Image>
              </Link>
            ) : (
              <Image
                src={image?.sponsor_image_image!}
                alt={image?.sponsor_image_name ?? ''}
                loading='lazy'
                width={width}
                height={height}
              ></Image>
            ))
        )}
      </div>
    </div>
  );
}
