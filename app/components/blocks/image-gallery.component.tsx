import {
  PageBlocksGridGrid_ColumnsBlocksImageGallery,
  PageBlocksImageGallery,
} from '@/tina/__generated__/types';
import Image from 'next/image';
import { createRef, useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Lightbox from 'yet-another-react-lightbox';
import Button from '../button.component';

export default function ImageGalleryBlock({
  data,
}: {
  data: PageBlocksImageGallery | PageBlocksGridGrid_ColumnsBlocksImageGallery;
}) {
  const [indexLightBox, setIndexLightBox] = useState(-1);
  const gridRef = createRef<HTMLDivElement>();
  const [showMore, setShowMore] = useState(false);
  const [visibleRows, setVisibleRows] = useState(
    data.image_gallery_show_more_button ? 2 : Number.MAX_SAFE_INTEGER
  );

  useEffect(() => {
    setTimeout(() => {
      if (gridRef.current && gridRef.current.clientHeight < gridRef.current.scrollHeight) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }, 100);
  }, [gridRef, visibleRows]);

  return (
    <div data-tina-field={tinaField(data)} className="py-12">
      <div className="mb-8 text-center">
        {data.image_gallery_title && (
          <h2 className="text-4xl font-bold text-gray-900">{data.image_gallery_title}</h2>
        )}
        {data.image_gallery_subtitle && (
          <p className="mt-2 text-lg text-gray-600">{data.image_gallery_subtitle}</p>
        )}
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-8 transition-all duration-300`}
        style={{
          gridAutoRows: 'minmax(auto, 200px)',
          maxHeight: `${visibleRows * 220}px`,
          overflow: 'hidden',
        }}
      >
        {(data.image_gallery_images ?? []).map((image, i) => (
          <div key={i} className="relative h-40 md:h-56 lg:h-64 w-full">
            <Image
              src={image!}
              alt=""
              loading="lazy"
              fill={true}
              onClick={() => setIndexLightBox(i)}
              className="cursor-pointer object-cover rounded-lg border border-gray-200 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            />
          </div>
        ))}
      </div>

      {showMore && data.image_gallery_show_more_button && (
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="primary"
            onClick={() => setVisibleRows((prev) => prev + 1000)}
            className="px-6 py-2 text-lg"
          >
            Mostra di più
          </Button>
        </div>
      )}

      <Lightbox
        open={indexLightBox >= 0}
        index={indexLightBox}
        close={() => setIndexLightBox(-1)}
        slides={(data.image_gallery_images ?? []).map((image) => ({ src: image! }))}
      />
    </div>
  );
}
