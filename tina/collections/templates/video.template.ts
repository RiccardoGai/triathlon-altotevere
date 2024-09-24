import { Template } from 'tinacms';

export const VideoTemplate: Template = {
  name: 'video',
  label: 'Video',
  ui: {
    itemProps(item) {
      return { label: 'Video ' + item?.video_name ?? '' };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Name',
      name: 'video_name',
      required: true
    },
    {
      type: 'image',
      label: 'Video',
      name: 'video_ref',
      required: true
    },
    {
      type: 'number',
      label: 'Width',
      name: 'width',
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
      label: 'Height',
      name: 'height',
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
      type: 'boolean',
      label: 'Autoplay',
      name: 'autoplay'
    },
    {
      type: 'boolean',
      label: 'Loop',
      name: 'loop'
    },
    {
      type: 'boolean',
      label: 'Muted',
      name: 'muted'
    },
    {
      type: 'boolean',
      label: 'Controls',
      name: 'controls'
    }
  ]
};
