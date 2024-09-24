import { parseSystemInfoToHref } from '@/app/utils/utils';
import {
  PageBlocksGridGrid_ColumnsBlocksPrice,
  PageBlocksPrice
} from '@/tina/__generated__/types';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Button from '../button.component';

export default function PriceBlock({
  data
}: {
  data: PageBlocksPrice | PageBlocksGridGrid_ColumnsBlocksPrice;
}) {
  return (
    <>
      <div
        className={'mb-8 md:mx-auto md:mb-12 text-center'}
        data-tina-field={tinaField(data)}
      >
        {data.price_title && (
          <h2
            className={
              'font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl'
            }
          >
            {data.price_title}
          </h2>
        )}

        {data.price_subtitle && (
          <p className={'mt-4 text-gray-500'}>{data.price_subtitle}</p>
        )}
      </div>
      <div className='flex items-stretch justify-center'>
        <div className='grid grid-cols-auto-fit-200px gap-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {data.price_children &&
            data.price_children.map((price, i) => (
              <div
                data-tina-field={tinaField(price!)}
                key={i}
                className='col-span-3 mx-auto flex w-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1'
              >
                {price && (
                  <div className='rounded-lg backdrop-blur border border-gray-200 bg-white shadow px-6 py-8 flex w-full max-w-sm flex-col text-center'>
                    {price.price_title && (
                      <h3 className='text-center text-3xl font-bold uppercase leading-6 tracking-wider mb-6'>
                        {price.price_title}
                      </h3>
                    )}

                    {price.price_price && !price.price_contact_button && (
                      <div className='my-8'>
                        <div className='flex items-center justify-center text-center mb-1'>
                          <span className='text-6xl font-extrabold'>
                            {price.price_price}
                          </span>
                          <span className='text-5xl'>€</span>
                        </div>
                      </div>
                    )}

                    {price.price_contact_button && (
                      <div className='my-8'>
                        <Link
                          href={parseSystemInfoToHref(
                            price.price_contact_button._sys
                          )}
                        >
                          <Button type='button' variant='primary'>
                            Richiedi un preventivo
                          </Button>
                        </Link>
                      </div>
                    )}

                    {price.price_description && (
                      <div className='font-light sm:text-lg text-gray-600 text-left'>
                        <TinaMarkdown
                          content={price.price_description}
                        ></TinaMarkdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
