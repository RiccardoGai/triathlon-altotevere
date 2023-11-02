import { Template } from 'tinacms';

export const HeroBannerTemplate: Template = {
  name: 'hero_banner',
  label: 'Hero Banner',
  // ui: {
  //   previewSrc: "/blocks/hero.png",
  //   defaultItem: {
  //     tagline: "Here's some text above the other text",
  //     headline: "This Big Text is Totally Awesome",
  //     text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
  //   },
  // },
  fields: [
    {
      type: 'string',
      label: 'Tagline',
      name: 'hero_tagline'
    },
    {
      type: 'string',
      label: 'Headline',
      name: 'hero_headline'
    },
    {
      label: 'Text',
      name: 'hero_rich_text',
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
        itemProps: (item) => ({ label: item.hero_action_label })
      },
      fields: [
        {
          label: 'Label',
          name: 'hero_action_label',
          type: 'string',
          required: true
        },
        {
          label: 'Type',
          name: 'hero_action_type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Button Outline', value: 'outline' },
            { label: 'Button Text', value: 'text' }
          ],
          required: true
        },
        {
          label: 'Link',
          name: 'hero_action_href',
          type: 'string',
          required: true
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
