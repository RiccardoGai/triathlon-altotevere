import { Template } from 'tinacms';

export const SponsorTemplate: Template = {
  name: 'sponsor',
  label: 'Sponsor',
  ui: {
    itemProps(item) {
      return { label: 'Sponsor ' + item?.sponsor_title };
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
      name: 'sponsor_image_width',
      ui: {
        parse: (val) => {
          if (isNaN(parseFloat(val as any))) {
            return undefined as any;
          }
          return parseFloat(val as any);
        }
      }
    },
    {
      type: 'number',
      label: 'Image Height',
      name: 'sponsor_image_height',
      ui: {
        parse: (val) => {
          if (isNaN(parseFloat(val as any))) {
            return undefined as any;
          }
          return parseFloat(val as any);
        }
      }
    },

    {
      type: 'object',
      label: 'Sponsor Images',
      name: 'sponsor_image',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: 'Sponsor ' + item?.sponsor_image_name };
        }
      },
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'sponsor_image_name'
        },
        {
          type: 'image',
          label: 'Image',
          name: 'sponsor_image_image'
        },
        {
          type: 'string',
          label: 'Href',
          name: 'sponsor_image_href'
        }
      ]
    }
  ]
};
