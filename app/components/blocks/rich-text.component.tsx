import { PageBlocksGridGrid_ColumnsBlocksRichText, PageBlocksRichText } from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import Markdown from '../markdown.component';

export default function RichTextBlock({
  data,
}: {
  data: PageBlocksRichText | PageBlocksGridGrid_ColumnsBlocksRichText;
}) {
  return (
    <div className="tina-markdown-content" data-tina-field={tinaField(data)}>
      <Markdown data={data.rich_text_text} />
    </div>
  );
}
