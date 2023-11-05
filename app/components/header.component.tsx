'use client';
import {
  GlobalHeader,
  GlobalHeaderHeader_Links,
  GlobalHeaderSocial,
  GlobalQuery,
  GlobalQueryVariables
} from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { ITinaResponse } from '../models/tina-response.interface';
import ActiveLink from './active-link.component';

export default function Header({
  props
}: {
  props: ITinaResponse<GlobalQuery, GlobalQueryVariables>;
}) {
  const data = useTina(props);
  const headerData = data.data.global.header as GlobalHeader;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<{
    [key: string]: boolean;
  }>({});

  function onClickMenuMobile(link: GlobalHeaderHeader_Links): void {
    if (link?.sub_menu?.length) {
      setIsMenuMobileOpen({
        ...isMenuMobileOpen,
        [link.name]: !isMenuMobileOpen[link.name]
      });
    }
  }

  return (
    <>
      <nav className='header'>
        <div className='container mx-auto flex flex-row items-center'>
          <Link href='/' className='header__brand'>
            {headerData.logo ? (
              <Image
                data-tina-field={tinaField(headerData, 'logo')}
                src={headerData.logo}
                width={300}
                height={250}
                alt='Triathlon Altotevere'
                loading='eager'
              />
            ) : (
              'Triathlon Altotevere'
            )}
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
            <MenuLinks
              props={
                headerData.header_links as unknown as GlobalHeaderHeader_Links[]
              }
              isMobile={false}
              isMenuMobileOpen={isMenuMobileOpen}
              onClickMenuMobile={onClickMenuMobile}
            ></MenuLinks>
          </div>
          <div className='hidden md:flex md:ml-5 lg:ml-7 items-center'>
            {<Social props={headerData.social!}></Social>}
          </div>
        </div>
      </nav>
      <div
        className={`header__mobile-menu-container md:hidden gap-2 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 h-0'
        }`}
      >
        <MenuLinks
          props={
            headerData.header_links as unknown as GlobalHeaderHeader_Links[]
          }
          isMobile={true}
          isMenuMobileOpen={isMenuMobileOpen}
          onClickMenuMobile={onClickMenuMobile}
        ></MenuLinks>
        <div className='flex items-center mt-2 mb-6'>
          {<Social props={headerData.social!}></Social>}
        </div>
      </div>
    </>
  );
}

const MenuLinks = ({
  props,
  isMobile,
  isMenuMobileOpen,
  onClickMenuMobile
}: {
  props: GlobalHeaderHeader_Links[];
  isMobile: boolean;
  isMenuMobileOpen: { [key: string]: boolean };
  onClickMenuMobile: (link: GlobalHeaderHeader_Links) => void;
}) => {
  return (
    <>
      {props.map((link, index) => (
        <div
          key={index}
          className={`${
            isMobile ? 'flex flex-col items-center' : 'header__link__container'
          }`}
        >
          <ActiveLink
            data-tina-field={tinaField(link!)}
            className={`header__link ${
              isMobile && isMenuMobileOpen[link.name!] ? 'active' : ''
            }`}
            href={link?.href ?? '#'}
            onClick={() => (isMobile ? onClickMenuMobile(link!) : null)}
          >
            {link?.name}
          </ActiveLink>
          {link?.sub_menu?.length && (
            <div
              className={`${
                isMobile
                  ? `header__mobile__link__sub-menu ${
                      isMenuMobileOpen[link.name]
                        ? 'opacity-100'
                        : 'opacity-0 h-0'
                    }`
                  : 'header__link__sub-menu gap-4'
              }`}
            >
              {link?.sub_menu?.map((subMenu, index) => (
                <ActiveLink
                  data-tina-field={tinaField(subMenu!)}
                  key={index}
                  className='header__link'
                  href={subMenu?.href ?? '#'}
                >
                  {subMenu?.name}
                </ActiveLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const Social = ({ props }: { props: GlobalHeaderSocial }) => {
  return (
    <>
      <Link
        href={props?.facebook ?? '#'}
        className='mr-4'
        data-tina-field={tinaField(props, 'facebook')}
      >
        <FontAwesomeIcon
          icon={faFacebook}
          style={{ fontSize: 20, color: 'white' }}
        />
      </Link>
      <Link
        href={props?.instagram ?? '#'}
        data-tina-field={tinaField(props, 'instagram')}
      >
        <FontAwesomeIcon
          icon={faInstagram}
          style={{ fontSize: 20, color: 'white' }}
        />
      </Link>
    </>
  );
};
