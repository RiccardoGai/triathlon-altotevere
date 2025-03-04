import { PageBlocksHeroBanner } from '@/tina/__generated__/types';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import { parseSystemInfoToHref } from '../../utils/utils';
import Button from '../button.component';
import Markdown from '../markdown.component';
import Section from '../section.component';

export default function HeroBannerBlock({ data }: { data: PageBlocksHeroBanner }) {
  const heightClass = {
    '50%': `h-[50vh]`,
    '60%': `h-[60vh]`,
    '70%': `h-[70vh]`,
    '80%': `h-[80vh]`,
    '90%': `h-[90vh]`,
    '100%': `h-screen`,
  };

  const imagePositionClass = {
    center: `object-center`,
    top: `object-top`,
    bottom: `object-bottom`,
    left: `object-left`,
    right: `object-right`,
  };

  return (
    <Section
      data-tina-field={tinaField(data, 'hero_image')}
      className={`${
        heightClass[(data?.hero_height as '50%' | '60%' | '70%' | '80%' | '90%' | '100%') ?? '100%']
      } relative flex items-center justify-center text-center`}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <Image
        src={data.hero_image}
        fill
        loading="eager"
        sizes="(max-width: 640px) 640px, 
         (max-width: 750px) 750px, 
         (max-width: 828px) 828px, 
         (max-width: 1080px) 1080px, 
         (max-width: 1200px) 1200px, 
         (max-width: 1920px) 1920px, 
         (max-width: 2048px) 2048px, 
         3840px"
        className={`${
          imagePositionClass[
            (data?.hero_image_position as 'center' | 'top' | 'bottom' | 'left' | 'right') ?? 'center'
          ]
        } object-cover -z-10`}
        alt={data.hero_title || ''}
        priority
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-white">
          {data.hero_tagline && (
            <div
              className="text-lg md:text-2xl font-semibold tracking-wide uppercase mb-4"
              data-tina-field={tinaField(data, 'hero_tagline')}
            >
              {data.hero_tagline}
            </div>
          )}
          {data.hero_title && (
            <h1
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
              data-tina-field={tinaField(data, 'hero_title')}
            >
              {data.hero_title}
            </h1>
          )}
          {data.hero_subtitle && (
            <div
              className="text-lg md:text-xl opacity-90 mb-8"
              data-tina-field={tinaField(data, 'hero_subtitle')}
            >
              <Markdown data={data.hero_subtitle} />
            </div>
          )}
          {data.hero_actions && (
            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-tina-field={tinaField(data, 'hero_actions')}
            >
              {data.hero_actions.map((action, index) => (
                <Button
                  key={index}
                  type="link"
                  href={
                    action?.hero_action_external_href ?? parseSystemInfoToHref(action?.hero_action_href?._sys)
                  }
                  variant={action?.hero_action_variant as any}
                >
                  {action?.hero_action_text!}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
