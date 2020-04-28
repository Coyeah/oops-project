import { RouteItem } from 'config/router.config';
import { lazy } from 'react';

export default {
  path: '/',
  component: require('@/layouts/BasicLayout').default,
  routes: [
    {
      path: '/',
      component: lazy(() => import('@/pages/blank')),
    },
  ],
} as RouteItem;
