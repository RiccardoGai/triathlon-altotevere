'use client';
import {
  PageBlocks,
  PageQuery,
  PageQueryVariables
} from '@/tina/__generated__/types';
import { tinaField, useTina } from 'tinacms/dist/react';
import { ITinaResponse } from '../models/tina-response.interface';
import Grid from './grid.component';
import HeroBanner from './hero-banner.component';
import TextContent from './text-content.component';

export default function PageBlock({
  props
}: {
  props: ITinaResponse<PageQuery, PageQueryVariables>;
}) {
  const { data } = useTina(props);

  return (
    <main className='flex flex-col w-full'>
      {data?.page?.blocks &&
        (data.page?.blocks as PageBlocks[]).map((block, i) => (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block key={i} {...block} />
          </div>
        ))}
    </main>
  );
}

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case 'PageBlocksHero_banner':
      return <HeroBanner data={block} />;
    case 'PageBlocksText':
      return <TextContent data={block} />;
    case 'PageBlocksGrid':
      return <Grid data={block} />;
    default:
      return null;
  }
};
