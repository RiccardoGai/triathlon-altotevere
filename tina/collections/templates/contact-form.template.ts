import { Template } from 'tinacms';

export const ContactFormTemplate: Template = {
  name: 'contactForm',
  label: 'Contact Form',
  ui: {
    itemProps(_item) {
      return { label: 'Contact Form' };
    }
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
