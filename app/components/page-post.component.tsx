'use client';

import { PostQuery, PostQueryVariables } from '@/tina/__generated__/types';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'next-share';
import { usePathname } from 'next/navigation';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { CONFIG } from '../config/config';
import { ITinaResponse } from '../models/tina-response.interface';
import { formatDate } from '../utils/utils';
import HeroBannerBlock from './blocks/hero-banner.component';
import Container from './container.component';
import Section from './section.component';

export default function PagePost({
  props
}: {
  props: ITinaResponse<PostQuery, PostQueryVariables>;
}) {
  const { data } = useTina(props);
  const currentUrl = CONFIG.SITE_URL + usePathname();
  const post = data.post;
  return (
    <div data-tina-field={tinaField(post)}>
      <HeroBannerBlock
        data={{
          hero_image: post.image,
          hero_height: '50%',
          hero_title: post.title,
          hero_tagline: post.date && formatDate(post.date, 'D MMMM, YYYY'),
          hero_image_position: post.hero_image_position
        }}
      ></HeroBannerBlock>
      <Section>
        <Container className='tina-markdown-content px-6 sm:px-20 md:px-40 lg:px-60'>
          <TinaMarkdown content={post.body} />
        </Container>
      </Section>
      <Section>
        <Container className='px-6 sm:px-16'>
          <div className='grid gap-6 grid-flow-col auto-cols-min justify-center border-y py-6'>
            <FacebookShareButton url={currentUrl} quote={post.title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl} title={post.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={currentUrl} title={post.title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
