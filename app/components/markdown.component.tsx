import {
  PageBlocksGridGrid_ColumnsBlocksRichTextRich_Text_TextButtonFilter,
  PageBlocksGridGrid_ColumnsBlocksRichTextRich_Text_TextImageFilter,
  PageBlocksRichTextRich_Text_TextButtonFilter,
  PageBlocksRichTextRich_Text_TextImageFilter,
} from '@/tina/__generated__/types';
import Image from 'next/image';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import Button from './button.component';

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

const MdImage = (unknowProps: unknown) => {
  const props = unknowProps as
    | PageBlocksRichTextRich_Text_TextImageFilter
    | PageBlocksGridGrid_ColumnsBlocksRichTextRich_Text_TextImageFilter;

  let width = Number(props.rich_text_width);
  let height = Number(props.rich_text_height);
  const fill = width && height ? false : true;
  if (fill) {
    width = 0;
    height = 0;
  }
  const href = String(props.rich_text_image_ref || '');

  if (!href) {
    return <div></div>;
  }

  return (
    <div className="w-full max-w-screen-lg overflow-hidden">
      <Image
        src={href}
        width={width || undefined}
        height={height || undefined}
        fill={fill}
        loading="lazy"
        className="object-cover transition-transform duration-300 rounded-lg shadow-lg"
        alt={href}
      />
    </div>
  );
};

export default function Markdown({ data }: { data: TinaMarkdownContent | TinaMarkdownContent[] }) {
  return (
    <div className="tina-markdown-content">
      <TinaMarkdown components={{ Button: MdButton, Image: MdImage }} content={data} />
    </div>
  );
}
