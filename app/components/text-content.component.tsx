import { PageBlocksText } from '@/tina/__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Container } from './container.component';
import { Section } from './section.component';

export const TextContent = ({ data }: { data: PageBlocksText }) => {
  return (
    <Section>
      <Container>
        <TinaMarkdown content={data.text_rich_text} />
      </Container>
    </Section>
  );
};
