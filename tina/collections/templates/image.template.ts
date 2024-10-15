import { Template } from 'tinacms';

export const ImageTemplate: Template = {
  name: 'image',
  label: 'Image',
  ui: {
    itemProps: (item: Record<string, any>) => ({
      label: 'Image ' + item?.image_name || ''
    })
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
      name: 'width',
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
      label: 'Height',
      name: 'height',
      ui: {
        parse: (val) => {
          if (isNaN(parseFloat(val as any))) {
            return undefined as any;
          }
          return parseFloat(val as any);
        }
      }
    }
  ]
};
