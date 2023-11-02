import { PageBlocksHero_Banner } from '@/tina/__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Container } from './container.component';
import { LinkButton } from './link-button.component';
import { Section } from './section.component';

export const HeroBanner = ({ data }: { data: PageBlocksHero_Banner }) => {
  return (
    <Section
      className='bg-cover bg-center bg-no-repeat min-h-screen'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url(${data.hero_image})`
      }}
    >
      <Container className='flex flex-col justify-center items-center'>
        <div className='mt-[10rem] text-center'>
          {data.hero_tagline && <h6>{data.hero_tagline}</h6>}

          {data.hero_headline && (
            <h1 className='text-white'>{data.hero_headline}</h1>
          )}

          {data.hero_rich_text && (
            <div className='text-slate-200 mt-6 mb-8'>
              <TinaMarkdown content={data.hero_rich_text} />
            </div>
          )}

          {data.hero_actions?.length && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
              {data.hero_actions.map((action, i) => (
                <LinkButton
                  key={i}
                  href={action!.hero_action_href!}
                  type={
                    action!.hero_action_type! as 'button' | 'text' | 'outline'
                  }
                >
                  {action?.hero_action_label}
                </LinkButton>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
