import { CONFIG } from '@/app/config/config';
import { useGlobalTinaContext } from '@/app/providers/global-tina.providers';
import {
  Global,
  PageBlocksContactInfo,
  PageBlocksGridGrid_ColumnsBlocksContactInfo
} from '@/tina/__generated__/types';
import {
  faEnvelope,
  faLocationDot,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { tinaField, useTina } from 'tinacms/dist/react';

export default function ContactInfoBlock({
  data
}: {
  data: PageBlocksContactInfo | PageBlocksGridGrid_ColumnsBlocksContactInfo;
}) {
  const globalResponse = useGlobalTinaContext();
  const { data: globalData } = useTina(globalResponse);
  const global = globalData.global as Global;
  return (
    <div data-tina-field={tinaField(data)}>
      <div className='font-bold text-xl mb-6'>{CONFIG.APP_NAME}</div>
      {global?.contact_info && (
        <div data-tina-field={tinaField(global.contact_info)}>
          {global?.contact_info?.address && (
            <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
              <FontAwesomeIcon icon={faLocationDot} color='black' size='xl' />
              <p className='text-gray-500 ml-4'>
                {global?.contact_info?.address}
              </p>
            </div>
          )}
          {global?.contact_info?.phone && (
            <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
              <FontAwesomeIcon icon={faPhone} color='black' size='xl' />
              <p className='text-gray-500 ml-4'>
                {global?.contact_info?.phone}
              </p>
            </div>
          )}
          {global?.contact_info?.email && (
            <div className='grid grid-flow-col auto-cols-max items-center mb-4'>
              <FontAwesomeIcon icon={faEnvelope} color='black' size='xl' />
              <Link
                target='_blank'
                href={'mailto:' + global?.contact_info?.email}
                className='ml-4 block text-gray-500 hover:text-gray-700 hover:underline transition duration-150 ease-in-out mr-2 rtl:mr-0 rtl:ml-2'
              >
                {global?.contact_info?.email}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
