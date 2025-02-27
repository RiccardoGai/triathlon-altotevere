import {
  PageBlocksGridGrid_ColumnsBlocksStaff,
  PageBlocksStaff
} from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
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
              'font-bold leading-tighter tracking-tighter  text-heading text-3xl'
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
            className='grid grid-cols-1 md:grid-cols-[min-content,1fr] gap-6 mb-4 items-center'
            data-tina-field={tinaField(staff)}
          >
            <div className='h-32 md:h-40 w-32 md:w-40 justify-self-center md:justify-self-auto relative'>
              <Image
                data-tina-field={tinaField(staff, 'staff_person_image')}
                src={staff?.staff_person_image ?? ''}
                alt={staff?.staff_person_name ?? ''}
                loading='lazy'
                className='h-32 md:h-40 w-32 md:w-40 rounded-full aspect-square'
                fill={true}
              ></Image>
            </div>

            <div className='flex flex-col w-full justify-center'>
              <div
                className='font-bold text-center md:text-left'
                data-tina-field={tinaField(staff, 'staff_person_name')}
              >
                {staff?.staff_person_name}
              </div>
              {staff?.staff_person_role && (
                <p
                  className='mt-2'
                  data-tina-field={tinaField(staff, 'staff_person_role')}
                >
                  {staff?.staff_person_role}
                </p>
              )}
              {staff?.staff_person_description && (
                <p
                  className='mt-4'
                  data-tina-field={tinaField(staff, 'staff_person_description')}
                >
                  {staff?.staff_person_description}
                </p>
              )}
              <div className='mt-4'>
                {staff?.staff_person_website && (
                  <Link
                    data-tina-field={tinaField(staff, 'staff_person_facebook')}
                    className='focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm inline-flex items-center mr-3 mb-4'
                    href={staff?.staff_person_website}
                    target='_blank'
                  >
                    <FontAwesomeIcon icon={faGlobe} size='xl' />
                  </Link>
                )}
                {staff?.staff_person_facebook && (
                  <Link
                    data-tina-field={tinaField(staff, 'staff_person_facebook')}
                    className='focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm inline-flex items-center mr-3 mb-4'
                    href={staff?.staff_person_facebook}
                    target='_blank'
                  >
                    <FontAwesomeIcon icon={faFacebook} size='xl' />
                  </Link>
                )}
                {staff?.staff_person_instagram && (
                  <Link
                    data-tina-field={tinaField(staff, 'staff_person_instagram')}
                    className='focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm inline-flex items-center mr-3 mb-4'
                    href={staff?.staff_person_instagram}
                    target='_blank'
                  >
                    <FontAwesomeIcon icon={faInstagram} size='xl' />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
