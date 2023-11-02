import { Template } from 'tinacms';

export const GridTemplate: Template = {
  name: 'grid',
  label: 'Grid',
  ui: {
    itemProps(item) {
      return { label: item?.name };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Name',
      name: 'grid_name',
      required: true
    },
    {
      label: 'Columns',
      name: 'grid_columns',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.grid_column_name })
      },
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'grid_column_name',
          required: true
        },
        {
          label: 'Size',
          name: 'grid_column_size',
          type: 'string',
          options: ['25%', '50%', '75%', '100%'],
          required: true
        },
        {
          label: 'Content',
          name: 'grid_column_rich_text',
          type: 'rich-text',
          required: true
        }
      ]
    }
  ]
};
