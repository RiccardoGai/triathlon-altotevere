import { PageBlocks } from '@/tina/__generated__/types';
import client from '@tina-client';
import { Grid } from '../components/grid.component';
import { HeroBanner } from '../components/hero-banner.component';
import { TextContent } from '../components/text-content.component';

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

export const SlugPage = async ({ props }: { props: { slug: string } }) => {
  const page = (
    await client.queries.page({
      relativePath: `${props.slug?.toLowerCase()}.mdx`
    })
  )?.data?.page;
  if (!page) {
    // TODO - 404
  }
  return (
    <main className='flex flex-col w-full'>
      {page?.blocks &&
        page?.blocks.map((block, i) => <Block key={i} {...block} />)}
    </main>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case 'PageBlocksHero_banner':
      return <HeroBanner data={block} />;
    case 'PageBlocksText':
      return <TextContent data={block} />;
    case 'PageBlocksGrid':
      return <Grid data={block} />;
    default:
      return null;
  }
};
