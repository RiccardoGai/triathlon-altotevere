import type { Collection } from 'tinacms';
import { GlobalHeaderLinks } from '../__generated__/types';

const Global: Collection = {
  label: 'Global',
  name: 'global',
  path: 'content/global',
  format: 'mdx',
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
          label: 'Links',
          name: 'links',
          list: true,
          ui: {
            itemProps(item) {
              return { label: item?.text };
            }
          },
          fields: [
            {
              type: 'string',
              label: 'Text',
              name: 'text'
            },
            {
              type: 'reference',
              label: 'Href',
              name: 'href',
              collections: ['page'],
              ui: {
                validate(value, allValues, meta) {
                  const property = ((meta as any).name as string)?.split('.');
                  if (property && allValues) {
                    property.pop();
                    const object = getPropertyFromObject(
                      allValues,
                      property?.join('.')
                    ) as GlobalHeaderLinks;
                    if (value && (object?.links?.length ?? 0) > 0) {
                      return 'When you have a sub menu, you cannot have a link';
                    }
                  }
                }
              }
            },
            {
              type: 'object',
              label: 'Links',
              name: 'links',
              list: true,
              ui: {
                validate(value, allValues, meta) {
                  const property = ((meta as any).name as string)?.split('.');
                  if (property && allValues) {
                    property.pop();
                    const object = getPropertyFromObject(
                      allValues,
                      property?.join('.')
                    ) as GlobalHeaderLinks;
                    if (value && value.length > 0 && object.href) {
                      return 'When you have a link, you cannot have a sub menu';
                    }
                  }
                },
                itemProps(item) {
                  return { label: item?.text };
                }
              },
              fields: [
                {
                  type: 'string',
                  label: 'Text',
                  name: 'text',
                  required: true
                },
                {
                  type: 'reference',
                  collections: ['page'],
                  label: 'Href',
                  name: 'href'
                }
              ]
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
          type: 'object',
          label: 'Links secondari',
          name: 'secondary_links',
          list: true,
          ui: {
            itemProps: (item) => ({ label: item.text })
          },
          fields: [
            {
              type: 'reference',
              collections: ['page'],
              label: 'href',
              name: 'href'
            },
            {
              type: 'string',
              label: 'text',
              name: 'text'
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
