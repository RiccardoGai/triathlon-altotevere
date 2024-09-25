import client from '@/tina/__generated__/client';
import { Metadata } from 'next';
import path from 'path';
import { default as SlugPage } from './[...slug]/page';

export async function generateMetadata(): Promise<Metadata> {
  const globalResponse = await client.queries.global({
    relativePath: 'global.mdx'
  });
  const homePage = globalResponse.data.global.home_page;
  const seo = homePage?.seo;
  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords as string[],
    openGraph: {
      type: 'website',
      title: seo?.title as string,
      description: seo?.description as string,
      url: path.join(process.env.NEXT_PUBLIC_VERCEL_URL as string)
    },
    twitter: {
      title: seo?.title as string,
      description: seo?.description as string,
      card: 'summary_large_image'
    }
  };
}

export default async function Page() {
  // const globalResponse = useGlobalTinaContext();
  const globalResponse = await client.queries.global({
    relativePath: 'global.mdx'
  });
  return (
    <SlugPage
      params={{
        slug: globalResponse.data.global.home_page?._sys.breadcrumbs ?? []
      }}
    ></SlugPage>
  );
}
