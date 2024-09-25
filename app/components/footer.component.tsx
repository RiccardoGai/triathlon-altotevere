'use client';
import { Global, GlobalSocial } from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { tinaField, useTina } from 'tinacms/dist/react';
import { CONFIG } from '../config/config';
import { useGlobalTinaContext } from '../providers/global-tina.providers';
import { parseSystemInfoToHref } from '../utils/utils';

export default function Footer() {
  const globalResponse = useGlobalTinaContext();
  const { data } = useTina(globalResponse);
  const global = data.global as Global;
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
                  data-tina-field={tinaField(global, 'privacy_policy')}
                  className={linkClassNames}
                  target='_blank'
                  href={global?.privacy_policy ?? '#'}
                >
                  Privacy
                </Link>
                <Link
                  data-tina-field={tinaField(global, 'cookie_policy')}
                  className={linkClassNames}
                  target='_blank'
                  href={global?.cookie_policy ?? '#'}
                >
                  Cookie Policy
                </Link>
              </div>
              <div className='grid grid-rows-4 grid-flow-col gap-y-2 gap-x-10'>
                {global?.links?.map((link, i) => (
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
                data-tina-field={tinaField(global.social)}
                social={global?.social!}
              ></Social>
            }

            {global?.contact_info && (
              <div
                className='mt-4'
                data-tina-field={tinaField(global.contact_info)}
              >
                {global?.contact_info?.address && (
                  <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      color='black'
                      size='lg'
                    />
                    <p className='text-gray-500 text-sm ml-3'>
                      {global?.contact_info?.address}
                    </p>
                  </div>
                )}
                {global?.contact_info?.phone && (
                  <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
                    <FontAwesomeIcon icon={faPhone} color='black' size='lg' />
                    <p className='text-gray-500 text-sm ml-3'>
                      {global?.contact_info?.phone}
                    </p>
                  </div>
                )}
                {global?.contact_info?.email && (
                  <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      color='black'
                      size='lg'
                    />
                    <Link
                      target='_blank'
                      href={'mailto:' + global?.contact_info?.email}
                      className='ml-3 text-sm block text-gray-500 hover:text-gray-700 hover:underline transition duration-150 ease-in-out mr-2 rtl:mr-0 rtl:ml-2'
                    >
                      {global?.contact_info?.email}
                    </Link>
                  </div>
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
