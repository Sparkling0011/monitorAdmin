import { renderIcon } from '@/utils';
import { ProjectOutlined } from '@vicons/antd';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'project';
const routes: RouteRecordRaw[] = [
  {
    path: '/project',
    name: routeName,
    redirect: '/project/list',
    component: Layout,
    meta: {
      title: '项目管理',
      icon: renderIcon(ProjectOutlined),
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: '项目列表',
          // permissions: ['dashboard_console'],
        },
        component: () => import('@/views/project/list/list.vue'),
      },
    ],
  },
];

export default routes;
