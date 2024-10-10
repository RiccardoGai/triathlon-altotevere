import PagePost from '@/app/components/page-post.component';
import { CONFIG } from '@/app/config/config';
import client from '@tina-client';
import { Metadata } from 'next';
import path from 'path';

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
      url: path.join(CONFIG.SITE_URL, ...params.slug)
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

  return <PagePost props={postData} />;
}
