import { RouteItem } from 'config/router.config';
import { lazy } from 'react';

export default {
  path: '/',
  component: require('@/layouts/BasicLayout').default,
  routes: [
    {
      name: '首页',
      path: '/home',
      icon: 'HomeOutlined',
      component: lazy(() => import('@/pages/home')),
    },
    {
      name: '圣女果',
      path: '/test/1',
      icon: 'LikeOutlined',
      authority: ['101'],
      routes: [
        {
          name: '香瓜',
          path: '/test/1/1',
          component: lazy(() => import('@/pages/test')),
          authority: ['101001'],
        },
        {
          name: '西瓜',
          path: '/test/1/2',
          component: lazy(() => import('@/pages/test')),
          authority: ['101002'],
        },
      ],
    },
    {
      name: '水蜜桃',
      path: '/test/2',
      icon: 'LikeOutlined',
      authority: ['102'],
      routes: [
        {
          name: '香蕉',
          path: '/test/2/1',
          component: lazy(() => import('@/pages/test')),
          authority: ['102001'],
        },
        {
          name: '苹果',
          path: '/test/2/2',
          component: lazy(() => import('@/pages/test')),
          authority: ['102002'],
        },
      ],
    },
    {
      name: '辣椒',
      path: '/test/3',
      icon: 'LikeOutlined',
      authority: ['103'],
      component: lazy(() => import('@/pages/test')),
    },
  ],
} as RouteItem;
