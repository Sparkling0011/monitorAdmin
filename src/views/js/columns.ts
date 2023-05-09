import { formatToDate } from '@/utils/dateUtil';
export const columns = [
  {
    title: 'URL',
    key: 'url',
    width: 100,
  },
  {
    title: '描述',
    key: 'desc',
    width: 100,
  },
  {
    title: 'stack',
    key: 'stack',
    width: 100,
  },
  {
    title: '时间',
    key: 'log_at',
    width: 100,
    render: (record) => formatToDate(new Date(record.log_at)),
  },
];
