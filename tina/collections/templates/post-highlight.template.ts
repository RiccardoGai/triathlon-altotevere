import { Template } from 'tinacms';

export const PostHighlightTemplate: Template = {
  name: 'postHighlight',
  label: 'Post Highlight',
  fields: [
    {
      label: 'Number of Posts',
      name: 'post_highlight_number_of_posts',
      type: 'number',
      required: true
    },
    {
      label: 'Pinned Post',
      name: 'post_highlight_pinned_post',
      description:
        'Posts that will be pinned on top of the list, if the number of posts is greater than the number of pinned posts, the remaining posts will be fetched from the database in descending order by date',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.post_highlight_pinned_post_post?.title
        })
      },
      fields: [
        {
          label: 'Post',
          name: 'post_highlight_pinned_post_post',
          type: 'reference',
          collections: ['post'],
          required: true
        }
      ]
    }
  ]
};
