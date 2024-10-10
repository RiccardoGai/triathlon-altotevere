import PagePost from '@/app/components/page-post.component';
import { CONFIG } from '@/app/config/config';
import client from '@tina-client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  try {
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
        url: path.join(CONFIG.SITE_URL, ...params.slug),
        images: post.image ?? undefined
      },
      twitter: {
        title: seo?.title ?? (post?.title as string),
        description: seo?.description ?? (post.excerpt as string),
        card: 'summary_large_image',
        images: post.image ?? undefined
      }
    };
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  try {
    const postData = await client.queries.post({
      relativePath: `${path.join(...params.slug)}.mdx`
    });

    return <PagePost props={postData} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
