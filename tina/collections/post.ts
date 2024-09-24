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
      label: 'Image'
    }
  ]
};
export default Post;
