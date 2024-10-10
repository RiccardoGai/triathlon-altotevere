'use client';

import { PostQuery, PostQueryVariables } from '@/tina/__generated__/types';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
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
  const post = data.post;
  return (
    <div data-tina-field={tinaField(post)}>
      <HeroBannerBlock
        data={{
          hero_image: post.image!,
          hero_height: '50%',
          hero_title: post.title,
          hero_tagline: post.date && formatDate(post.date, 'D MMMM, YYYY'),
          hero_image_position: post.hero_image_position
        }}
      ></HeroBannerBlock>
      <Section>
        <Container className='tina-markdown-content'>
          <TinaMarkdown content={post.body} />
        </Container>
      </Section>
    </div>
  );
}
