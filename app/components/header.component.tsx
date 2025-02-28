'use client';
import { Global } from '@/tina/__generated__/types';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { CONFIG } from '../config/config';
import { useGlobalTinaContext } from '../providers/global-tina.providers';
import { parseSystemInfoToHref } from '../utils/utils';

export default function Header() {
  const globalResponse = useGlobalTinaContext();
  const { data } = useTina(globalResponse);
  const global = data.global as Global;
  const currentPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScreenSizeChange = () => {
      setMenuOpen(false);
    };

    const screenSizeListener = window.matchMedia('(max-width: 767px)');
    screenSizeListener.addEventListener('change', handleScreenSizeChange);

    return () => {
      screenSizeListener.removeEventListener('change', handleScreenSizeChange);
    };
  }, []);

  const onNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className='sticky top-0 z-40 flex-none mx-auto w-full border-b border-gray-50/0 transition-opacity ease-in-out bg-page shadow-lg'
    >
      <div className='relative text-default py-3 px-3 md:px-6 mx-auto w-full md:flex md:justify-between'>
        <div className='flex justify-between'>
          <Link href='/' className='flex items-center' onClick={onNavClick}>
            {global.logo ? (
              <>
                <Image
                  data-tina-field={tinaField(global, 'logo')}
                  src={global.logo}
                  width={70}
                  height={70}
                  alt={CONFIG.APP_NAME}
                  loading='eager'
                  className='w-full h-auto hidden md:block'
                />
                <Image
                  data-tina-field={tinaField(global, 'logo')}
                  src={global.logo}
                  width={50}
                  height={50}
                  alt={CONFIG.APP_NAME}
                  loading='eager'
                  className='w-full h-auto md:hidden'
                />
              </>
            ) : (
              <span
                data-tina-field={tinaField(global, 'logo')}
                className='font-bold text-lg'
              >
                LOGO
              </span>
            )}
          </Link>
          <div className='flex items-center md:hidden'>
            <ToggleMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>
        <nav
          className={`items-center w-full md:w-auto ${
            menuOpen ? 'block' : 'hidden'
          } md:flex text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5`}
        >
          <ul
            className='flex flex-col md:flex-row md:self-center w-full md:w-auto text-lg md:text-[0.9375rem] tracking-[0.01rem] font-medium'
            data-tina-field={tinaField(global, 'links')}
          >
            {global.links?.map((link, index) => (
              <li key={index}>
                {link?.links?.length ? (
                  <>
                    <div className="group">
                      <button
                        className="text-black hover:text-primary cursor-pointer px-4 py-3 flex items-center text-lg w-full md:w-auto"
                        data-tina-field={tinaField(link!)}
                      >
                        {link.text}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="w-3.5 h-3.5 ml-2 rtl:ml-0 rtl:mr-0.5 hidden md:inline"
                          style={{ fontSize: 20 }}
                        />
                      </button>

                      <ul className="md:backdrop-blur-md rounded-sm md:absolute pl-4 md:pl-0 block md:hidden md:group-hover:block font-medium md:bg-page/90 md:min-w-[200px] md:drop-shadow-xl bg-page md:border md:border-gray-200">
                        {link?.links?.map((subLink, subIndex) => (
                          <li key={`${index}_${subIndex}`}>
                            <Link
                              data-tina-field={tinaField(subLink!)}
                              onClick={onNavClick}
                              className={`first:rounded-t last:rounded-b hover:text-primary py-2 px-5 block whitespace-nowrap text-lg ${
                                parseSystemInfoToHref(subLink?.href?._sys) === currentPath
                                  ? 'text-primary'
                                  : ''
                              }`}
                              href={parseSystemInfoToHref(subLink?.href?._sys)}
                            >
                              {subLink?.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>

                ) : (
                  <Link
                    data-tina-field={tinaField(link!)}
                    onClick={onNavClick}
                    className={`hover:text-primary px-4 py-3 flex items-center text-lg ${
                      parseSystemInfoToHref(link?.href?._sys) === currentPath
                        ? 'text-primary'
                        : ''
                    }`}
                    href={parseSystemInfoToHref(link?.href?._sys)}
                  >
                    {link?.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function ToggleMenu({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const onToggleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <button
      className='flex flex-col h-12 w-12 rounded-sm justify-center items-center cursor-pointer group'
      aria-label='Toggle Menu'
      onClick={onToggleMenuClick}
    >
      <span className='sr-only'>Toggle Menu</span>
      <span
        aria-hidden='true'
        className={`h-0.5 w-6 my-1 rounded-full bg-black transition-transform duration-300 ease-in-out ${
          menuOpen ? 'rotate-45 translate-y-2.5' : ''
        }`}
      ></span>
      <span
        aria-hidden='true'
        className={`h-0.5 w-6 my-1 rounded-full bg-black transition-opacity duration-200 ${
          menuOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        aria-hidden='true'
        className={`h-0.5 w-6 my-1 rounded-full bg-black transition-transform duration-300 ease-in-out ${
          menuOpen ? '-rotate-45 -translate-y-2.5' : ''
        }`}
      ></span>
    </button>
  );
}

