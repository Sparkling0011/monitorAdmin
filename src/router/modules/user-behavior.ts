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
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 4,
    },
    children: [
      {
        path: 'js-error',
        name: `${routeName}_js-error`,
        meta: {
          title: '用户行为',
          // permissions: ['dashboard_console'],
        },
        component: () => import('@/views/project/list/list.vue'),
      },
    ],
  },
];

export default routes;
