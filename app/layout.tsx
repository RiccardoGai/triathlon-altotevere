import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from './components/header.component';
import './styles/index.scss';

// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';

import client from '@/tina/__generated__/client';
import { config } from '@fortawesome/fontawesome-svg-core';
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

const font = Poppins({
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
  const headerData = (await client.queries.globalConnection()).data
    .globalConnection.edges?.[0]?.node?.header;

  return (
    <html lang='en'>
      <body className={font.className}>
        <Header data={headerData as any}></Header>
        <div className='main'>{children}</div>
      </body>
    </html>
  );
}
