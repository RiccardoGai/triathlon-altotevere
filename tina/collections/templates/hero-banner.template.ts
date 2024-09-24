import { Template } from 'tinacms';

export const HeroBannerTemplate: Template = {
  name: 'heroBanner',
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
      type: 'string'
    },
    {
      label: 'SubTitle',
      name: 'hero_subtitle',
      type: 'rich-text'
    },
    {
      label: 'Height',
      name: 'hero_height',
      type: 'string',
      options: [
        { label: '50%', value: '50%' },
        { label: '60%', value: '60%' },
        { label: '70%', value: '70%' },
        { label: '80%', value: '80%' },
        { label: '90%', value: '90%' },
        { label: '100%', value: '100%' }
      ]
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
