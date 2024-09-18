import { Template } from 'tinacms';

export const NewsTemplate: Template = {
  name: 'news',
  label: 'News',
  fields: [
    {
      label: 'news',
      name: 'news_children',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.news_title })
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'news_title'
        },
        {
          type: 'string',
          label: 'Description',
          name: 'news_description'
        },
        {
          type: 'reference',
          collections: ['page'],
          label: 'href',
          name: 'news_href'
        },
        {
          type: 'image',
          label: 'Image',
          name: 'news_image'
        }
      ]
    }
  ]
};
