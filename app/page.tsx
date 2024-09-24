import { default as SlugPage } from './[...slug]/page';
import { CONFIG } from './config/config';

export default function Page() {
  return <SlugPage params={{ slug: [CONFIG.HOME_PAGE] }}></SlugPage>;
}
