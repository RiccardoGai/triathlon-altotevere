'use client';
import {
  Global,
  GlobalQuery,
  GlobalQueryVariables,
  GlobalSocial
} from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { tinaField, useTina } from 'tinacms/dist/react';
import { CONFIG } from '../config/config';
import { ITinaResponse } from '../models/tina-response.interface';
import { parseSystemInfoToHref } from '../utils/utils';

export default function Footer({
  props
}: {
  props: ITinaResponse<GlobalQuery, GlobalQueryVariables>;
}) {
  const data = useTina(props);
  const globalData = data.data.global as Global;
  const linkClassNames =
    'block text-gray-500 hover:text-gray-700 hover:underline transition duration-150 ease-in-out mr-2 rtl:mr-0 rtl:ml-2 text-sm mb-2';
  return (
    <footer className='relative border-t border-gray-200 not-prose'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 pt-4'>
          <div className='mb-2 md:mb-4'>
            <Link className='font-bold text-xl' href='/'>
              {CONFIG.APP_NAME}
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-4 mt-4'>
              <div>
                <Link
                  data-tina-field={tinaField(globalData, 'privacy_policy')}
                  className={linkClassNames}
                  target='_blank'
                  href={globalData?.privacy_policy ?? '#'}
                >
                  Privacy
                </Link>
                <Link
                  data-tina-field={tinaField(globalData, 'cookie_policy')}
                  className={linkClassNames}
                  target='_blank'
                  href={globalData?.cookie_policy ?? '#'}
                >
                  Cookie Policy
                </Link>
              </div>
              <div className='grid grid-rows-4 grid-flow-col gap-y-2 gap-x-10'>
                {globalData?.links?.map((link, i) => (
                  <Link
                    data-tina-field={tinaField(link!)}
                    key={i}
                    className={linkClassNames}
                    href={parseSystemInfoToHref(link?.href?._sys)}
                  >
                    {link?.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-start items-end'>
            {
              <Social
                data-tina-field={tinaField(globalData.social)}
                social={globalData?.social!}
              ></Social>
            }

            {globalData?.contact_info && (
              <div
                className='mt-4'
                data-tina-field={tinaField(globalData.contact_info)}
              >
                {globalData?.contact_info?.address && (
                  <p className='text-gray-500 text-sm'>
                    {globalData?.contact_info?.address}
                  </p>
                )}
                {globalData?.contact_info?.phone && (
                  <p className='text-gray-500 text-sm'>
                    {globalData?.contact_info?.phone}
                  </p>
                )}
                {globalData?.contact_info?.email && (
                  <Link
                    target='_blank'
                    href={'mailto:' + globalData?.contact_info?.email}
                    className={linkClassNames}
                  >
                    {globalData?.contact_info?.email}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

const Social = ({ social }: { social: GlobalSocial }) => {
  const linkClassNames =
    'text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 inline-flex items-center';
  return (
    <div>
      <Link
        data-tina-field={tinaField(social, 'facebook')}
        className={linkClassNames}
        href={social?.facebook ?? '#'}
      >
        <FontAwesomeIcon icon={faFacebook} color='black' size='xl' />
      </Link>
      <Link
        data-tina-field={tinaField(social, 'instagram')}
        className={linkClassNames}
        href={social?.instagram ?? '#'}
      >
        <FontAwesomeIcon icon={faInstagram} color='black' size='xl' />
      </Link>
    </div>
  );
};
