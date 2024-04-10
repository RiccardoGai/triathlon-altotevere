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
  return (
    <Section
      data-tina-field={tinaField(data, 'hero_image')}
      className='bg-cover bg-center bg-no-repeat min-h-screen'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.55)), url(${data.hero_image})`
      }}
    >
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='pt-0 md:pt-[76px] pointer-events-none'></div>
        <div className='py-12 md:py-20'>
          <div className='text-center pb-10 md:pb-16 max-w-5xl mx-auto'>
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
      </div>
    </Section>
  );
}
