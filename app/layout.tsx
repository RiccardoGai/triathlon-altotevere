import client from '@/tina/__generated__/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IubendaProvider } from '@mep-agency/next-iubenda';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Footer from './components/footer.component';
import Header from './components/header.component';
import { CONFIG } from './config/config';
import GlobalTinaProvider from './providers/global-tina.providers';
import './styles/index.scss';

config.autoAddCss = false;

const font = Poppins({
  weight: ['400', '500', '600', '700'],
  style: 'normal',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Triathlon Altotevere',
  description:
    'Triathlon Altotevere è una società che promuove il triathlon per tutti,qualunque sia l’età, la capacità, l’ esperienza. Insegna la disciplina diuno sport che richiede impegno, sacrificio e umiltà per portare ogni persona a migliorare se stessa in gara e fuori.',
  keywords:
    'triathlon, altotevere, sport, gara, competizione, nuoto, bici, corsa, allenamento, agonismo, amatoriale, divertimento, passione, sacrificio, impegno, umiltà, miglioramento, gara, competizione, agonismo, amatoriale, divertimento, passione, sacrificio, impegno, umiltà, miglioramento'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const globalResponse = await client.queries.global({
    relativePath: 'global.mdx'
  });
  return (
    <html lang='it'>
      <head>
        <meta
          name='google-site-verification'
          content='yQHdS31nK4yZ5sUdZam4iHF3VQ-hscbZ3fZzZe4AcDY'
        />
      </head>
      <body
        className={`${font.className} antialiased text-default bg-page tracking-tight flex flex-col`}
      >
        <IubendaProvider bannerConfig={CONFIG.IUBENDA}>
          <GlobalTinaProvider globalResponse={globalResponse}>
            <Header></Header>
            <main className='flex flex-col w-full h-full'>{children}</main>
            <Footer></Footer>
          </GlobalTinaProvider>
          <Analytics />
          <SpeedInsights />
        </IubendaProvider>
      </body>
    </html>
  );
}
