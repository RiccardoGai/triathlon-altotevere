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
const MAX_PAGES_TO_SHOW_DESKTOP = 6;
const MAX_PAGES_TO_SHOW_MOBILE = 1;

export default function PostListBlock({ data }: { data: PageBlocksPostList }) {
  const [items, setItems] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await client.queries.postConnection(
        {
          last: Number.MAX_SAFE_INTEGER,
          sort: nameof<Post>('date'),
        },
        { fetchOptions: { next: { revalidate: 60 } } }
      );

      const items = data.data.postConnection.edges?.map((edge) => edge!.node) ?? [];
      setItems(items as Post[]);
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

  if (loading) return <p className="text-center text-gray-500">Caricamento...</p>;
  if (error) return <p className="text-center text-red-500">Errore nel caricamento dei post.</p>;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((item, i) => (
            <PostItem key={i} data={item!} />
          ))}
        </div>
        <Pagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

function PostItem({ data }: { data: Post }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {data.image && (
        <div className="relative h-48 md:h-56 w-full">
          <Image
            data-tina-field={tinaField(data, 'image')}
            title={data.title}
            src={data.image}
            className="absolute inset-0 w-full h-full object-cover"
            fill={true}
            alt={data.title}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="p-6 flex flex-col grow gap-2">
        <div>
          <div className="mb-1">
            <span
              className="text-xs text-gray-400 tracking-wider uppercase font-semibold"
              data-tina-field={tinaField(data, 'date')}
            >
              {data.date && formatDate(data.date, 'D MMMM, YYYY')}
            </span>
          </div>
          <h2
            className="text-xl font-bold leading-tight mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-200"
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title}
          </h2>
        </div>

        {data.excerpt && (
          <p
            data-tina-field={tinaField(data, 'excerpt')}
            className="text-gray-600 line-clamp-3 leading-relaxed"
          >
            {data.excerpt}
          </p>
        )}

        <Link className="mt-auto" href={'/news/' + parseSystemInfoToHref(data._sys)}>
          <Button type="button" variant="primary" className="w-full">
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
  handlePageChange,
}: {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const maxPagesToShow = isMobile ? MAX_PAGES_TO_SHOW_MOBILE : MAX_PAGES_TO_SHOW_DESKTOP;
  const pages = [];
  const btnClassNames =
    'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 shadow-md';

  if (totalPages > 1) {
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            type="button"
            key={i}
            variant={currentPage === i ? 'primary' : 'tertiary'}
            onClick={() => handlePageChange(i)}
            className={`${btnClassNames}`}
          >
            {i}
          </Button>
        );
      }
    } else {
      let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
      let endPage = Math.min(currentPage + Math.floor(maxPagesToShow / 2), totalPages);

      if (endPage - startPage + 1 < maxPagesToShow) {
        if (startPage === 1) {
          endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
        } else if (endPage === totalPages) {
          startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }
      }

      if (startPage > 1) {
        pages.push(
          <Button
            type="button"
            key={1}
            className={`${btnClassNames}`}
            variant="tertiary"
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        );
        if (startPage > 2) {
          pages.push(
            <span key="dots1" className="text-gray-500">
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            type="button"
            key={i}
            variant={currentPage === i ? 'primary' : 'tertiary'}
            onClick={() => handlePageChange(i)}
            className={`${btnClassNames}`}
          >
            {i}
          </Button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="dots2" className="text-gray-500">
              ...
            </span>
          );
        }
        pages.push(
          <Button
            type="button"
            key={totalPages}
            variant="tertiary"
            onClick={() => handlePageChange(totalPages)}
            className={`${btnClassNames}`}
          >
            {totalPages}
          </Button>
        );
      }
    }
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2 mt-6">
      {hasPreviousPage && (
        <Button
          type="button"
          variant="tertiary"
          className={`${btnClassNames}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
        </Button>
      )}

      {pages}

      {hasNextPage && (
        <Button
          type="button"
          variant="tertiary"
          className={`${btnClassNames}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
