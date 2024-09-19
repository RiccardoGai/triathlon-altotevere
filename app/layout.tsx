import client from '@/tina/__generated__/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  IubendaCookieSolutionBannerConfigInterface,
  IubendaProvider
} from '@mep-agency/next-iubenda';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/footer.component';
import Header from './components/header.component';
import { CONFIG } from './config/config';
import './styles/index.scss';

config.autoAddCss = false;

const font = Inter({
  weight: ['400', '500', '600', '700'],
  style: 'normal',
  subsets: ['latin']
});

const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: CONFIG.IUBENDA.SITE_ID,
  cookiePolicyId: CONFIG.IUBENDA.COOKIE_POLICY_ID,
  lang: CONFIG.IUBENDA.LANG
};

export const metadata: Metadata = {
  title: 'Triathlon Altotevere',
  description: 'Triathlon Altotevere'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const global = await client.queries.global({
    relativePath: 'global.mdx'
  });

  return (
    <html lang='it' className='2xl:text-[20px] motion-safe:scroll-smooth'>
      <body
        className={`${font.className} antialiased text-default bg-page tracking-tight`}
      >
        <IubendaProvider bannerConfig={iubendaBannerConfig}>
          <Header props={global}></Header>
          <div className='main'>{children}</div>
          <Footer props={global}></Footer>
        </IubendaProvider>
      </body>
      <GoogleAnalytics gaId={CONFIG.GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
