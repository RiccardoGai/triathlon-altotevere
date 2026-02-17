import { PageBlocksGridGrid_ColumnsBlocksImage, PageBlocksImage } from '@/tina/__generated__/types';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';

export default function ImageBlock({
  data,
}: {
  data: PageBlocksImage | PageBlocksGridGrid_ColumnsBlocksImage;
}) {
  let width = data.width;
  let height = data.height;
  const fill = width && height ? false : true;
  if (fill) {
    width = undefined;
    height = undefined;
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto overflow-hidden">
      <Image
        data-tina-field={tinaField(data)}
        src={data.image_ref}
        width={width ?? undefined}
        height={height ?? undefined}
        fill={fill}
        {...(fill && { sizes: '(max-width: 1024px) 100vw, 1024px' })}
        loading="lazy"
        className="object-cover transition-transform duration-300 rounded-lg shadow-lg"
        alt={data.image_name}
      />
    </div>
  );
}
