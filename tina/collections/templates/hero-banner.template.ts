import { Template } from 'tinacms';

export const HeroBannerTemplate: Template = {
  name: 'hero_banner',
  label: 'Hero Banner',
  fields: [
    {
      label: 'Tagline',
      name: 'hero_tagline',
      type: 'string'
    },
    {
      label: 'Title',
      name: 'hero_title',
      type: 'rich-text'
    },
    {
      label: 'Subtitle',
      name: 'hero_subtitle',
      type: 'rich-text'
    },
    {
      label: 'Actions',
      name: 'hero_actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          href: '/'
        },
        itemProps: (item) => ({ label: item.hero_action_text })
      },
      fields: [
        {
          label: 'Text',
          name: 'hero_action_text',
          type: 'string',
          required: true
        },
        {
          label: 'Variant',
          name: 'hero_action_variant',
          type: 'string',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Link', value: 'link' }
          ],
          required: true
        },
        {
          label: 'Href',
          name: 'hero_action_href',
          type: 'reference',
          collections: ['page']
        }
      ]
    },
    {
      type: 'image',
      label: 'Image',
      name: 'hero_image',
      required: true
    }
  ]
};
