import { renderIcon } from '@/utils';
import { ProjectOutlined } from '@vicons/antd';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'behavior';
const routes: RouteRecordRaw[] = [
  {
    path: '/behavior',
    name: routeName,
    redirect: '/error',
    component: Layout,
    meta: {
      title: '用户行为',
      icon: renderIcon(ProjectOutlined),
      sort: 4,
    },
    children: [
      {
        path: 'js-error',
        name: `${routeName}_js-error`,
        meta: {
          title: '用户行为',
        },
        component: () => import('@/views/behavior/index.vue'),
      },
    ],
  },
];

export default routes;
