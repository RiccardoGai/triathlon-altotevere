import { Template } from 'tinacms';

export const PriceTemplate: Template = {
  name: 'price',
  label: 'Price',
  ui: {
    itemProps: (item: Record<string, any>) => ({
      label: 'Price ' + item?.price_title || ''
    })
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
      label: 'Prices',
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
          type: 'rich-text',
          label: 'Description',
          name: 'price_description'
        },
        {
          label: 'Price',
          name: 'price_price',
          type: 'number',
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
          type: 'reference',
          label: 'Contact Button',
          name: 'price_contact_button',
          collections: ['page']
        }
      ]
    }
  ]
};
