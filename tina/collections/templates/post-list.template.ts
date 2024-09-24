import { Template } from 'tinacms';

export const PostListTemplate: Template = {
  name: 'postList',
  label: 'Post List',
  fields: [
    {
      name: 'empty',
      type: 'string',
      ui: {
        component: null
      }
    }
  ]
};
