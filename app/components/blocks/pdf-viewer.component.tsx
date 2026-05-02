'use client';
import { PageBlocksPdfViewer } from '@/tina/__generated__/types';
import { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';

export default function PdfViewerBlock({ data }: { data: PageBlocksPdfViewer }) {
  const pdfs = data.pdfs ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activePdf = pdfs[activeIndex];

  if (!pdfs.length) return null;

  return (
    <div data-tina-field={tinaField(data)} className="w-full flex flex-col gap-4">
      {data.pdf_viewer_name && (
        <h2 className="text-2xl font-bold">{data.pdf_viewer_name}</h2>
      )}

      {pdfs.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {pdfs.map((pdf, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === activeIndex
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {pdf?.pdf_label ?? `PDF ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      {activePdf?.pdf_url && (
        <div className="w-full rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <iframe
            key={activePdf.pdf_url}
            src={activePdf.pdf_url}
            className="w-full"
            style={{ height: data.height ? `${data.height}px` : '800px' }}
            title={activePdf.pdf_label ?? 'PDF'}
          />
        </div>
      )}

      {activePdf?.pdf_url && (
        <a
          href={activePdf.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Apri PDF in nuova scheda
        </a>
      )}
    </div>
  );
}
