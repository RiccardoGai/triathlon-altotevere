import { Template } from 'tinacms';

export const RichTextTemplate: Template = {
  name: 'richText',
  label: 'Rich Text',
  ui: {
    itemProps: (item: Record<string, any>) => ({
      label: 'Rich Text ' + item?.rich_text_name || ''
    })
  },
  fields: [
    {
      label: 'Name',
      name: 'rich_text_name',
      type: 'string',
      required: true
    },
    {
      label: 'Text',
      name: 'rich_text_text',
      type: 'rich-text',
      required: true
    }
  ]
};
