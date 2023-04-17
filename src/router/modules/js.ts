import { renderIcon } from '@/utils';
import { LogoJavascript } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'overview';
const routes: RouteRecordRaw[] = [
  {
    path: '/js',
    name: routeName,
    redirect: '/error',
    component: Layout,
    meta: {
      title: 'js',
      icon: renderIcon(LogoJavascript),
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 1,
    },
    children: [
      {
        path: 'overview',
        name: `${routeName}_overview`,
        meta: {
          title: 'JS总览',
          // permissions: ['dashboard_console'],
        },
        component: () => import('@/views/js/index.vue'),
      },
    ],
  },
];

export default routes;
