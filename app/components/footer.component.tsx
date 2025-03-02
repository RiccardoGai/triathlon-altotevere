'use client';
import { Global, GlobalSocial } from '@/tina/__generated__/types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
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

  return (
    <footer className="relative border-t border-gray-300 bg-footer text-text-footer py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-4">
          <div>
            <Link className="font-bold text-2xl text-white" href="/">
              {CONFIG.APP_NAME}
            </Link>
            <div className="flex md:flex-row flex-col gap-5 md:gap-24 mt-4">
              <div className="flex flex-col gap-5">
                <Link
                  data-tina-field={tinaField(global, 'privacy_policy')}
                  className="block text-sm text-gray-400 hover:text-white transition font-semibold"
                  target="_blank"
                  href={global?.privacy_policy ?? '#'}
                >
                  Privacy Policy
                </Link>

                <Link
                  data-tina-field={tinaField(global, 'cookie_policy')}
                  className="block text-sm text-gray-400 hover:text-white transition font-semibold md:row-span-3"
                  target="_blank"
                  href={global?.cookie_policy ?? '#'}
                >
                  Cookie Policy
                </Link>
              </div>

              <div className="flex flex-col flex-wrap md:max-h-36 gap-5">
                {global?.links?.map((link, i) => (
                  <div key={i}>
                    <Link
                      data-tina-field={tinaField(link!)}
                      className="block text-sm text-gray-400 hover:text-white transition font-semibold"
                      href={parseSystemInfoToHref(link?.href?._sys)}
                    >
                      {link?.text}
                    </Link>
                    {link?.links && link.links.length > 0 && (
                      <ul className="mt-1 space-y-1">
                        {link.links.map((sublink, j) => (
                          <li key={j}>
                            <Link
                              className="block text-xs text-gray-500 hover:text-gray-300 transition"
                              href={parseSystemInfoToHref(sublink?.href?._sys)}
                            >
                              {sublink?.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start md:items-end">
            {global?.contact_info && (
              <div data-tina-field={tinaField(global.contact_info)} className="mt-4 space-y-4">
                {global?.contact_info?.address && (
                  <ContactItem icon={faLocationDot} text={global.contact_info.address} />
                )}
                {global?.contact_info?.phone && (
                  <ContactItem icon={faPhone} text={global.contact_info.phone} />
                )}
                {global?.contact_info?.email && (
                  <ContactItem
                    icon={faEnvelope}
                    text={global.contact_info.email}
                    link={`mailto:${global.contact_info.email}`}
                  />
                )}
              </div>
            )}
            <Social social={global?.social!} />
          </div>
        </div>
      </Container>
    </footer>
  );
}

const ContactItem = ({ icon, text, link }: { icon: any; text: string; link?: string }) => (
  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition">
    <FontAwesomeIcon icon={icon} className="text-lg" />
    {link ? (
      <Link href={link} className="text-sm hover:underline">
        {text}
      </Link>
    ) : (
      <p className="text-sm">{text}</p>
    )}
  </div>
);

const Social = ({ social }: { social: GlobalSocial }) => (
  <div className="mt-6 flex space-x-4">
    {social?.facebook && <SocialIcon href={social.facebook} icon={faFacebook} />}
    {social?.instagram && <SocialIcon href={social.instagram} icon={faInstagram} />}
  </div>
);

const SocialIcon = ({ href, icon }: { href: string; icon: any }) => (
  <Link href={href} target="_blank" className="text-gray-400 hover:text-white transition text-xl">
    <FontAwesomeIcon icon={icon} />
  </Link>
);
