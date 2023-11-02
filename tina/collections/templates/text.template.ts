import { Template } from 'tinacms';

export const TextTemplate: Template = {
  name: 'text',
  label: 'Text Content',
  ui: {
    defaultItem: {
      name: 'Text Content',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'
    },
    itemProps(item) {
      return { label: item?.text_name };
    }
  },
  fields: [
    {
      label: 'Name',
      name: 'text_name',
      type: 'string',
      required: true
    },
    {
      label: 'Text',
      name: 'text_rich_text',
      type: 'rich-text',
      required: true
    }
  ]
};
