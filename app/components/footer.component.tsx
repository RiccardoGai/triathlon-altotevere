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
    <footer className="relative bg-footer text-text-footer">
      {/* Top accent gradient */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />

      <Container>
        <div className="py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link className="inline-block group" href="/">
                <span className="font-extrabold text-2xl text-white tracking-tight">
                  TRIATHLON <span className="text-primary-light">ALTOTEVERE</span>
                </span>
              </Link>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
                Promuoviamo il triathlon per tutti, qualunque sia l&apos;età, la capacità, l&apos;esperienza.
              </p>

              {/* Social icons */}
              <Social social={global?.social!} />
            </div>

            {/* Quick links */}
            <div className="lg:col-span-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Link rapidi</h3>
              <div className="grid grid-cols-2 gap-4">
                {global?.links?.map((link, i) => (
                  <div key={i}>
                    <Link
                      data-tina-field={tinaField(link!)}
                      className="text-gray-400 hover:text-secondary transition-colors duration-200 text-sm font-medium"
                      href={parseSystemInfoToHref(link?.href?._sys)}
                    >
                      {link?.text}
                    </Link>
                    {link?.links && link.links.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {link.links.map((sublink, j) => (
                          <li key={j}>
                            <Link
                              className="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm"
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

            {/* Contact info */}
            <div className="lg:col-span-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contattaci</h3>
              {global?.contact_info && (
                <div data-tina-field={tinaField(global.contact_info)} className="space-y-4">
                  {global?.contact_info?.address && (
                    <ContactItem
                      icon={faLocationDot}
                      text={global.contact_info.address}
                      link={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(global.contact_info.address)}`}
                    />
                  )}
                  {global?.contact_info?.phone && (
                    <ContactItem icon={faPhone} text={global.contact_info.phone} link={`tel:${global.contact_info.phone}`} />
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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {CONFIG.APP_NAME}. Tutti i diritti riservati.
            </p>
            <div className="flex items-center gap-6">
              <Link
                data-tina-field={tinaField(global, 'privacy_policy')}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm"
                target="_blank"
                href={global?.privacy_policy ?? '#'}
              >
                Privacy Policy
              </Link>
              <Link
                data-tina-field={tinaField(global, 'cookie_policy')}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm"
                target="_blank"
                href={global?.cookie_policy ?? '#'}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const ContactItem = ({ icon, text, link }: { icon: any; text: string; link?: string }) => {
  const isExternal = link?.startsWith('http');
  return (
    <div className="flex items-center gap-4 group">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
        <FontAwesomeIcon
          icon={icon}
          className="text-gray-400 group-hover:text-white transition-colors duration-200"
        />
      </div>
      {link ? (
        <Link
          href={link}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-sm text-gray-400 hover:text-white transition-colors duration-200 pt-2.5"
        >
          {text}
        </Link>
      ) : (
        <p className="text-sm text-gray-400">{text}</p>
      )}
    </div>
  );
};

const Social = ({ social }: { social: GlobalSocial }) => (
  <div className="mt-8 flex gap-3">
    {social?.facebook && (
      <SocialIcon href={social.facebook} icon={faFacebook} hoverColor="hover:bg-[#1877f2]" />
    )}
    {social?.instagram && (
      <SocialIcon
        href={social.instagram}
        icon={faInstagram}
        hoverColor="hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500"
      />
    )}
  </div>
);

const SocialIcon = ({ href, icon, hoverColor }: { href: string; icon: any; hoverColor: string }) => (
  <Link
    href={href}
    target="_blank"
    className={`w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${hoverColor}`}
  >
    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
  </Link>
);
