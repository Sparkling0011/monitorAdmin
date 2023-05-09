import { formatToDate } from '@/utils/dateUtil';

export const columns = [
  {
    title: '资源类型',
    key: 'errorName',
    width: 100,
    align: 'center',
  },
  {
    title: 'URL',
    key: 'url',
    width: 100,
    align: 'center',
  },
  {
    title: '加载错误次数',
    key: 'count',
    width: 100,
    align: 'center',
  },
  {
    title: '时间',
    key: 'log_at',
    width: 100,
    align: 'center',
    render: (record) => formatToDate(new Date(record.log_at)),
  },
];
