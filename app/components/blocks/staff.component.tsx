import {
  PageBlocksGridGrid_ColumnsBlocksStaff,
  PageBlocksStaff
} from '@/tina/__generated__/types';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
export default function StaffBlock({
  data
}: {
  data: PageBlocksStaff | PageBlocksGridGrid_ColumnsBlocksStaff;
}) {
  return (
    <div data-tina-field={tinaField(data)}>
      <div className={'mb-8 md:mx-auto md:mb-12 text-center'}>
        {data.staff_title && (
          <h2
            className={
              'font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl'
            }
          >
            {data.staff_title}
          </h2>
        )}
      </div>
      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-${data.staff_number_per_row ?? 1} md:gap-8 justify-center`}
      >
        {(data.staff_people ?? []).map((staff, i) => (
          <div
            key={i}
            className='grid grid-cols-1 md:grid-cols-[min-content,1fr] gap-6 mb-4'
            data-tina-field={tinaField(staff)}
          >
            <div className='h-32 md:h-60 w-32 md:w-60 justify-self-center md:justify-self-auto'>
              <Image
                data-tina-field={tinaField(staff, 'staff_person_image')}
                src={staff?.staff_person_image ?? ''}
                alt={staff?.staff_person_name ?? ''}
                loading='lazy'
                className='h-32 md:h-60 w-32 md:w-60 rounded-full border border-slate-200'
                width={500}
                height={500}
              ></Image>
            </div>

            <div className='flex flex-col w-full justify-center'>
              <h3
                className='font-bold'
                data-tina-field={tinaField(staff, 'staff_person_name')}
              >
                {staff?.staff_person_name}
              </h3>
              <p
                className='mt-4'
                data-tina-field={tinaField(staff, 'staff_person_description')}
              >
                {staff?.staff_person_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
