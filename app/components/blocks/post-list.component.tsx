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

  if (loading) {
    return (
      <div className="py-20">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce animation-delay-100" />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce animation-delay-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-medium">Errore nel caricamento dei post.</p>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
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
    <article className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
      {data.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            data-tina-field={tinaField(data, 'image')}
            title={data.title}
            src={data.image}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            fill={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={data.title}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Date badge */}
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
      )}

      <div className="p-6 flex flex-col grow">
        <h2
          className="text-lg md:text-xl font-bold leading-snug mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300"
          data-tina-field={tinaField(data, 'title')}
        >
          {data.title}
        </h2>

        {data.excerpt && (
          <p
            data-tina-field={tinaField(data, 'excerpt')}
            className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4"
          >
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

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
    'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 text-sm font-bold';

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
    <div className="flex flex-row items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-200">
      {hasPreviousPage && (
        <Button
          type="button"
          variant="tertiary"
          className={`${btnClassNames} hover:bg-primary hover:text-white hover:border-primary`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
        </Button>
      )}

      {pages}

      {hasNextPage && (
        <Button
          type="button"
          variant="tertiary"
          className={`${btnClassNames} hover:bg-primary hover:text-white hover:border-primary`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
