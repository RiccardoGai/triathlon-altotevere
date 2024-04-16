import { PageBlocksHero_Banner } from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { parsePageToHref } from '../../utils/utils';
import Button from '../button.component';
import Section from '../section.component';

export default function HeroBannerBlock({
  data
}: {
  data: PageBlocksHero_Banner;
}) {
  const heightClass = {
    '50%': `h-[50vh]`,
    '60%': `h-[60vh]`,
    '70%': `h-[70vh]`,
    '80%': `h-[80vh]`,
    '90%': `h-[90vh]`,
    '100%': `h-screen`
  };
  return (
    <Section
      data-tina-field={tinaField(data, 'hero_image')}
      className={`${
        heightClass[
          (data?.hero_height as
            | '50%'
            | '60%'
            | '70%'
            | '80%'
            | '90%'
            | '100%') ?? '100%'
        ]
      } bg-cover bg-center bg-no-repeat `}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.55)), url(${data.hero_image})`
      }}
    >
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 flex justify-items-center items-start md:items-center pt-[7rem] md:pt-0 h-full'>
        <div className='text-center max-w-5xl mx-auto'>
          {data.hero_tagline && (
            <h5
              className='text-base text-white font-bold tracking-wide uppercase mb-3'
              data-tina-field={tinaField(data, 'hero_tagline')}
            >
              {data.hero_tagline}
            </h5>
          )}
          {data.hero_title && (
            <div
              className='text-5xl text-white md:text-6xl font-bold mb-6 font-heading'
              data-tina-field={tinaField(data, 'hero_title')}
            >
              <TinaMarkdown content={data.hero_title} />
            </div>
          )}
          <div className='max-w-3xl mx-auto'>
            {data.hero_subtitle && (
              <div
                className='text-xl text-slate-300 mb-6'
                data-tina-field={tinaField(data, 'hero_subtitle')}
              >
                <TinaMarkdown content={data.hero_subtitle} />
              </div>
            )}
            {data.hero_actions && (
              <div
                className='max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4'
                data-tina-field={tinaField(data, 'hero_actions')}
              >
                {data.hero_actions.map((action, index) => (
                  <div key={index} className='flex w-full sm:w-auto'>
                    <Button
                      type='link'
                      text={action?.hero_action_text!}
                      href={parsePageToHref(action?.hero_action_href)}
                      variant={action?.hero_action_variant as any}
                      className='w-full sm:mb-0'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
