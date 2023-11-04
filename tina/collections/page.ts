import type { Collection } from 'tinacms';
import { GridTemplate } from './templates/grid.template';
import { HeroBannerTemplate } from './templates/hero-banner.template';
import { TextTemplate } from './templates/text.template';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return `/`;
      }
      return `/${document._sys.filename}`;
    },
    filename: {
      readonly: true,
      slugify: (values) => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
      }
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      description:
        'The title of the page. This is used to display the title in the CMS',
      isTitle: true,
      required: true
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true
      },
      templates: [HeroBannerTemplate, TextTemplate, GridTemplate]
    }
  ]
};
export default Page;
