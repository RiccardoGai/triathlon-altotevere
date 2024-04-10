// import sendEmail from '@/app/actions/send-mail.action';
import {
  PageBlocksContactForm,
  PageBlocksGridGrid_ColumnsBlocksContactForm
} from '@/tina/__generated__/types';
import { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Button from '../button.component';

export default function ContactFormBlock({
  data
}: {
  data: PageBlocksContactForm | PageBlocksGridGrid_ColumnsBlocksContactForm;
}) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <div data-tina-field={tinaField(data)}>
      <div className={'mb-8 md:mx-auto md:mb-12 text-center'}>
        {data.contact_form_title && (
          <h2
            className={
              'font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl'
            }
          >
            {data.contact_form_title}
          </h2>
        )}

        {data.contact_form_subtitle && (
          <p className={'mt-4 text-muted'}>{data.contact_form_subtitle}</p>
        )}
      </div>
      <form
        // action={async (formData: FormData) => {
        //   await sendEmail(formData);
        //   setShowSuccessMessage(true);
        // }}
      >
        <div className='mb-6'>
          <label htmlFor='name' className='block text-sm font-medium mb-1'>
            Nome
          </label>
          <input
            type='text'
            name='name'
            required
            className='py-3 px-4 block w-full text-md rounded-lg border border-gray-200 bg-white'
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            Email
          </label>
          <input
            type='email'
            name='email'
            required
            className='py-3 px-4 block w-full text-md rounded-lg border border-gray-200 bg-white'
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='message' className='block text-sm font-medium mb-1'>
            Messaggio
          </label>
          <textarea
            id='textarea'
            name='message'
            rows={4}
            required
            className='py-3 px-4 block w-full text-md rounded-lg border border-gray-200 bg-white'
          />
        </div>

        <div className='mt-3 flex items-start'>
          <div className='flex mt-0.5'>
            <input
              id='disclaimer'
              name='disclaimer'
              type='checkbox'
              required
              className='cursor-pointer mt-1 py-3 px-4 block w-full text-md rounded-lg border border-gray-200 bg-white'
            />
          </div>
          <div className='ml-3'>
            <label
              htmlFor='disclaimer'
              className='cursor-pointer select-none text-sm text-gray-600'
            >
              Inviando questo modulo di contatto, riconosci e accetti la
              raccolta dei tuoi dati personali.
            </label>
          </div>
        </div>

        <div className='mt-10 grid justify-center'>
          <Button
            className='w-40'
            variant='primary'
            type='submit'
            text='Invia'
          ></Button>
        </div>
      </form>
      {showSuccessMessage && (
        <div className='mt-6'>
          <span className='font-bold leading-tight font-heading text-primary'>
            Messaggio inviato con successo, ti contatteremo il prima possibile.
          </span>
        </div>
      )}
    </div>
  );
}
