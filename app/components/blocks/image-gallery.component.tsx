import {
  PageBlocksGridGrid_ColumnsBlocksImage_Gallery,
  PageBlocksImage_Gallery
} from '@/tina/__generated__/types';
import Image from 'next/image';
import { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Lightbox from 'yet-another-react-lightbox';

export default function ImageGallery({
  data
}: {
  data: PageBlocksImage_Gallery | PageBlocksGridGrid_ColumnsBlocksImage_Gallery;
}) {
  const [indexLightBox, setIndexLightBox] = useState(-1);
  const width = data.image_gallery_width ?? 350;
  const height = data.image_gallery_height ?? 350;
  return (
    <div data-tina-field={tinaField(data)}>
      <div className={'mb-8 md:mx-auto md:mb-12 text-center'}>
        {data.image_gallery_title && (
          <h2
            className={
              'font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl'
            }
          >
            {data.image_gallery_title}
          </h2>
        )}

        {data.image_gallery_subtitle && (
          <p className={'mt-4 text-muted'}>{data.image_gallery_subtitle}</p>
        )}
      </div>
      <div className='flex gap-4 overflow-x-auto pb-2 flex-nowrap	'>
        {(data.image_gallery_images ?? []).map((image, i) => (
          <Image
            key={i}
            src={image!}
            alt=''
            loading='lazy'
            width={width}
            height={height}
            onClick={() => setIndexLightBox(i)}
            className='cursor-pointer object-cover'
          ></Image>
        ))}
      </div>
      <Lightbox
        open={indexLightBox >= 0}
        index={indexLightBox}
        close={() => setIndexLightBox(-1)}
        slides={(data.image_gallery_images ?? []).map((image, i) => ({
          src: image!
        }))}
      />
    </div>
  );
}
