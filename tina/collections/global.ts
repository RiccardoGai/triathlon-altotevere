import type { Collection } from 'tinacms';
import { GlobalHeaderHeader_Links } from '../__generated__/types';

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
              name: 'href',
              ui: {
                validate(value, allValues, meta) {
                  const property = ((meta as any).name as string)?.split('.');
                  if (property && allValues) {
                    property.pop();
                    const object = getPropertyFromObject(
                      allValues,
                      property?.join('.')
                    ) as GlobalHeaderHeader_Links;
                    if (value && (object?.sub_menu?.length ?? 0) > 0) {
                      return 'When you have a sub menu, you cannot have a link';
                    }
                  }
                }
              }
            },
            {
              type: 'object',
              label: 'Sub Menu',
              name: 'sub_menu',
              list: true,
              ui: {
                validate(value, allValues, meta) {
                  const property = ((meta as any).name as string)?.split('.');
                  if (property && allValues) {
                    property.pop();
                    const object = getPropertyFromObject(
                      allValues,
                      property?.join('.')
                    ) as GlobalHeaderHeader_Links;
                    if (value && value.length > 0 && object.href) {
                      return 'When you have a link, you cannot have a sub menu';
                    }
                  }
                },
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

function getPropertyFromObject(object: any, key: string) {
  key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  key = key.replace(/^\./, ''); // strip a leading dot
  var a = key.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in object) {
      object = object[k];
    } else {
      return;
    }
  }
  return object;
}

export default Global;
