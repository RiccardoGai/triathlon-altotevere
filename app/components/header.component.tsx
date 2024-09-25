'use client';
import { Global } from '@/tina/__generated__/types';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { CONFIG } from '../config/config';
import { useGlobalTinaContext } from '../providers/global-tina.providers';
import { parseSystemInfoToHref } from '../utils/utils';

// TODO: refactor the components avoid using the global query

export default function Header() {
  const globalResponse = useGlobalTinaContext();
  const { data } = useTina(globalResponse);
  const global = data.global as Global;
  const currentPath = usePathname();
  useEffect(() => {
    const handleScreenSizeChange = () => {
      document
        .querySelector('[data-toggle-menu]')
        ?.classList.remove('expanded');
      document.body.classList.remove('overflow-hidden');
      document.getElementById('header')?.classList.remove('h-screen');
      document.getElementById('header')?.classList.remove('expanded');
      //document.getElementById('header')?.classList.remove('bg-page');
      document.querySelector('#header nav')?.classList.add('hidden');
      document
        .querySelector('#header > div > div:last-child')
        ?.classList.add('hidden');
    };

    const screenSizeListener = window.matchMedia('(max-width: 767px)');
    screenSizeListener.addEventListener('change', handleScreenSizeChange);

    return () => {
      screenSizeListener.removeEventListener('change', handleScreenSizeChange);
    };
  }, []);

  const onNavClick = () => {
    document.querySelector('[data-toggle-menu]')?.classList.remove('expanded');
    document.body.classList.remove('overflow-hidden');
    document.getElementById('header')?.classList.remove('h-screen');
    document.getElementById('header')?.classList.remove('expanded');
    // document.getElementById('header')?.classList.remove('bg-page');
    document.querySelector('#header nav')?.classList.add('hidden');
    document
      .querySelector('#header > div > div:last-child')
      ?.classList.add('hidden');
  };

  return (
    <header
      id='header'
      className='sticky top-0 z-40 flex-none mx-auto w-full border-b border-gray-50/0 transition-[opacity] ease-in-out bg-page shadow-lg'
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
            <ToggleMenu />
          </div>
        </div>
        <nav className='items-center w-full md:w-auto hidden md:flex text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5'>
          <ul
            className='flex flex-col md:flex-row md:self-center w-full md:w-auto text-lg md:text-[0.9375rem] tracking-[0.01rem] font-medium'
            data-tina-field={tinaField(global, 'links')}
          >
            {global.links?.map((link, index) => (
              <li key={index} className={link?.links?.length ? 'dropdown' : ''}>
                {link?.links?.length ? (
                  <>
                    <button
                      className='hover:text-link px-4 py-3 flex items-center'
                      data-tina-field={tinaField(link!)}
                    >
                      {link.text}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className='w-3.5 h-3.5 ml-2 rtl:ml-0 rtl:mr-0.5 hidden md:inline'
                        style={{ fontSize: 20, color: 'black' }}
                      />
                    </button>
                    <ul className='dropdown-menu md:backdrop-blur-md rounded md:absolute pl-4 md:pl-0 md:hidden font-medium md:bg-white/90 md:min-w-[200px] drop-shadow-xl'>
                      {link?.links?.map((subLink, subIndex) => (
                        <li key={index + '_' + subIndex}>
                          <Link
                            data-tina-field={tinaField(subLink!)}
                            onClick={onNavClick}
                            className={`first:rounded-t last:rounded-b md:hover:bg-gray-100 hover:text-link py-2 px-5 block whitespace-no-wrap text-lg ${
                              parseSystemInfoToHref(subLink?.href?._sys) ===
                              currentPath
                                ? 'link-active'
                                : ''
                            }`}
                            href={parseSystemInfoToHref(subLink?.href?._sys)}
                          >
                            {subLink?.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    data-tina-field={tinaField(link!)}
                    onClick={onNavClick}
                    className={`hover:text-primary px-4 py-3 flex items-centers text-lg ${
                      parseSystemInfoToHref(link?.href?._sys) === currentPath
                        ? 'link-active'
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

function ToggleMenu() {
  const onToggleMenuClick = () => {
    document.querySelector('[data-toggle-menu]')?.classList.toggle('expanded');
    document.body.classList.toggle('overflow-hidden');
    document.getElementById('header')?.classList.toggle('h-screen');
    document.getElementById('header')?.classList.toggle('expanded');
    // document.getElementById('header')?.classList.toggle('bg-page');
    document.querySelector('#header nav')?.classList.toggle('hidden');
    document
      .querySelector('#header > div > div:last-child')
      ?.classList.toggle('hidden');
  };

  return (
    <button
      className='flex flex-col h-12 w-12 rounded justify-center items-center cursor-pointer group'
      aria-label='Toggle Menu'
      onClick={onToggleMenuClick}
      data-toggle-menu
    >
      <span className='sr-only'>Toggle Menu</span>
      <slot>
        <span
          aria-hidden='true'
          className='h-0.5 w-6 my-1 rounded-full bg-black transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5'
        ></span>
        <span
          aria-hidden='true'
          className='h-0.5 w-6 my-1 rounded-full bg-black transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0'
        ></span>
        <span
          aria-hidden='true'
          className='h-0.5 w-6 my-1 rounded-full bg-black transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5'
        ></span>
      </slot>
    </button>
  );
}
