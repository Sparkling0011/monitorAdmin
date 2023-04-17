import { formatToDate } from '@/utils/dateUtil';
export const columns = [
  {
    title: '项目id',
    key: 'pid',
    width: 150,
  },
  {
    title: '项目名称',
    key: 'pname',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createAt',
    width: 100,
    render: (record) => formatToDate(new Date(record.createAt)),
  },
];
