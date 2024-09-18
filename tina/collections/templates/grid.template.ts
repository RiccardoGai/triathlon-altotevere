import { Template } from 'tinacms';
import { ContactFormTemplate } from './contact-form.template';
import { ImageGalleryTemplate } from './image-gallery.template';
import { ImageTemplate } from './image.template';
import { PriceTemplate } from './price.template';
import { RichTextTemplate } from './rich-text.template';
import { SponsorTemplate } from './sponsor.template';
import { VideoTemplate } from './video.template';

export const GridTemplate: Template = {
  name: 'grid',
  label: 'Grid',
  ui: {
    itemProps(item) {
      return { label: 'Grid ' + item?.grid_name ?? '' };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Name',
      name: 'grid_name'
    },
    {
      label: 'Columns',
      name: 'grid_columns',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.grid_column_name ?? '' })
      },
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'grid_column_name'
        },
        {
          label: 'Size',
          name: 'grid_column_size',
          type: 'string',
          options: ['25%', '50%', '75%', '100%'],
          required: true
        },
        {
          type: 'object',
          list: true,
          name: 'blocks',
          label: 'Content',
          ui: {
            visualSelector: true
          },
          templates: [
            RichTextTemplate,
            ImageTemplate,
            VideoTemplate,
            PriceTemplate,
            ContactFormTemplate,
            ImageGalleryTemplate,
            SponsorTemplate
          ]
        }
      ]
    }
  ]
};
