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

  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const isVideo = data.hero_image
    ? videoExtensions.some((ext) => data.hero_image!.toLowerCase().endsWith(ext))
    : false;

  return (
    <Section
      data-tina-field={tinaField(data, 'hero_image')}
      className={`${
        heightClass[(data?.hero_height as '50%' | '60%' | '70%' | '80%' | '90%' | '100%') ?? '100%']
      } relative flex items-center justify-center overflow-hidden`}
    >
      {/* Gradient overlay - more dramatic and layered */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />

      {isVideo ? (
        <video
          src={data.hero_image!}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-expect-error — fetchPriority is supported in modern browsers but not yet in React types
          fetchPriority="high"
          className={`absolute inset-0 min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            imagePositionClass[
              (data?.hero_image_position as 'center' | 'top' | 'bottom' | 'left' | 'right') ?? 'center'
            ]
          } object-cover`}
        />
      ) : (
        data.hero_image && (
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
            } object-cover`}
            alt={data.hero_title || ''}
            priority
          />
        )
      )}

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <div className="max-w-4xl text-white">
          {data.hero_tagline && (
            <div
              className="inline-flex items-center gap-3 mb-6 animate-fade-in-up"
              data-tina-field={tinaField(data, 'hero_tagline')}
            >
              <span className="w-12 h-0.5 bg-white rounded-full" />
              <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white">
                {data.hero_tagline}
              </span>
            </div>
          )}
          {data.hero_title && (
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-in-up animation-delay-100"
              data-tina-field={tinaField(data, 'hero_title')}
            >
              {data.hero_title}
            </h1>
          )}
          {data.hero_subtitle && (
            <div
              className="text-base md:text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200"
              data-tina-field={tinaField(data, 'hero_subtitle')}
            >
              <Markdown data={data.hero_subtitle} />
            </div>
          )}
          {data.hero_actions && (
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300"
              data-tina-field={tinaField(data, 'hero_actions')}
            >
              {data.hero_actions.map((action, index) => (
                <Button
                  key={index}
                  type="link"
                  href={
                    action?.hero_action_external_href || parseSystemInfoToHref(action?.hero_action_href?._sys)
                  }
                  variant={action?.hero_action_variant as any}
                  className={index === 0 ? 'shadow-xl shadow-black/30' : ''}
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
