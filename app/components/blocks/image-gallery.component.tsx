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
    <div data-tina-field={tinaField(data)} className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        {data.image_gallery_title && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {data.image_gallery_title}
          </h2>
        )}
        {data.image_gallery_subtitle && (
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{data.image_gallery_subtitle}</p>
        )}
        <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </div>

      {/* Gallery grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-4 md:px-8 transition-all duration-500"
        style={{
          gridAutoRows: 'minmax(auto, 200px)',
          maxHeight: `${visibleRows * 220}px`,
          overflow: 'hidden',
        }}
      >
        {(data.image_gallery_images ?? []).map((image, i) => (
          <div
            key={i}
            className="group relative h-40 md:h-56 lg:h-64 w-full overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setIndexLightBox(i)}
          >
            <Image
              src={image!}
              alt=""
              loading="lazy"
              fill={true}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-all duration-500 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      {showMore && data.image_gallery_show_more_button && (
        <div className="flex justify-center mt-10">
          <Button
            type="button"
            variant="tertiary"
            onClick={() => setVisibleRows((prev) => prev + 1000)}
          >
            <span>Mostra altre foto</span>
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
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
