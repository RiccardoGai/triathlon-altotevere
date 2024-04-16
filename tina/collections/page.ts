import type { Collection } from 'tinacms';
import { CONFIG } from '../../app/config/config';
import { ContactFormTemplate } from './templates/contact-form.template';
import { GridTemplate } from './templates/grid.template';
import { HeroBannerTemplate } from './templates/hero-banner.template';
import { ImageGalleryTemplate } from './templates/image-gallery.template';
import { ImageTemplate } from './templates/image.template';
import { NewsTemplate } from './templates/news.template';
import { PriceTemplate } from './templates/price.template';
import { RichTextTemplate } from './templates/rich-text.template';
import { SponsorTemplate } from './templates/sponsor.template';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === CONFIG.HOME_PAGE) {
        return `/`;
      }
      return `/${document._sys.filename}`;
    },
    filename: {
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
      templates: [
        HeroBannerTemplate,
        RichTextTemplate,
        GridTemplate,
        NewsTemplate,
        ImageTemplate,
        PriceTemplate,
        ContactFormTemplate,
        ImageGalleryTemplate,
        SponsorTemplate
      ]
    }
  ]
};
export default Page;
