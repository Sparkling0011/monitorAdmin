import { renderIcon } from '@/utils';
import { LogoJavascript } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'overview';
const routes: RouteRecordRaw[] = [
  {
    path: '/JS',
    name: routeName,
    redirect: '/error',
    component: Layout,
    meta: {
      title: 'JS',
      icon: renderIcon(LogoJavascript),
      sort: 1,
    },
    children: [
      {
        path: 'overview',
        name: `${routeName}_overview`,
        meta: {
          title: 'JS总览',
        },
        component: () => import('@/views/js/index.vue'),
      },
    ],
  },
];

export default routes;
