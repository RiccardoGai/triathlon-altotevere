import client from '@tina-client';
import PageBlock from '../components/page-block.component';

export const generateStaticParams = async () => {
  const pages =
    (await client.queries.pageConnection()).data.pageConnection.edges ?? [];
  return pages.map((page) => ({
    slug: page?.node?._sys.filename?.toLowerCase()
  }));
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {

//   return {
//     title: project.seo.title,
//     description: project.seo.description,
//     keywords: project.seo.keywords
//   };
// }

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
