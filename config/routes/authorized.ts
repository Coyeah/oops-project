import { lazy } from 'react';
import { RouteItem } from 'config/router.config';

export default {
  path: '/authorized',
  component: require('@/layouts/UserLayout').default,
  routes: [
    { path: '/authorized', redirect: '/authorized/login' },
    { path: '/authorized/login', component: lazy(() => import('@/pages/authorized/login')) },
  ],
} as RouteItem;
