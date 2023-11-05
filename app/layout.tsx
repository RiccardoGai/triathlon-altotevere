import client from '@/tina/__generated__/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from './components/header.component';
import './styles/index.scss';
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
  const global = await client.queries.global({
    relativePath: 'global.json'
  });

  return (
    <html lang='en'>
      <body className={font.className}>
        <Header props={global}></Header>
        <div className='main'>{children}</div>
      </body>
    </html>
  );
}
