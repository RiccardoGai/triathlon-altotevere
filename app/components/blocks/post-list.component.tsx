import { formatDate, nameof, parseSystemInfoToHref } from '@/app/utils/utils';
import client from '@/tina/__generated__/client';
import { PageBlocksPostList, Post } from '@/tina/__generated__/types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Button from '../button.component';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES_TO_SHOW = 6;

export default function PostListBlock({ data }: { data: PageBlocksPostList }) {
  const [items, setItems] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      // Sort by descending date doesn't work well, for now we download all the posts and sort them in memory
      const data = await client.queries.postConnection({
        //first: afterCursor ? ITEMS_PER_PAGE : null,
        last: Number.MAX_SAFE_INTEGER,
        // before: beforeCursor,
        sort: nameof<Post>('date')
      });

      const items =
        data.data.postConnection.edges?.map((edge) => edge!.node) ?? [];

      setItems(items as Post[]);
      //setPageInfo(data.data.postConnection.pageInfo);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = items.length > indexOfLastItem;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, an error is occurred</p>;
  return (
    <>
      {currentItems &&
        currentItems.map((item, i) => <PostItem key={i} data={item!} />)}
      <Pagination
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

function PostItem({ data }: { data: Post }) {
  return (
    <article
      className={`max-w-md mx-auto md:max-w-none grid gap-6 md:gap-8 mb-8 ${data.image ? 'md:grid-cols-2' : ''}`}
    >
      {data.image && (
        <div className='relative h-48 md:h-72 rounded shadow-md'>
          <Image
            data-tina-field={tinaField(data, 'image')}
            title={data.title}
            src={data.image}
            className='absolute inset-0 w-full h-full object-cover aspect-square'
            sizes='(max-width: 768px) 100vw, 50vw'
            fill={true}
            alt={data.title}
            loading='lazy'
            decoding='async'
          />
        </div>
      )}
      <div className='mt-2'>
        <header>
          <div className='mb-1'>
            <span
              className='text-xs text-gray-400 tracking-wider uppercase font-semibold'
              data-tina-field={tinaField(data, 'date')}
            >
              {data.date && formatDate(data.date, 'D MMMM, YYYY')}
            </span>
          </div>
          <h2
            className='text-xl sm:text-2xl font-bold leading-tight mb-2 font-heading'
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title}
          </h2>
        </header>

        {data.excerpt && (
          <p
            data-tina-field={tinaField(data, 'excerpt')}
            className='flex-grow text-gray-500 md:line-clamp-5 line-clamp-3 leading-relaxed'
          >
            {data.excerpt}
          </p>
        )}

        <Link href={'/news/' + parseSystemInfoToHref(data._sys)}>
          <Button type='button' variant='secondary'>
            Leggi
          </Button>
        </Link>
      </div>
    </article>
  );
}

function Pagination({
  hasNextPage,
  hasPreviousPage,
  currentPage,
  totalPages,
  maxPagesToShow = MAX_PAGES_TO_SHOW,
  handlePageChange
}: {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
  maxPagesToShow?: number;
  handlePageChange: (page: number) => void;
}) {
  const pages = [];
  const btnClassNames = 'p-0 w-12 h-12 flex items-center justify-center';
  if (totalPages > 1) {
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            type='button'
            key={i}
            onClick={() => handlePageChange(i)}
            className={btnClassNames}
            variant={currentPage === i ? 'primary' : 'secondary'}
          >
            {i}
          </Button>
        );
      }
    } else {
      const startPage = Math.max(
        currentPage - Math.round(maxPagesToShow / 2),
        1
      );
      const endPage = Math.min(
        currentPage + Math.ceil(maxPagesToShow / 2) - 1,
        totalPages
      );
      if (startPage > 1) {
        pages.push(
          <Button
            type='button'
            variant='secondary'
            className={btnClassNames}
            key={1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        );
        if (startPage > 2) {
          pages.push(<span key='dots1'>...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            type='button'
            key={i}
            onClick={() => handlePageChange(i)}
            className={btnClassNames}
            variant={currentPage === i ? 'primary' : 'secondary'}
          >
            {i}
          </Button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<span key='dots2'>...</span>);
        }
        pages.push(
          <Button
            type='button'
            key={totalPages}
            variant='secondary'
            className={btnClassNames}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
    }
  }

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      {hasPreviousPage && (
        <Button
          type='button'
          variant='secondary'
          className={btnClassNames}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4' />
        </Button>
      )}

      {pages}
      {hasNextPage && (
        <Button
          type='button'
          variant='secondary'
          className={btnClassNames}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
}
