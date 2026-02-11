'use client';
import { Global, GlobalLinksLinks } from '@/tina/__generated__/types';
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
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

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
    setOpenDropdown(null);
  };

  const onDropdownToggle = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      {/* Accent stripe - brand energy element */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />

      <div className="relative text-default py-3 px-4 md:px-8 mx-auto w-full md:flex md:justify-between md:items-center max-w-7xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group" onClick={onNavClick}>
            {global.logo ? (
              <>
                <Image
                  data-tina-field={tinaField(global, 'logo')}
                  src={global.logo}
                  width={80}
                  height={80}
                  alt={CONFIG.APP_NAME}
                  loading="eager"
                  className="hidden md:block"
                />
                <Image
                  data-tina-field={tinaField(global, 'logo')}
                  src={global.logo}
                  width={56}
                  height={56}
                  alt={CONFIG.APP_NAME}
                  loading="eager"
                  className="md:hidden"
                />
              </>
            ) : (
              <span
                data-tina-field={tinaField(global, 'logo')}
                className="font-extrabold text-xl tracking-tight"
              >
                TRIATHLON <span className="text-secondary">ALTOTEVERE</span>
              </span>
            )}
          </Link>
          <div className="flex items-center md:hidden">
            <ToggleMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>

        <nav
          className={`items-center w-full md:w-auto ${
            menuOpen ? 'block mt-4 pb-4 border-t border-gray-100 pt-4' : 'hidden'
          } md:flex md:mt-0 md:pb-0 md:border-0 md:pt-0 text-default overflow-y-auto overflow-x-hidden md:overflow-visible`}
        >
          <ul
            className="flex flex-col md:flex-row md:self-center md:items-center w-full md:w-auto gap-1 md:gap-0"
            data-tina-field={tinaField(global, 'links')}
          >
            {global.links?.map((link, index) => (
              <li key={index} className={`relative ${link?.links?.length ? 'nav-dropdown' : ''}`}>
                {link?.links?.length ? (
                  <>
                    <button
                      className="text-default text-left hover:text-primary cursor-pointer px-4 py-2.5 flex items-center text-sm font-semibold uppercase tracking-wide w-full md:w-auto transition-colors duration-200"
                      data-tina-field={tinaField(link!)}
                      onClick={() => onDropdownToggle(index)}
                    >
                      {link.text}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`nav-dropdown-icon w-3 h-3 ml-1.5 transition-transform duration-200 ${
                          openDropdown === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <ul
                      className={`nav-dropdown-menu pl-4 md:pl-0 md:absolute md:top-full md:left-0 md:bg-white md:min-w-[220px] md:shadow-xl md:rounded-lg md:border md:border-gray-100 md:py-2 md:z-50 ${
                        openDropdown === index ? 'max-md:block' : 'max-md:hidden'
                      }`}
                    >
                      {link?.links?.map((subLink, subIndex) => (
                        <li key={`${index}_${subIndex}`}>
                          {(subLink as GlobalLinksLinks)?.links?.length ? (
                            <>
                              <span className="block py-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-400 mt-2 border-t border-gray-100 pt-3">
                                {subLink?.text}
                              </span>
                              <ul className="pl-2 md:pl-0">
                                {(subLink as GlobalLinksLinks)?.links?.map((subSubLink, subSubIndex) => (
                                  <li key={`${index}_${subIndex}_${subSubIndex}`}>
                                    <Link
                                      onClick={onNavClick}
                                      className={`block py-2.5 px-4 text-sm font-medium transition-all duration-200 ${
                                        parseSystemInfoToHref(subSubLink?.href?._sys) === currentPath
                                          ? 'text-primary'
                                          : 'text-gray-600 hover:text-primary'
                                      }`}
                                      href={parseSystemInfoToHref(subSubLink?.href?._sys)}
                                    >
                                      {subSubLink?.text}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link
                              data-tina-field={tinaField(subLink!)}
                              onClick={onNavClick}
                              className={`block py-2.5 px-4 text-sm font-medium transition-all duration-200 ${
                                parseSystemInfoToHref(subLink?.href?._sys) === currentPath
                                  ? 'text-primary'
                                  : 'text-gray-600 hover:text-primary'
                              }`}
                              href={parseSystemInfoToHref(subLink?.href?._sys)}
                            >
                              {subLink?.text}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    data-tina-field={tinaField(link!)}
                    onClick={onNavClick}
                    className={`relative px-4 py-2.5 flex items-center text-sm font-semibold uppercase tracking-wide transition-colors duration-200 text-center ${
                      parseSystemInfoToHref(link?.href?._sys) === currentPath
                        ? 'text-primary'
                        : 'text-default hover:text-primary'
                    }`}
                    href={parseSystemInfoToHref(link?.href?._sys)}
                  >
                    {link?.text}
                    {parseSystemInfoToHref(link?.href?._sys) === currentPath && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-light rounded-full hidden md:block" />
                    )}
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

function ToggleMenu({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onToggleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <button
      className={`relative flex flex-col h-10 w-10 rounded-lg justify-center items-center cursor-pointer transition-all duration-300 ${
        menuOpen ? 'bg-primary' : 'bg-gray-100 hover:bg-gray-200'
      }`}
      aria-label="Toggle Menu"
      onClick={onToggleMenuClick}
    >
      <span className="sr-only">Toggle Menu</span>
      <span
        aria-hidden="true"
        className={`h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${
          menuOpen ? 'rotate-45 translate-y-1.5 bg-white' : 'bg-gray-700'
        }`}
      />
      <span
        aria-hidden="true"
        className={`h-0.5 w-5 my-1 rounded-full transition-all duration-200 ${
          menuOpen ? 'opacity-0 bg-white' : 'opacity-100 bg-gray-700'
        }`}
      />
      <span
        aria-hidden="true"
        className={`h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${
          menuOpen ? '-rotate-45 -translate-y-1.5 bg-white' : 'bg-gray-700'
        }`}
      />
    </button>
  );
}
