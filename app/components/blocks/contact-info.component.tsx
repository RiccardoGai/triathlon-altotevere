import { CONFIG } from '@/app/config/config';
import { useGlobalTinaContext } from '@/app/providers/global-tina.providers';
import {
  Global,
  PageBlocksContactInfo,
  PageBlocksGridGrid_ColumnsBlocksContactInfo,
} from '@/tina/__generated__/types';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { tinaField, useTina } from 'tinacms/dist/react';

export default function ContactInfoBlock({
  data,
}: {
  data: PageBlocksContactInfo | PageBlocksGridGrid_ColumnsBlocksContactInfo;
}) {
  const globalResponse = useGlobalTinaContext();
  const { data: globalData } = useTina(globalResponse);
  const global = globalData.global as Global;

  return (
    <div data-tina-field={tinaField(data)} className="bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="text-2xl font-extrabold text-gray-900 mb-6">{CONFIG.APP_NAME}</div>
      {global?.contact_info && (
        <div data-tina-field={tinaField(global.contact_info)} className="space-y-4">
          {global?.contact_info?.address && (
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faLocationDot} className="text-blue-600 text-xl" />
              <p className="text-gray-700">{global?.contact_info?.address}</p>
            </div>
          )}
          {global?.contact_info?.phone && (
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600 text-xl" />
              <p className="text-gray-700">{global?.contact_info?.phone}</p>
            </div>
          )}
          {global?.contact_info?.email && (
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-xl" />
              <Link
                target="_blank"
                href={'mailto:' + global?.contact_info?.email}
                className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150"
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
