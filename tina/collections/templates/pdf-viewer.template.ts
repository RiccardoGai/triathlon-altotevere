import { Template } from 'tinacms';

export const PdfViewerTemplate: Template = {
  name: 'pdfViewer',
  label: 'PDF Viewer',
  ui: {
    itemProps(item) {
      return { label: 'PDF Viewer ' + (item?.pdf_viewer_name ?? '') };
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Name',
      name: 'pdf_viewer_name',
    },
    {
      type: 'number',
      label: 'Height (px)',
      name: 'height',
      ui: {
        parse: (val) => {
          if (isNaN(parseFloat(val as any))) {
            return undefined as any;
          }
          return parseFloat(val as any);
        },
      },
    },
    {
      type: 'object',
      label: 'PDF Files',
      name: 'pdfs',
      list: true,
      ui: {
        itemProps(item) {
          return { label: item?.pdf_label ?? 'PDF' };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Label',
          name: 'pdf_label',
          required: true,
        },
        {
          type: 'image',
          label: 'PDF File',
          name: 'pdf_url',
          required: true,
        },
      ],
    },
  ],
};
