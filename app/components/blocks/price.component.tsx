import { parseSystemInfoToHref } from '@/app/utils/utils';
import { PageBlocksGridGrid_ColumnsBlocksPrice, PageBlocksPrice } from '@/tina/__generated__/types';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Button from '../button.component';

export default function PriceBlock({
  data,
}: {
  data: PageBlocksPrice | PageBlocksGridGrid_ColumnsBlocksPrice;
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center" data-tina-field={tinaField(data)}>
      {/* Titolo Prezzi */}
      {data.price_title && <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{data.price_title}</h2>}

      {/* Sottotitolo */}
      {data.price_subtitle && <p className="text-lg text-gray-600 mb-12">{data.price_subtitle}</p>}

      {/* Opzioni Prezzi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.price_children &&
          data.price_children.map((price, i) => (
            <div key={i} data-tina-field={tinaField(price!)} className="flex justify-center">
              {price && (
                <div
                  className={`w-full max-w-sm bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-2xl transition-all 
                    ${
                      data.price_children?.length === 3 && i === 1
                        ? 'scale-105 border-blue-500 shadow-xl' // Evidenzia il piano centrale
                        : ''
                    }`}
                >
                  {price.price_title && (
                    <h3 className="text-2xl font-semibold text-gray-900 uppercase mb-4">
                      {price.price_title}
                    </h3>
                  )}

                  {price.price_price && !price.price_contact_button && (
                    <div className="flex justify-center items-center mb-6">
                      <span className="text-3xl font-extrabold text-gray-900">{price.price_price}</span>
                      <span className="text-2xl ml-1 text-gray-700">€</span>
                    </div>
                  )}

                  {price.price_contact_button && (
                    <div className="mb-6">
                      <Link href={parseSystemInfoToHref(price.price_contact_button._sys)}>
                        <Button type="button" variant="primary" className="w-full py-3 text-lg font-medium">
                          Richiedi un preventivo
                        </Button>
                      </Link>
                    </div>
                  )}

                  {price.price_description && (
                    <div className="text-gray-600 text-base leading-relaxed tina-markdown-content">
                      <div className="text-center">
                        <div className="text-left inline-block">
                          <TinaMarkdown content={price.price_description} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
