import client from '@/tina/__generated__/client';
import { PageBlocksPostHighlight, Post } from '@/tina/__generated__/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { formatDate, nameof, parseSystemInfoToHref } from '../../utils/utils';
import Button from '../button.component';

export default function PostHighlightBlock({ data }: { data: PageBlocksPostHighlight }) {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const numberOfPosts = data.post_highlight_number_of_posts ?? 0;
      const postToFetch = numberOfPosts - (data.post_highlight_pinned_post?.length ?? 0);

      const pinnedPost =
        (data.post_highlight_pinned_post?.map((x) => x?.post_highlight_pinned_post_post) as Post[]) ?? [];

      if (postToFetch > 0) {
        setLoading(true);
        try {
          const data = await client.queries.postConnection(
            {
              last: postToFetch,
              sort: nameof<Post>('date'),
            },
            { fetchOptions: { next: { revalidate: 60 } } }
          );

          const items = data.data.postConnection.edges?.map((edge) => edge!.node) ?? [];

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

  if (loading) return <p className="text-center text-gray-500">Caricamento...</p>;
  if (error) return <></>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item, i) => <PostItem key={i} data={item!} />)}
      </div>
    </div>
  );
}

function PostItem({ data }: { data: Post }) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
      <div className="relative h-48 md:h-64">
        {data.image && (
          <Image
            data-tina-field={tinaField(data, 'image')}
            src={data.image}
            fill
            loading="lazy"
            className="object-cover w-full h-full"
            alt={data.title || ''}
          />
        )}
      </div>
      <div className="p-6 text-center flex flex-col grow gap-2">
        <div className="mb-1">
          <span
            className="text-xs text-gray-400 uppercase font-semibold"
            data-tina-field={tinaField(data, 'date')}
          >
            {data.date && formatDate(data.date, 'D MMMM, YYYY')}
          </span>
        </div>
        <h3
          className="mb-2 text-xl font-bold leading-tight sm:text-2xl text-gray-900 hover:text-blue-600 transition-colors duration-200"
          data-tina-field={tinaField(data, 'title')}
        >
          {data.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{data.excerpt}</p>
        <Link className="mt-auto" href={'/news/' + parseSystemInfoToHref(data._sys)}>
          <Button type="button" variant="primary" className="mt-4 w-full">
            Scopri di più
          </Button>
        </Link>
      </div>
    </article>
  );
}
