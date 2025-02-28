import {
  PageBlocksGridGrid_ColumnsBlocksRichText,
  PageBlocksGridGrid_ColumnsBlocksRichTextRich_Text_TextButtonFilter,
  PageBlocksRichText,
  PageBlocksRichTextRich_Text_TextButtonFilter,
} from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Button from '../button.component';

const MdButton = (unknowProps: unknown) => {
  const props = unknowProps as
    | PageBlocksRichTextRich_Text_TextButtonFilter
    | PageBlocksGridGrid_ColumnsBlocksRichTextRich_Text_TextButtonFilter;

  // @NOTE this is a tina bug, the href is not being parsed correctly
  const href = String(
    props?.rich_text_button_external_href ||
      (props?.rich_text_button_href as string)?.replace('content/pages', '')?.replace('.mdx', '')
  );
  const text = String(props?.rich_text_button_text);
  return (
    <Button
      type="link"
      variant={props.rich_text_button_variant as 'link' | 'primary' | 'secondary' | 'tertiary' | undefined}
      href={href}
    >
      <span>{text}</span>
    </Button>
  );
};

export default function RichTextBlock({
  data,
}: {
  data: PageBlocksRichText | PageBlocksGridGrid_ColumnsBlocksRichText;
}) {
  return (
    <div className="tina-markdown-content" data-tina-field={tinaField(data)}>
      <TinaMarkdown components={{ Button: MdButton }} content={data.rich_text_text} />
    </div>
  );
}
