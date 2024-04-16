import { Template } from 'tinacms';

export const ImageGalleryTemplate: Template = {
  name: 'image_gallery',
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
      name: 'image_gallery_width'
    },
    {
      type: 'number',
      label: 'Image Height',
      name: 'image_gallery_height'
    },
    {
      label: 'Images',
      name: 'image_gallery_images',
      type: 'image',
      list: true
    }
  ]
};
