import client from '@/tina/__generated__/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IubendaProvider } from '@mep-agency/next-iubenda';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
    <html lang='it'>
      <body
        className={`${font.className} antialiased text-default bg-page tracking-tight flex flex-col`}
      >
        <IubendaProvider bannerConfig={CONFIG.IUBENDA}>
          <Header props={global}></Header>
          <main className='flex flex-col w-full h-full'>{children}</main>
          <Footer props={global}></Footer>
          <Analytics />
          <SpeedInsights />
        </IubendaProvider>
      </body>
    </html>
  );
}
