import { formatToDate } from '@/utils/dateUtil';
import { NTag } from 'naive-ui';
import { h } from 'vue';

export const columns = [
  {
    title: '请求地址',
    key: 'requestUrl',
    width: 150,
  },
  {
    title: '请求方法',
    key: 'method',
    width: 100,
    render: (row) => {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: 'info',
          bordered: false,
        },
        {
          default: () => row.method,
        }
      );
    },
  },
  {
    title: '状态信息',
    key: 'statusText',
    width: 100,
  },
  {
    title: '时间',
    key: 'log_at',
    width: 100,
    render: (record) => formatToDate(new Date(record.log_at)),
  },
];
