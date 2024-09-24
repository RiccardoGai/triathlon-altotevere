import type { Collection, Form, TinaCMS } from 'tinacms';
import { GlobalLinks } from '../__generated__/types';
import { auditBeforeSubmit, auditFields } from './audit.utility';

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
    },
    beforeSubmit: async ({
      form,
      cms,
      values
    }: {
      form: Form;
      cms: TinaCMS;
      values: Record<string, any>;
    }) => {
      const auditValues = await auditBeforeSubmit({ form, cms, values });
      return auditValues;
    }
  },
  fields: [
    ...auditFields,
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
        itemProps: (item: Record<string, any>) => {
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
            validate: (value: any, allValues: any, meta: any) => {
              const property = ((meta as any).name as string)?.split('.');
              if (property && allValues) {
                property.pop();
                const object = getPropertyFromObject(
                  allValues,
                  property?.join('.')
                ) as GlobalLinks;
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
            validate: (value: any[], allValues: any, meta: any) => {
              const property = ((meta as any).name as string)?.split('.');
              if (property && allValues) {
                property.pop();
                const object = getPropertyFromObject(
                  allValues,
                  property?.join('.')
                ) as GlobalLinks;
                if (value && value.length > 0 && object.href) {
                  return 'When you have a link, you cannot have a sub menu';
                }
              }
            },
            itemProps: (item: Record<string, any>) => {
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
    },
    {
      type: 'string',
      label: 'Privacy Policy',
      name: 'privacy_policy'
    },
    {
      type: 'string',
      label: 'Cookie Policy',
      name: 'cookie_policy'
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
    },
    {
      type: 'object',
      label: 'Contact Info',
      name: 'contact_info',
      fields: [
        {
          type: 'string',
          label: 'Address',
          name: 'address'
        },
        {
          type: 'string',
          label: 'Phone',
          name: 'phone'
        },
        {
          type: 'string',
          label: 'Email',
          name: 'email'
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
