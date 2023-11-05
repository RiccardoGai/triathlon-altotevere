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
      type: 'object',
      label: 'SEO',
      name: 'seo',
      fields: [
        { type: 'string', label: 'Title', name: 'title' },
        { type: 'string', label: 'Description', name: 'description' },
        { type: 'string', label: 'Keywords', name: 'keywords' }
      ]
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
