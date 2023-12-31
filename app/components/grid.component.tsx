import { PageBlocksGrid } from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Container from './container.component';
import Section from './section.component';

export default function Grid({ data }: { data: PageBlocksGrid }) {
  const widthClass = {
    '25%': `col-span-1`,
    '50%': `col-span-2`,
    '75%': `col-span-3`,
    '100%': `col-span-4`
  };
  return (
    <Section>
      <Container>
        <div
          data-tina-field={tinaField(data, 'grid_columns')}
          className={`grid grid-cols-1 md:grid-cols-4 gap-16`}
        >
          {data.grid_columns?.map((item, i) => (
            <div
              data-tina-field={tinaField(item!)}
              key={i}
              className={`${
                widthClass[
                  item?.grid_column_size as '25%' | '50%' | '75%' | '100%'
                ]
              } w-full relative`}
            >
              <TinaMarkdown content={item?.grid_column_rich_text} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
