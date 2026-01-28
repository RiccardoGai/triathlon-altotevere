'use client';

import { PostQuery, PostQueryVariables } from '@/tina/__generated__/types';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import { usePathname } from 'next/navigation';
import { tinaField, useTina } from 'tinacms/dist/react';
import { CONFIG } from '../config/config';
import { ITinaResponse } from '../models/tina-response.interface';
import { formatDate } from '../utils/utils';
import HeroBannerBlock from './blocks/hero-banner.component';
import Container from './container.component';
import Markdown from './markdown.component';
import Section from './section.component';

export default function PagePost({ props }: { props: ITinaResponse<PostQuery, PostQueryVariables> }) {
  const { data } = useTina(props);
  const currentUrl = CONFIG.SITE_URL + usePathname();
  const post = data.post;

  return (
    <div data-tina-field={tinaField(post)}>
      <HeroBannerBlock
        data={{
          hero_image: post.image!,
          hero_height: '60%',
          hero_title: post.title,
          hero_tagline: post.date && formatDate(post.date, 'D MMMM, YYYY'),
          hero_image_position: post.hero_image_position,
        }}
      />

      {/* Article content */}
      <Section>
        <Container className="max-w-3xl mx-auto px-6">
          <article className="tina-markdown-content prose prose-lg prose-gray max-w-none">
            <Markdown data={post.body} />
          </article>
        </Container>
      </Section>

      {/* Share section */}
      <Section>
        <Container className="max-w-3xl mx-auto px-6">
          <div className="border-t border-b border-gray-200 py-8">
            <div className="text-center mb-4">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Condividi questo articolo
              </span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <FacebookShareButton url={currentUrl} quote={post.title}>
                <div className="w-12 h-12 rounded-full bg-[#1877f2] hover:bg-[#166fe5] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                  <FacebookIcon size={24} round bgStyle={{ fill: 'transparent' }} />
                </div>
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl} title={post.title}>
                <div className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                  <TwitterIcon size={24} round bgStyle={{ fill: 'transparent' }} />
                </div>
              </TwitterShareButton>
              <WhatsappShareButton url={currentUrl} title={post.title}>
                <div className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20bd5a] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                  <WhatsappIcon size={24} round bgStyle={{ fill: 'transparent' }} />
                </div>
              </WhatsappShareButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
