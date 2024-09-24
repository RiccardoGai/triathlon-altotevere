import client from '@/tina/__generated__/client';
import { PageBlocksPostHighlight, Post } from '@/tina/__generated__/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { nameof, parseSystemInfoToHref } from '../../utils/utils';
import Button from '../button.component';

export default function PostHighlightBlock({
  data
}: {
  data: PageBlocksPostHighlight;
}) {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const numberOfPosts = data.post_highlight_number_of_posts ?? 0;
      const postToFetch =
        numberOfPosts - (data.post_highlight_pinned_post?.length ?? 0);

      const pinnedPost =
        (data.post_highlight_pinned_post?.map(
          (x) => x?.post_highlight_pinned_post_post
        ) as Post[]) ?? [];

      if (postToFetch > 0) {
        setLoading(true);
        try {
          const data = await client.queries.postConnection({
            last: postToFetch,
            sort: nameof<Post>('date')
          });

          const items =
            data.data.postConnection.edges?.map((edge) => edge!.node) ?? [];

          setItems([...pinnedPost, ...(items as Post[])]);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setItems(pinnedPost);
      }
    };
    fetchItems();
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <></>;
  return (
    <div className={`grid grid-cols-auto-fit-200px gap-16`}>
      {items?.map((item, i) => <PostItem key={i} data={item!} />)}
    </div>
  );
}

function PostItem({ data }: { data: Post }) {
  return (
    <article className='mb-6 transition text-center'>
      <div className='relative h-48 md:h-64 rounded shadow-md mb-6'>
        {data.image && (
          <Image
            data-tina-field={tinaField(data, 'image')}
            src={data.image}
            fill
            loading='lazy'
            className='object-cover'
            alt={data.title ?? ''}
          />
        )}
      </div>
      <h3 className='mb-2 text-xl font-bold leading-tight sm:text-2xl font-heading'>
        {data.title}
      </h3>
      <p className='text-gray-500 text-lg line-clamp-3'>{data.excerpt}</p>
      <Link href={'/news/' + parseSystemInfoToHref(data._sys)}>
        <Button type='button' variant='primary' className='mt-5'>
          Scopri di più
        </Button>
      </Link>
    </article>
  );
}
