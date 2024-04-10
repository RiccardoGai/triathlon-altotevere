import { Template } from 'tinacms';

export const PriceTemplate: Template = {
  name: 'price',
  label: 'Price',
  ui: {
    itemProps(item) {
      return { label: item?.price_title };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'price_title'
    },
    {
      type: 'string',
      label: 'SubTitle',
      name: 'price_subtitle'
    },
    {
      label: 'Pezzi',
      name: 'price_children',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.price_title })
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'price_title',
          required: true
        },
        {
          type: 'string',
          label: 'Description',
          name: 'price_description'
        },
        {
          label: 'Price',
          name: 'price_price',
          type: 'number'
        }
      ]
    }
  ]
};
