import {
  PageBlocksGridGrid_ColumnsBlocksSponsor,
  PageBlocksSponsor
} from '@/tina/__generated__/types';
import Image from 'next/image';
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
        {(data.sponsor_image ?? []).map((image, i) => (
          <Image
            key={i}
            src={image!}
            alt=''
            loading='lazy'
            width={width}
            height={height}
            className='cursor-pointer'
          ></Image>
        ))}
      </div>
    </div>
  );
}
