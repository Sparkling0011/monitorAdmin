import { renderIcon } from '@/utils';
import { DocumentOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'resource';
const routes: RouteRecordRaw[] = [
  {
    path: '/resource',
    name: routeName,
    redirect: '/resource',
    component: Layout,
    meta: {
      title: '资源',
      icon: renderIcon(DocumentOutline),
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 2,
    },
    children: [
      {
        path: 'overview',
        name: `${routeName}_overview`,
        meta: {
          title: '资源总览',
          // permissions: ['dashboard_console'],
        },
        component: () => import('@/views/resource/index.vue'),
      },
    ],
  },
];

export default routes;
