import { renderIcon } from '@/utils';
import { GitPullRequestSharp } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routeName = 'request';
const routes: RouteRecordRaw[] = [
  {
    path: '/request',
    name: routeName,
    redirect: '/request',
    component: Layout,
    meta: {
      title: '请求',
      icon: renderIcon(GitPullRequestSharp),
      sort: 2,
    },
    children: [
      {
        path: 'overview',
        name: `${routeName}_overview`,
        meta: {
          title: '请求总览',
        },
        component: () => import('@/views/request/index.vue'),
      },
    ],
  },
];

export default routes;
