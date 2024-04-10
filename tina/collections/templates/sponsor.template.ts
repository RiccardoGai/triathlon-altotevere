import { Template } from 'tinacms';

export const sponsorTemplate: Template = {
  name: 'sponsor',
  label: 'Sponsor',
  ui: {
    itemProps(item) {
      return { label: item.sponsor_title };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'sponsor_title'
    },
    {
      type: 'image',
      label: 'Immagine',
      name: 'sponsor_image',
      list: true
    }
  ]
};
