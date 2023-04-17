import { renderIcon } from '@/utils';
import { SpeedometerSharp } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'perf';
const routes: RouteRecordRaw[] = [
  {
    path: '/perf',
    name: routeName,
    redirect: '/perf',
    component: Layout,
    meta: {
      title: '性能',
      icon: renderIcon(SpeedometerSharp),
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 4,
    },
    children: [
      {
        path: 'overview',
        name: `${routeName}_overview`,
        meta: {
          title: '性能总览',
          // permissions: ['dashboard_console'],
        },
        component: () => import('@/views/perf/index.vue'),
      },
    ],
  },
];

export default routes;
