'use client';
import {
  GlobalFooter,
  GlobalFooterSocial,
  GlobalQuery,
  GlobalQueryVariables
} from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { tinaField, useTina } from 'tinacms/dist/react';
import { CONFIG } from '../config/config';
import { ITinaResponse } from '../models/tina-response.interface';
import { parsePageToHref } from '../utils/utils';

export default function Footer({
  props
}: {
  props: ITinaResponse<GlobalQuery, GlobalQueryVariables>;
}) {
  const data = useTina(props);
  const footerData = data.data.global.footer as GlobalFooter;

  return (
    <footer className='relative border-t border-gray-200 not-prose'>
      <div
        className='absolute inset-0 pointer-events-none'
        aria-hidden='true'
      ></div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='grid grid-cols-2 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12'>
          <div>
            <div className='mb-2'>
              <Link className='inline-block font-bold text-xl' href='/'>
                {CONFIG.APP_NAME}
              </Link>
            </div>
            <div
              className='text-sm text-muted'
              data-tina-field={tinaField(footerData, 'secondary_links')}
            >
              {footerData?.secondary_links?.map((link, i) => (
                <Link
                  data-tina-field={tinaField(link!)}
                  key={i}
                  className='block mb-2 text-muted hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out mr-2 rtl:mr-0 rtl:ml-2'
                  href={parsePageToHref(link?.href)}
                >
                  {link?.text}
                </Link>
              ))}
            </div>
          </div>
          <div className='flex justify-end'>
            <ul className='flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0 rtl:ml-0 rtl:-mr-2 rtl:md:ml-0 rtl:md:mr-4'>
              {<Social social={footerData?.social!}></Social>}
            </ul>
            <div className='text-sm mr-4 dark:text-muted'></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Social = ({ social }: { social: GlobalFooterSocial }) => {
  const linkClassNames =
    'text-muted hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 inline-flex items-center';
  return (
    <>
      <li>
        <Link
          data-tina-field={tinaField(social, 'facebook')}
          className={linkClassNames}
          href={social?.facebook ?? '#'}
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className='w-5 h-5'
            style={{ fontSize: 20, color: 'black' }}
          />
        </Link>
      </li>
      <li>
        <Link
          data-tina-field={tinaField(social, 'instagram')}
          className={linkClassNames}
          href={social?.instagram ?? '#'}
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className='w-5 h-5'
            style={{ fontSize: 20, color: 'black' }}
          />
        </Link>
      </li>
    </>
  );
};
