import moment from 'moment';
import type { Collection, Form, TinaCMS } from 'tinacms';
import { auditBeforeSubmit, auditFields } from './audit.utility';
import { seoFields } from './seo.utility';

const Post: Collection = {
  label: 'Posts',
  name: 'post',
  path: 'content/posts',
  format: 'mdx',
  ui: {
    filename: {
      slugify: (values: Record<string, any>) => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
      }
    },
    router: ({
      document
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
      return `news/${document._sys!.breadcrumbs?.join('/')}`;
    },
    beforeSubmit: async ({
      form,
      cms,
      values
    }: {
      form: Form;
      cms: TinaCMS;
      values: Record<string, any>;
    }) => {
      const auditValues = await auditBeforeSubmit({ form, cms, values });
      const date = moment(auditValues.date ?? null);
      if (!date.isValid()) {
        auditValues.date = new Date().toISOString();
      }
      return auditValues;
    }
  },
  fields: [
    ...auditFields,
    ...seoFields,
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Date',
      description:
        'If not provided a valid date, the current date will be used',
      ui: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      type: 'string',
      name: 'excerpt',
      label: 'Excerpt',
      description:
        'A short description of the post, will be used in the post list and post highlight',
      required: true
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      required: true
    },
    {
      type: 'image',
      name: 'image',
      label: 'Image',
      description:
        'The image that will be displayed in the post list, post highlight and hero banner, make sure the image is 16:9 aspect ratio',
      required: true
    },
    {
      type: 'string',
      name: 'hero_image_position',
      label: 'Hero Image Position',
      description: 'The position of the image in the hero banner',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
      ]
    }
  ]
};
export default Post;
