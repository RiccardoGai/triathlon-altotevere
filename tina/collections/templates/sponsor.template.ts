import { Template } from 'tinacms';

export const SponsorTemplate: Template = {
  name: 'sponsor',
  label: 'Sponsor',
  ui: {
    itemProps(item) {
      return { label: 'Sponsor ' + item?.sponsor_title ?? '' };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'sponsor_title'
    },
    {
      type: 'number',
      label: 'Image Width',
      name: 'sponsor_image_width'
    },
    {
      type: 'number',
      label: 'Image Height',
      name: 'sponsor_image_height'
    },
    {
      type: 'image',
      label: 'Image',
      name: 'sponsor_image',
      list: true
    }
  ]
};
