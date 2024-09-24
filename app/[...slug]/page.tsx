import client from '@tina-client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';
import PageBlock from '../components/blocks/page-block.component';

export const generateStaticParams = async () => {
  const pages =
    (await client.queries.pageConnection()).data.pageConnection.edges ?? [];
  return pages.map((page) => ({
    slug: page?.node?._sys.breadcrumbs
  }));
};

export async function generateMetadata({
  params
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  try {
    const page = await client.queries.page({
      relativePath: `${path.join(...params.slug)}.mdx`
    });
    const seo = page.data.page.seo;
    return {
      title: seo?.title,
      description: seo?.description,
      keywords: seo?.keywords as string[],
      openGraph: {
        type: 'website',
        title: seo?.title as string,
        description: seo?.description as string,
        url: process.env.BASE_URL + path.join(...params.slug)
      },
      twitter: {
        title: seo?.title as string,
        description: seo?.description as string,
        card: 'summary_large_image'
      }
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
    const page = await client.queries.page({
      relativePath: `${path.join(...params.slug)}.mdx`
    });
    if (!page) {
      return notFound();
    }
    return <PageBlock props={page} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
