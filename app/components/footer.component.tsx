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
import Container from './container.component';

export default function Footer() {
  const globalResponse = useGlobalTinaContext();
  const { data } = useTina(globalResponse);
  const global = data.global as Global;
  const linkClassNames = 'block text-text-footer hover:underline text-sm';
  return (
    <footer className='relative border-t border-gray-200 not-prose bg-footer text-text-footer'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 pt-4'>
          <div className='mb-2 md:mb-4'>
            <Link className='font-bold text-xl' href='/'>
              {CONFIG.APP_NAME}
            </Link>
            <div className='grid grid-rows-4 grid-flow-col gap-y-2 gap-x-5gap-x-10 mt-4'>
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
                className={linkClassNames + ' md:row-span-3'}
                target='_blank'
                href={global?.cookie_policy ?? '#'}
              >
                Cookie Policy
              </Link>
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
          <div className='flex flex-col justify-start items-start md:items-end'>
            {global?.contact_info && (
              <div
                className='mt-4'
                data-tina-field={tinaField(global.contact_info)}
              >
                {global?.contact_info?.address && (
                  <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      color='var(--color-text-footer)'
                      size='lg'
                    />
                    <p className=' text-sm ml-3'>
                      {global?.contact_info?.address}
                    </p>
                  </div>
                )}
                {global?.contact_info?.phone && (
                  <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
                    <FontAwesomeIcon
                      icon={faPhone}
                      color='var(--color-text-footer)'
                      size='lg'
                    />
                    <p className=' text-sm ml-3'>
                      {global?.contact_info?.phone}
                    </p>
                  </div>
                )}
                {global?.contact_info?.email && (
                  <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      color='var(--color-text-footer)'
                      size='lg'
                    />
                    <Link
                      target='_blank'
                      href={'mailto:' + global?.contact_info?.email}
                      className='ml-3 text-sm block  hover:underline transition duration-150 ease-in-out mr-2 rtl:mr-0 rtl:ml-2'
                    >
                      {global?.contact_info?.email}
                    </Link>
                  </div>
                )}
                {
                  <Social
                    data-tina-field={tinaField(global.social)}
                    social={global?.social!}
                  ></Social>
                }
              </div>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}

const Social = ({ social }: { social: GlobalSocial }) => {
  const linkClassNames =
    'focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm inline-flex items-center mr-3 mb-4';
  return (
    <div>
      <Link
        data-tina-field={tinaField(social, 'facebook')}
        className={linkClassNames}
        href={social?.facebook ?? '#'}
        target='_blank'
      >
        <FontAwesomeIcon
          icon={faFacebook}
          color='var(--color-text-footer)'
          size='xl'
        />
      </Link>
      <Link
        data-tina-field={tinaField(social, 'instagram')}
        className={linkClassNames}
        href={social?.instagram ?? '#'}
        target='_blank'
      >
        <FontAwesomeIcon
          icon={faInstagram}
          color='var(--color-text-footer)'
          size='xl'
        />
      </Link>
    </div>
  );
};
