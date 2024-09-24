import { CONFIG } from '@/app/config/config';
import client from '@/tina/__generated__/client';
import {
  Global,
  PageBlocksContactInfo,
  PageBlocksGridGrid_ColumnsBlocksContactInfo
} from '@/tina/__generated__/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';

export default function ContactInfoBlock({
  data
}: {
  data: PageBlocksContactInfo | PageBlocksGridGrid_ColumnsBlocksContactInfo;
}) {
  const [global, setGlobal] = useState<Global>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const global = await client.queries.global({
          relativePath: 'global.mdx'
        });
        setGlobal(global.data.global as Global);
      } catch (error: any) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <></>;

  return (
    <div data-tina-field={tinaField(data)}>
      <span className='font-bold text-xl'>{CONFIG.APP_NAME}</span>
      {global?.contact_info && (
        <div className='mt-4' data-tina-field={tinaField(global.contact_info)}>
          {global?.contact_info?.address && (
            <p className='text-gray-500'>{global?.contact_info?.address}</p>
          )}
          {global?.contact_info?.phone && (
            <p className='text-gray-500'>{global?.contact_info?.phone}</p>
          )}
          {global?.contact_info?.email && (
            <Link
              target='_blank'
              href={'mailto:' + global?.contact_info?.email}
              className='block text-gray-500 hover:text-gray-700 hover:underline transition duration-150 ease-in-out mr-2 rtl:mr-0 rtl:ml-2 text-sm mb-2'
            >
              {global?.contact_info?.email}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
