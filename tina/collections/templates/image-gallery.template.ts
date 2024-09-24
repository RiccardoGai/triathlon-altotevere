import { Template } from 'tinacms';

export const ImageGalleryTemplate: Template = {
  name: 'imageGallery',
  label: 'Image Gallery',
  ui: {
    itemProps(item) {
      return { label: 'Image Gallery ' + item?.image_gallery_title ?? '' };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'image_gallery_title'
    },
    {
      type: 'string',
      label: 'SubTitle',
      name: 'image_gallery_subtitle'
    },
    {
      type: 'number',
      label: 'Image Width',
      name: 'image_gallery_width',
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
      type: 'number',
      label: 'Image Height',
      name: 'image_gallery_height',
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
      label: 'Images',
      name: 'image_gallery_images',
      type: 'image',
      list: true
    }
  ]
};
