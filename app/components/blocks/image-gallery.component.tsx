import {
  PageBlocksGridGrid_ColumnsBlocksImageGallery,
  PageBlocksImageGallery
} from '@/tina/__generated__/types';
import Image from 'next/image';
import { createRef, useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Lightbox from 'yet-another-react-lightbox';
import Button from '../button.component';

export default function ImageGalleryBlock({
  data
}: {
  data: PageBlocksImageGallery | PageBlocksGridGrid_ColumnsBlocksImageGallery;
}) {
  const [indexLightBox, setIndexLightBox] = useState(-1);
  const [indexGridRowClass, setIndexGridRowClass] = useState(0);
  const gridRef = createRef<HTMLDivElement>();
  const [showMore, setShowMore] = useState(false);
  const gridRowClass = [
    'grid-rows-1',
    'grid-rows-2',
    'grid-rows-3',
    'grid-rows-4',
    'grid-rows-5'
  ];

  useEffect(() => {
    if (
      gridRef.current &&
      gridRef.current.clientHeight < gridRef.current.scrollHeight
    ) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [gridRef]);

  return (
    <div data-tina-field={tinaField(data)}>
      <div className={'mb-8 md:mx-auto md:mb-12 text-center'}>
        {data.image_gallery_title && (
          <div
            className={
              'font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl'
            }
          >
            {data.image_gallery_title}
          </div>
        )}

        {data.image_gallery_subtitle && (
          <div className={'mt-4 text-gray-500'}>
            {data.image_gallery_subtitle}
          </div>
        )}
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ${gridRowClass[indexGridRowClass] ?? 'auto-rows-auto'} auto-rows-[0] overflow-y-hidden`}
        ref={gridRef}
      >
        {(data.image_gallery_images ?? []).map((image, i) => (
          <div key={i} className='relative h-32 w-full md:h-64'>
            <Image
              src={image!}
              alt=''
              loading='lazy'
              fill={true}
              onClick={() => setIndexLightBox(i)}
              className='cursor-pointer object-cover rounded-lg border border-gray-200 hover:opacity-90'
            ></Image>
          </div>
        ))}
      </div>
      {showMore && (
        <div className='flex justify-center mt-4'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setIndexGridRowClass((current) => current + 1)}
          >
            Mostra di più
          </Button>
        </div>
      )}
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
