import { Template } from 'tinacms';

export const StaffTemplate: Template = {
  name: 'staff',
  label: 'Staff',
  ui: {
    itemProps(item) {
      return { label: 'Staff ' + item?.staff_title ?? '' };
    }
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'staff_title'
    },
    {
      type: 'number',
      label: 'Number per row',
      description: 'Number of staff members to display per row',
      name: 'staff_number_per_row',
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
      type: 'object',
      list: true,
      label: 'People',
      name: 'staff_people',
      ui: {
        itemProps(item) {
          return { label: item?.staff_person_name ?? '' };
        }
      },
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'staff_person_name'
        },
        {
          type: 'string',
          label: 'Description',
          name: 'staff_person_description'
        },
        {
          type: 'image',
          label: 'Image',
          name: 'staff_person_image'
        }
      ]
    }
  ]
};
