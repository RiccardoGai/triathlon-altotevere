import { Template } from 'tinacms';

export const ContactFormTemplate: Template = {
  name: 'contactForm',
  label: 'Contact Form',
  ui: {
    itemProps: (item: Record<string, any>) => ({
      label: 'Contact Form ' + item?.contact_form_title
    })
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'contact_form_title'
    },
    {
      type: 'string',
      label: 'SubTitle',
      name: 'contact_form_subtitle'
    }
  ]
};
