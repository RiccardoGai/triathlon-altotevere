import {
  PageBlocksGrid,
  PageBlocksGridGrid_ColumnsBlocks
} from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import ContactFormBlock from './contact-form.component';
import ContactInfoBlock from './contact-info.component';
import ImageGallery from './image-gallery.component';
import ImageBlock from './image.component';
import PriceBlock from './price.component';
import RichTextBlock from './rich-text.component';
import SponsorBlock from './sponsor.component';
import StaffBlock from './staff.component';
import VideoBlock from './video.component';

export default function GridBlock({ data }: { data: PageBlocksGrid }) {
  const widthClass = {
    '25%': `col-span-1`,
    '50%': `col-span-2`,
    '75%': `col-span-3`,
    '100%': `col-span-4`
  };
  return (
    <div
      data-tina-field={tinaField(data, 'grid_columns')}
      className={`grid grid-cols-1 md:grid-cols-4 gap-16`}
    >
      {data.grid_columns?.map((column, i) => (
        <div
          data-tina-field={tinaField(column!)}
          key={i}
          className={`${
            widthClass[
              column?.grid_column_size as '25%' | '50%' | '75%' | '100%'
            ]
          } w-full relative min-h-40`}
        >
          {column?.blocks &&
            (column?.blocks).map((block, y) => (
              <div key={i + '_' + y} data-tina-field={tinaField(block!)}>
                {Block(block!)}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

const Block = (block: PageBlocksGridGrid_ColumnsBlocks) => {
  switch (block.__typename) {
    case 'PageBlocksGridGrid_columnsBlocksImage':
      return <ImageBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksVideo':
      return <VideoBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksRichText':
      return <RichTextBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksPrice':
      return <PriceBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksContactForm':
      return <ContactFormBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksImageGallery':
      return <ImageGallery data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksSponsor':
      return <SponsorBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksStaff':
      return <StaffBlock data={block} />;
    case 'PageBlocksGridGrid_columnsBlocksContactInfo':
      return <ContactInfoBlock data={block} />;
    default:
      return null;
  }
};
