import { format } from 'date-fns';

export function dateToTime(dateISO: string) {
  return format(new Date(dateISO), 'HH:mm:ss');
}
