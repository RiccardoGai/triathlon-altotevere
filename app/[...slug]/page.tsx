import client from '@tina-client';
import { Metadata } from 'next';
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
      url: path.join(
        process.env.NEXT_PUBLIC_VERCEL_URL as string,
        ...params.slug
      )
    },
    twitter: {
      title: seo?.title as string,
      description: seo?.description as string,
      card: 'summary_large_image'
    }
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const page = await client.queries.page({
    relativePath: `${path.join(...params.slug)}.mdx`
  });
  return <PageBlock props={page} />;
}
