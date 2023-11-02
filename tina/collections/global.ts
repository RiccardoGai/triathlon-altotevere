import type { Collection } from 'tinacms';

const Global: Collection = {
  label: 'Global',
  name: 'global',
  path: 'content/global',
  format: 'json',
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: 'object',
      label: 'Header',
      name: 'header',
      fields: [
        {
          type: 'image',
          label: 'Logo',
          name: 'logo'
        },
        {
          type: 'object',
          label: 'Header Links',
          name: 'header_links',
          list: true,
          ui: {
            itemProps(item) {
              return { label: item?.name };
            }
          },
          fields: [
            {
              type: 'string',
              label: 'Name',
              name: 'name',
              required: true
            },
            {
              type: 'string',
              label: 'Link',
              name: 'href'
            },
            {
              type: 'object',
              label: 'Sub Menu',
              name: 'sub_menu',
              list: true,
              ui: {
                itemProps(item) {
                  return { label: item?.name };
                }
              },
              fields: [
                {
                  type: 'string',
                  label: 'Name of the sub menu',
                  name: 'name',
                  required: true
                },
                {
                  type: 'string',
                  label: 'Link',
                  name: 'href'
                }
              ]
            }
          ]
        },
        {
          type: 'object',
          label: 'Social Links',
          name: 'social',
          fields: [
            {
              type: 'string',
              label: 'Facebook',
              name: 'facebook'
            },
            {
              type: 'string',
              label: 'Instagram',
              name: 'instagram'
            }
          ]
        }
      ]
    },
    {
      type: 'object',
      label: 'Footer',
      name: 'footer',
      fields: [
        {
          type: 'string',
          label: 'Name of Group of Links',
          name: 'group'
        },
        {
          type: 'object',
          label: 'Nav Links',
          name: 'nav_links',
          list: true,
          fields: [
            {
              type: 'string',
              label: 'Name of the menu on the footer',
              name: 'name',
              required: true
            },
            {
              type: 'string',
              label: 'Link',
              name: 'href'
            }
          ]
        }
      ]
    }
  ]
};

export default Global;
