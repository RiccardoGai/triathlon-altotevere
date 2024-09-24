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
import ContactInfoBlock from './contact-info.component';
import GridBlock from './grid.component';
import HeroBannerBlock from './hero-banner.component';
import ImageGalleryBlock from './image-gallery.component';
import ImageBlock from './image.component';
import PostHighlightBlock from './post-highlight.component';
import PostListBlock from './post-list.component';
import PriceBlock from './price.component';
import RichTextBlock from './rich-text.component';
import SponsorBlock from './sponsor.component';
import StaffBlock from './staff.component';
import VideoBlock from './video.component';

export default function PageBlock({
  props
}: {
  props: ITinaResponse<PageQuery, PageQueryVariables>;
}) {
  const { data } = useTina(props);

  return (
    <>
      {data?.page?.blocks &&
        (data.page?.blocks as PageBlocks[]).map((block, i) => (
          <div key={i}>
            {block.__typename === 'PageBlocksHeroBanner' ? (
              <Block data-tina-field={tinaField(block)} key={i} {...block} />
            ) : (
              <Section key={i}>
                <Container>
                  <Block {...block} data-tina-field={tinaField(block)} />
                </Container>
              </Section>
            )}
          </div>
        ))}
    </>
  );
}

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case 'PageBlocksHeroBanner':
      return <HeroBannerBlock data={block} />;
    case 'PageBlocksRichText':
      return <RichTextBlock data={block} />;
    case 'PageBlocksGrid':
      return <GridBlock data={block} />;
    case 'PageBlocksPostHighlight':
      return <PostHighlightBlock data={block} />;
    case 'PageBlocksPostList':
      return <PostListBlock data={block} />;
    case 'PageBlocksImage':
      return <ImageBlock data={block} />;
    case 'PageBlocksVideo':
      return <VideoBlock data={block} />;
    case 'PageBlocksPrice':
      return <PriceBlock data={block} />;
    case 'PageBlocksContactForm':
      return <ContactFormBlock data={block} />;
    case 'PageBlocksImageGallery':
      return <ImageGalleryBlock data={block} />;
    case 'PageBlocksSponsor':
      return <SponsorBlock data={block} />;
    case 'PageBlocksStaff':
      return <StaffBlock data={block} />;
    case 'PageBlocksContactInfo':
      return <ContactInfoBlock data={block} />;
    default:
      return null;
  }
};
