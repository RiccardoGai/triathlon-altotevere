import { PageBlocksText } from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Container from './container.component';
import Section from './section.component';

export default function TextContent({ data }: { data: PageBlocksText }) {
  return (
    <Section>
      <Container data-tina-field={tinaField(data, 'text_rich_text')}>
        <TinaMarkdown content={data.text_rich_text} />
      </Container>
    </Section>
  );
}
