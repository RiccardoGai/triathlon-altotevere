import client from '@tina-client';
import { Metadata } from 'next';
import PageBlock from '../components/page-block.component';

export const generateStaticParams = async () => {
  const pages =
    (await client.queries.pageConnection()).data.pageConnection.edges ?? [];
  return pages.map((page) => ({
    slug: page?.node?._sys.filename?.toLowerCase()
  }));
};

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await client.queries.page({
    relativePath: `${params.slug?.toLowerCase()}.mdx`
  });
  const seo = page.data.page.seo;
  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await client.queries.page({
    relativePath: `${params.slug?.toLowerCase()}.mdx`
  });
  if (!page) {
    // TODO - 404
  }
  return (
    <main className='flex flex-col w-full'>
      <PageBlock props={page} />
    </main>
  );
}
