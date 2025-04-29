import { Template } from 'tinacms';

export const ImageGalleryTemplate: Template = {
  name: 'imageGallery',
  label: 'Image Gallery',
  ui: {
    itemProps(item) {
      return { label: 'Image Gallery ' + item?.image_gallery_title || '' };
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'image_gallery_title',
    },
    {
      type: 'string',
      label: 'SubTitle',
      name: 'image_gallery_subtitle',
    },
    {
      type: 'boolean',
      label: 'Show More Button',
      name: 'image_gallery_show_more_button',
    },
    {
      label: 'Images',
      name: 'image_gallery_images',
      type: 'image',
      list: true,
    },
  ],
};
