import HeroBannerBlock from '@/app/components/blocks/hero-banner.component';
import Container from '@/app/components/container.component';
import Section from '@/app/components/section.component';
import client from '@tina-client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  try {
    const postData = await client.queries.post({
      relativePath: `${path.join(...params.slug)}.mdx`
    });
    const post = postData.data.post;
    return {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      keywords: post.seo?.keywords
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Page not found'
    };
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  try {
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
          <Container>
            <TinaMarkdown content={post.body} />
          </Container>
        </Section>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
