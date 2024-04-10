'use client';
import {
  PageBlocks,
  PageQuery,
  PageQueryVariables
} from '@/tina/__generated__/types';
import { tinaField, useTina } from 'tinacms/dist/react';
import { ITinaResponse } from '../../models/tina-response.interface';
import Container from '../container.component';
import Section from '../section.component';
import ContactFormBlock from './contact-form.component';
import GridBlock from './grid.component';
import HeroBannerBlock from './hero-banner.component';
import ImageBlock from './image.component';
import NewsBlock from './news.component';
import PriceBlock from './price.component';
import RichTextBlock from './rich-text.component';

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
            {block.__typename === 'PageBlocksHero_banner' ? (
              <Block key={i} {...block} />
            ) : (
              <Section>
                <Container>
                  <Block key={i} {...block} />
                </Container>
              </Section>
            )}
          </div>
        ))}
    </main>
  );
}

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case 'PageBlocksHero_banner':
      return <HeroBannerBlock data={block} />;
    case 'PageBlocksRichText':
      return <RichTextBlock data={block} />;
    case 'PageBlocksGrid':
      return <GridBlock data={block} />;
    case 'PageBlocksNews':
      return <NewsBlock data={block} />;
    case 'PageBlocksImage':
      return <ImageBlock data={block} />;
    case 'PageBlocksPrice':
      return <PriceBlock data={block} />;
    case 'PageBlocksContactForm':
      return <ContactFormBlock data={block} />;
    default:
      return null;
  }
};
