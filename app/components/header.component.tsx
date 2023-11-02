'use client';
import {
  GlobalHeader,
  GlobalHeaderHeader_Links
} from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header(props: { data: GlobalHeader }) {
  const pathname = usePathname();
  //  console.log(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuMobileOpen, setIsSubMenuMobileOpen] = useState<{
    [key: string]: boolean;
  }>({});

  function onClickMenuMobile(link: GlobalHeaderHeader_Links): void {
    if (link?.sub_menu?.length) {
      setIsSubMenuMobileOpen({
        ...isSubMenuMobileOpen,
        [link.name]: !isSubMenuMobileOpen[link.name]
      });
    }
  }

  return (
    <>
      <nav className='header'>
        <div className='container mx-auto flex flex-row items-center'>
          <Link href='/' className='header__brand'>
            Triathlon Altotevere
          </Link>
          <div className='md:hidden ml-auto flex align-center'>
            <FontAwesomeIcon
              className='mr-4 cursor-pointer'
              icon={faBars}
              style={{ fontSize: 25, color: 'white' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          <div className='hidden md:flex items-center flex-row ml-auto gap-4 md:gap-8 '>
            {props.data?.header_links?.map((link, index) => (
              <div key={index} className='header__link__container'>
                <Link className='header__link' href={link?.href ?? '#'}>
                  {link?.name}
                </Link>
                {link?.sub_menu?.length && (
                  <div className='header__link__sub-menu gap-4'>
                    {link?.sub_menu?.map((subMenu, index) => (
                      <Link
                        key={index}
                        className='header__link'
                        href={subMenu?.href ?? '#'}
                      >
                        {subMenu?.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='hidden md:flex md:ml-5 lg:ml-7 items-center'>
            <FontAwesomeIcon
              icon={faFacebook}
              className='mr-4 cursor-pointer'
              style={{ fontSize: 20, color: 'white' }}
            />
            <FontAwesomeIcon
              className='mr-4 cursor-pointer'
              icon={faInstagram}
              style={{ fontSize: 20, color: 'white' }}
            />
          </div>
        </div>
      </nav>
      <div
        className={`header__mobile-menu-container md:hidden gap-2 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 h-0'
        }`}
      >
        {props.data?.header_links?.map((link, index) => (
          <div key={index} className='flex flex-col items-center'>
            {link?.sub_menu?.length && (
              <a
                className={`header__link ${
                  isSubMenuMobileOpen[link!.name] ? 'active' : ''
                }`}
                onClick={() => onClickMenuMobile(link!)}
              >
                {link?.name}
              </a>
            )}
            {!link?.sub_menu?.length && (
              <Link
                className={'header__link'}
                href={''}
                onClick={() => onClickMenuMobile(link!)}
              >
                {link?.name}
              </Link>
            )}
            {link?.sub_menu?.length && (
              <div
                className={`header__mobile__link__sub-menu ${
                  isSubMenuMobileOpen[link.name]
                    ? 'opacity-100'
                    : 'opacity-0 h-0'
                }`}
              >
                {link?.sub_menu?.map((subMenu, index) => (
                  <Link
                    key={index}
                    className='header__link'
                    href={subMenu?.href ?? '#'}
                  >
                    {subMenu?.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className='flex items-center mt-2 mb-6'>
          <FontAwesomeIcon
            icon={faFacebook}
            className='mr-4 cursor-pointer'
            style={{ fontSize: 20, color: 'white' }}
          />
          <FontAwesomeIcon
            className='mr-4 cursor-pointer'
            icon={faInstagram}
            style={{ fontSize: 20, color: 'white' }}
          />
        </div>
      </div>
    </>
  );
}
