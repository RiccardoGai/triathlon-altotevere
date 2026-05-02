import type { Collection, Form, TinaCMS } from 'tinacms';
import { ContactFormTemplate } from './templates/contact-form.template';
import { ContactInfoTemplate } from './templates/contact-info.template';
import { GridTemplate } from './templates/grid.template';
import { HeroBannerTemplate } from './templates/hero-banner.template';
import { ImageGalleryTemplate } from './templates/image-gallery.template';
import { ImageTemplate } from './templates/image.template';
import { PostHighlightTemplate } from './templates/post-highlight.template';
import { PostListTemplate } from './templates/post-list.template';
import { PriceTemplate } from './templates/price.template';
import { RichTextTemplate } from './templates/rich-text.template';
import { SponsorTemplate } from './templates/sponsor.template';
import { StaffTemplate } from './templates/staff.template';
import { PdfViewerTemplate } from './templates/pdf-viewer.template';
import { VideoTemplate } from './templates/video.template';
import { auditBeforeSubmit, auditFields } from './utils/audit.utils';
import { seoFields } from './utils/seo.utils';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({
      document,
    }: {
      document: {
        _sys: {
          title?: string;
          template: string;
          breadcrumbs: string[];
          path: string;
          basename: string;
          relativePath: string;
          filename: string;
          extension: string;
        };
      };
    }) => {
      return `${document._sys!.breadcrumbs?.join('/')}`;
    },
    filename: {
      slugify: (values: Record<string, any>) => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
      },
    },
    beforeSubmit: async ({
      form,
      cms,
      values,
    }: {
      form: Form;
      cms: TinaCMS;
      values: Record<string, any>;
    }) => {
      const auditValues = await auditBeforeSubmit({ form, cms, values });
      return auditValues;
    },
  },
  fields: [
    ...auditFields,
    ...seoFields,
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        HeroBannerTemplate,
        RichTextTemplate,
        GridTemplate,
        PostHighlightTemplate,
        PostListTemplate,
        ImageTemplate,
        VideoTemplate,
        PriceTemplate,
        ContactFormTemplate,
        ImageGalleryTemplate,
        SponsorTemplate,
        StaffTemplate,
        ContactInfoTemplate,
        PdfViewerTemplate,
      ],
    },
  ],
};
export default Page;
