import {
  PageBlocksNews,
  PageBlocksNewsNews_Children
} from '@/tina/__generated__/types';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { parsePageToHref } from '../../utils/utils';

export default function NewsBlock({ data }: { data: PageBlocksNews }) {
  return (
    <div
      data-tina-field={tinaField(data, 'news_children')}
      className={`grid grid-cols-auto-fit-200px gap-16`}
    >
      {data.news_children?.map((item, i) => <NewsItem key={i} data={item!} />)}
    </div>
  );
}

function NewsItem({ data }: { data: PageBlocksNewsNews_Children }) {
  return (
    <article className='mb-6 transition text-center'>
      <div className='relative md:h-64 bg-gray-400 dark:bg-slate-700 rounded shadow-lg mb-6'>
        {data.news_image && (
          <Link href={parsePageToHref(data.news_href)}>
            <ExportedImage
              data-tina-field={tinaField(data, 'news_image')}
              src={data.news_image}
              fill
              loading='lazy'
              className='object-cover'
              alt={data.news_title}
            />
          </Link>
        )}
      </div>
      <h3 className='mb-2 text-xl font-bold leading-tight sm:text-2xl font-heading'>
        {
          <Link
            href={parsePageToHref(data.news_href)}
            className='hover:text-primary dark:hover:text-blue-700  transition ease-in duration-200'
          >
            {data.news_title}
          </Link>
        }
      </h3>
      <p className='text-muted dark:text-slate-500 text-lg'>
        {data.news_description}
      </p>
    </article>
  );
}
