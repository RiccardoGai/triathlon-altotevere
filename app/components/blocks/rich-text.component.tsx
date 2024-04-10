import {
  PageBlocksGridGrid_ColumnsBlocksRichText,
  PageBlocksRichText
} from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function RichTextBlock({
  data
}: {
  data: PageBlocksRichText | PageBlocksGridGrid_ColumnsBlocksRichText;
}) {
  return (
    <TinaMarkdown
      data-tina-field={tinaField(data)}
      content={data.rich_text_text}
    />
  );
}
