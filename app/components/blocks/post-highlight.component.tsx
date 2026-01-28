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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce animation-delay-100" />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce animation-delay-200" />
        </div>
      </div>
    );
  }
  if (error) return <></>;

  return (
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item, i) => <PostItem key={i} data={item!} index={i} />)}
      </div>
    </div>
  );
}

function PostItem({ data, index }: { data: Post; index: number }) {
  return (
    <article
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image container with overlay */}
      <div className="relative h-52 md:h-60 overflow-hidden">
        {data.image && (
          <>
            <Image
              data-tina-field={tinaField(data, 'image')}
              src={data.image}
              fill
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              alt={data.title || ''}
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Date badge - floating */}
        {data.date && (
          <div
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-sm shadow-md"
            data-tina-field={tinaField(data, 'date')}
          >
            <span className="text-xs font-bold text-primary uppercase tracking-wide">
              {formatDate(data.date, 'D MMM YYYY')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <h3
          className="text-lg md:text-xl font-bold leading-snug text-gray-900 group-hover:text-primary transition-colors duration-300 mb-3"
          data-tina-field={tinaField(data, 'title')}
        >
          {data.title}
        </h3>

        {data.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {data.excerpt}
          </p>
        )}

        <Link
          className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors duration-200 group/link"
          href={'/news/' + parseSystemInfoToHref(data._sys)}
        >
          <span>Leggi l&apos;articolo</span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  );
}
