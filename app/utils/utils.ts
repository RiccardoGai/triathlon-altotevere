import { SystemInfo } from '@/tina/__generated__/types';
import moment from 'moment';
import 'moment/locale/it';

export function parseSystemInfoToHref(systemInfo?: SystemInfo) {
  if (!systemInfo?.breadcrumbs) {
    return '#';
  }
  return '/' + systemInfo?.breadcrumbs?.join('/');
}

export const nameof = <T>(name: Extract<keyof T, string>): string => name;

export function formatDate(date: string | Date, format: string) {
  moment.locale('it');
  return moment(date).format(format);
}
