import { format, eachHourOfInterval } from 'date-fns';

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
const DATE_FORMAT = 'yyyy-MM-dd';

export function formatToDateTime(date: Date, formatStr = DATE_TIME_FORMAT): string {
  return format(date, formatStr);
}

export function formatToDate(date: Date, formatStr = DATE_FORMAT): string {
  return format(date, formatStr);
}
const intervalLength = 4;

export function getInterval(start: number, end: number) {
  const startAt = new Date(start);
  const endAt = new Date(end);
  return eachHourOfInterval({ start: startAt, end: endAt }).reduce((acc, time, index) => {
    if (index % (24 / intervalLength) === 0) {
      acc.push(format(time, 'yyyy-MM-dd HH:mm:ss'));
    }
    return acc;
  }, []);
}
