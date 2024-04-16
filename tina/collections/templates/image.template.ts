import { Template } from 'tinacms';

export const ImageTemplate: Template = {
  name: 'image',
  label: 'Image',
  ui: {
    itemProps(item) {
      return { label: 'Image ' + item?.name ?? ''};
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Name',
      name: 'image_name',
      required: true
    },
    {
      type: 'image',
      label: 'Image',
      name: 'image_ref',
      required: true
    },
    {
      type: 'number',
      label: 'Width',
      name: 'width'
    },
    {
      type: 'number',
      label: 'Height',
      name: 'height'
    }
  ]
};
