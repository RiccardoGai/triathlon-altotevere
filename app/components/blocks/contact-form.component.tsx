import sendEmail from '@/app/actions/send-mail.action';
import {
  PageBlocksContactForm,
  PageBlocksGridGrid_ColumnsBlocksContactForm,
} from '@/tina/__generated__/types';
import { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Button from '../button.component';

export default function ContactFormBlock({
  data,
}: {
  data: PageBlocksContactForm | PageBlocksGridGrid_ColumnsBlocksContactForm;
}) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const inputClasses =
    'w-full px-4 py-3.5 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 placeholder:text-gray-400';

  return (
    <div data-tina-field={tinaField(data)} className="py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        {data.contact_form_title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {data.contact_form_title}
          </h2>
        )}
        {data.contact_form_subtitle && (
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{data.contact_form_subtitle}</p>
        )}
        <div className="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
      </div>

      {/* Form */}
      <form
        className="max-w-xl mx-auto"
        action={async (formData: FormData) => {
          await sendEmail(formData);
          setShowSuccessMessage(true);
        }}
      >
        <div className="space-y-5">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Il tuo nome"
              className={inputClasses}
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="nome@esempio.it"
              className={inputClasses}
            />
          </div>

          {/* Message field */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
              Messaggio
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Scrivi il tuo messaggio..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Disclaimer checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              id="disclaimer"
              name="disclaimer"
              type="checkbox"
              required
              className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer transition-colors"
            />
            <label
              htmlFor="disclaimer"
              className="cursor-pointer select-none text-sm text-gray-500 leading-relaxed"
            >
              Inviando questo modulo di contatto, riconosci e accetti la raccolta dei tuoi dati personali.
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8">
          <Button variant="primary" type="submit" className="w-full sm:w-auto">
            <span>Invia messaggio</span>
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </form>

      {/* Success message */}
      {showSuccessMessage && (
        <div className="mt-8 max-w-xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-green-800">Messaggio inviato con successo!</p>
              <p className="text-sm text-green-600">Ti contatteremo il prima possibile.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
