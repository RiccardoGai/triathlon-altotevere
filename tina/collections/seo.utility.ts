import { TinaField } from 'tinacms';

export const seoFields = [
  {
    type: 'object',
    label: 'SEO',
    name: 'seo',
    fields: [
      { type: 'string', label: 'Title', name: 'title' },
      { type: 'string', label: 'Description', name: 'description' },
      { type: 'string', label: 'Keywords', name: 'keywords' }
    ]
  }
] as TinaField[];
