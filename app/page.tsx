import { default as SlugPage } from './[slug]/page';

export default function Page() {
  return <SlugPage params={{ slug: 'home' }}></SlugPage>;
}
