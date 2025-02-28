import { RichTextTemplate as RichTextComponent } from '@tinacms/schema-tools';
import { Template } from 'tinacms';
export const RichTextComponents: RichTextComponent<any>[] = [
  {
    name: 'Button',
    label: 'Button',
    fields: [
      { name: 'rich_text_button_text', label: 'Text', type: 'string', required: true },
      {
        name: 'rich_text_button_variant',
        label: 'Variant',
        type: 'string',
        required: true,
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Tertiary', value: 'tertiary' },
        ],
      },
      { name: 'rich_text_button_href', label: 'Href', type: 'reference', collections: ['page'] },
      { label: 'External Href', name: 'rich_text_button_external_href', type: 'string' },
    ],
  },
];

export const RichTextTemplate: Template = {
  name: 'richText',
  label: 'Rich Text',
  ui: {
    itemProps(item) {
      return { label: 'Rich Text ' + item?.rich_text_name || '' };
    },
  },
  fields: [
    { label: 'Name', name: 'rich_text_name', type: 'string', required: true },
    {
      label: 'Text',
      name: 'rich_text_text',
      type: 'rich-text',
      required: true,
      templates: RichTextComponents,
    },
  ],
};
