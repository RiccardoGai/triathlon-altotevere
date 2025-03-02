import { PageBlocksGridGrid_ColumnsBlocksStaff, PageBlocksStaff } from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

export default function StaffBlock({
  data,
}: {
  data: PageBlocksStaff | PageBlocksGridGrid_ColumnsBlocksStaff;
}) {
  return (
    <div data-tina-field={tinaField(data)} className="py-12 bg-gray-100">
      {/* Titolo Staff */}
      {data.staff_title && (
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">{data.staff_title}</h2>
        </div>
      )}

      {/* Container Staff */}
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-${data.staff_number_per_row ?? 1} lg:grid-cols-3 justify-center px-4`}
      >
        {(data.staff_people ?? []).map((staff, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-xl"
            data-tina-field={tinaField(staff)}
          >
            {/* Immagine Profilo */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
              <Image
                data-tina-field={tinaField(staff, 'staff_person_image')}
                src={staff?.staff_person_image || ''}
                alt={staff?.staff_person_name || ''}
                loading="lazy"
                className="rounded-full object-cover border-4 border-gray-200 hover:border-blue-500 transition-all"
                fill={true}
              />
            </div>

            {/* Informazioni Staff */}
            <div className="text-center">
              <h3
                className="text-xl font-bold text-gray-900"
                data-tina-field={tinaField(staff, 'staff_person_name')}
              >
                {staff?.staff_person_name}
              </h3>

              {staff?.staff_person_role && (
                <p
                  className="mt-1 text-sm text-blue-600 font-medium uppercase"
                  data-tina-field={tinaField(staff, 'staff_person_role')}
                >
                  {staff?.staff_person_role}
                </p>
              )}

              {staff?.staff_person_description && (
                <p
                  className="mt-3 text-gray-600 leading-relaxed text-sm"
                  data-tina-field={tinaField(staff, 'staff_person_description')}
                >
                  {staff?.staff_person_description}
                </p>
              )}
            </div>

            {/* Link Social */}
            <div className="mt-4 flex space-x-4">
              {staff?.staff_person_website && (
                <Link
                  data-tina-field={tinaField(staff, 'staff_person_website')}
                  href={staff?.staff_person_website}
                  target="_blank"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faGlobe} size="lg" />
                </Link>
              )}
              {staff?.staff_person_facebook && (
                <Link
                  data-tina-field={tinaField(staff, 'staff_person_facebook')}
                  href={staff?.staff_person_facebook}
                  target="_blank"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </Link>
              )}
              {staff?.staff_person_instagram && (
                <Link
                  data-tina-field={tinaField(staff, 'staff_person_instagram')}
                  href={staff?.staff_person_instagram}
                  target="_blank"
                  className="text-gray-500 hover:text-pink-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
