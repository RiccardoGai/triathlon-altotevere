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
    <div data-tina-field={tinaField(data)} className="py-16 md:py-20">
      {data.staff_title && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {data.staff_title}
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-${data.staff_number_per_row ?? 3} justify-center px-4`}
      >
        {(data.staff_people ?? []).map((staff, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            data-tina-field={tinaField(staff)}
          >
            {/* Image container with overlay */}
            <div className="relative h-72 md:h-80 overflow-hidden">
              <Image
                data-tina-field={tinaField(staff, 'staff_person_image')}
                src={staff?.staff_person_image || ''}
                alt={staff?.staff_person_name || ''}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                fill={true}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3
                  className="text-xl md:text-2xl font-bold mb-1"
                  data-tina-field={tinaField(staff, 'staff_person_name')}
                >
                  {staff?.staff_person_name}
                </h3>

                {staff?.staff_person_role && (
                  <p
                    className="text-secondary font-bold text-sm uppercase tracking-wider"
                    data-tina-field={tinaField(staff, 'staff_person_role')}
                  >
                    {staff?.staff_person_role}
                  </p>
                )}
              </div>

              {/* Social links - appear on hover */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                {staff?.staff_person_website && (
                  <Link
                    data-tina-field={tinaField(staff, 'staff_person_website')}
                    href={staff?.staff_person_website}
                    target="_blank"
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-200 shadow-lg"
                  >
                    <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                  </Link>
                )}
                {staff?.staff_person_facebook && (
                  <Link
                    data-tina-field={tinaField(staff, 'staff_person_facebook')}
                    href={staff?.staff_person_facebook}
                    target="_blank"
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-700 hover:bg-[#1877f2] hover:text-white transition-all duration-200 shadow-lg"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                  </Link>
                )}
                {staff?.staff_person_instagram && (
                  <Link
                    data-tina-field={tinaField(staff, 'staff_person_instagram')}
                    href={staff?.staff_person_instagram}
                    target="_blank"
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-200 shadow-lg"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Description below image if exists */}
            {staff?.staff_person_description && (
              <div className="p-6 bg-gray-50">
                <p
                  className="text-gray-600 leading-relaxed text-sm"
                  data-tina-field={tinaField(staff, 'staff_person_description')}
                >
                  {staff?.staff_person_description}
                </p>
              </div>
            )}

            {/* Accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>
    </div>
  );
}
