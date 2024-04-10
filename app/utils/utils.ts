import { Maybe, Page } from '@/tina/__generated__/types';

export function parsePageToHref(page?: Maybe<Page>) {
  return page?._sys?.filename?.toLowerCase() ?? '#';
}
