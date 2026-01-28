import { parseSystemInfoToHref } from '@/app/utils/utils';
import { PageBlocksGridGrid_ColumnsBlocksPrice, PageBlocksPrice } from '@/tina/__generated__/types';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import Button from '../button.component';
import Markdown from '../markdown.component';

export default function PriceBlock({
  data,
}: {
  data: PageBlocksPrice | PageBlocksGridGrid_ColumnsBlocksPrice;
}) {
  const isFeatured = (index: number) => data.price_children?.length === 3 && index === 1;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24" data-tina-field={tinaField(data)}>
      {/* Header */}
      <div className="text-center mb-16">
        {data.price_title && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {data.price_title}
          </h2>
        )}
        {data.price_subtitle && (
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{data.price_subtitle}</p>
        )}
        <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {data.price_children &&
          data.price_children.map((price, i) => (
            <div
              key={i}
              data-tina-field={tinaField(price!)}
              className={`relative flex flex-col ${isFeatured(i) ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {price && (
                <div
                  className={`relative flex flex-col h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                    isFeatured(i)
                      ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl shadow-primary/30'
                      : 'bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-gray-200'
                  }`}
                >
                  {/* Popular badge */}
                  {isFeatured(i) && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-white shadow-lg">
                        Più popolare
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col h-full">
                    {/* Plan name */}
                    {price.price_title && (
                      <h3
                        className={`text-lg font-bold uppercase tracking-wider mb-6 ${
                          isFeatured(i) ? 'text-white/90' : 'text-gray-500'
                        }`}
                      >
                        {price.price_title}
                      </h3>
                    )}

                    {/* Price */}
                    {price.price_price && !price.price_contact_button && (
                      <div className="mb-8">
                        <div className="flex items-baseline justify-center">
                          <span
                            className={`text-5xl md:text-6xl font-extrabold tracking-tight ${
                              isFeatured(i) ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {price.price_price}
                          </span>
                          <span
                            className={`text-2xl font-bold ml-1 ${
                              isFeatured(i) ? 'text-white/80' : 'text-gray-500'
                            }`}
                          >
                            €
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Contact button instead of price */}
                    {price.price_contact_button && (
                      <div className="mb-8">
                        <Link href={parseSystemInfoToHref(price.price_contact_button._sys)}>
                          <Button
                            type="button"
                            variant={isFeatured(i) ? 'secondary' : 'primary'}
                            className="w-full"
                          >
                            Richiedi un preventivo
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Features list */}
                    {price.price_description && (
                      <div
                        className={`flex-grow tina-markdown-content text-sm leading-relaxed ${
                          isFeatured(i) ? 'text-white/90' : 'text-gray-600'
                        }`}
                      >
                        <Markdown data={price.price_description} />
                      </div>
                    )}
                  </div>

                  {/* Bottom accent */}
                  {!isFeatured(i) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
