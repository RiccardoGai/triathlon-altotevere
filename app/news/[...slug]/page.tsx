import HeroBannerBlock from '@/app/components/blocks/hero-banner.component';
import Container from '@/app/components/container.component';
import Section from '@/app/components/section.component';
import client from '@tina-client';
import { Metadata } from 'next';
import path from 'path';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const generateStaticParams = async () => {
  const posts =
    (await client.queries.postConnection()).data.postConnection.edges ?? [];
  return posts.map((post) => ({
    slug: post?.node?._sys.breadcrumbs
  }));
};

export async function generateMetadata({
  params
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const postData = await client.queries.post({
    relativePath: `${path.join(...params.slug)}.mdx`
  });
  const post = postData.data.post;
  const seo = post.seo;
  return {
    title: seo?.title ?? post.title,
    description: seo?.description ?? post.excerpt,
    keywords: seo?.keywords as string[],
    openGraph: {
      type: 'website',
      title: seo?.title ?? (post.title as string),
      description: seo?.description ?? (post.excerpt as string),
      url: path.join(
        process.env.NEXT_PUBLIC_VERCEL_URL as string,
        ...params.slug
      )
    },
    twitter: {
      title: seo?.title ?? (post?.title as string),
      description: seo?.description ?? (post.excerpt as string),
      card: 'summary_large_image'
    }
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const postData = await client.queries.post({
    relativePath: `${path.join(...params.slug)}.mdx`
  });
  const post = postData.data.post;

  return (
    <div data-tina-field={tinaField(post)}>
      <HeroBannerBlock
        data={{
          hero_image: post.image!,
          hero_height: '60%',
          hero_title: post.title
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
