import React, { Suspense, lazy } from 'react';
import RenderAuthorized from '@/components/Authorized';
import { Route, Redirect, Switch } from 'react-router-dom';

export interface RouteItem {
  name?: string;    // 菜单页面名称
  icon?: string;    // 菜单 Icon
  path: string;     // 页面路径
  auth?: boolean | string;  // 权限校验，布尔值使用 path 作为权限 code，传入 string 则以其作为权限 code 
  loader?: LazyComponent;
  component?: React.ComponentType
  routes?: RouteItem[];
}

type LazyComponent = () => Promise<{ default: React.ComponentType<any>; }>;

export const routeConfig = [
  {
    name: '首页',
    icon: 'home',
    path: '/home',
    loader: () => import('@/pages/home'),
  }, {
    name: '密码生成',
    icon: 'lock',
    path: '/password',
    loader: () => import('@/pages/password'),
  }, {
    name: '持久化1',
    icon: 'appstore',
    path: '/endurance/1',
    loader: () => import ('@/pages/endurance/page1')
  }, {
    name: '持久化2',
    icon: 'appstore',
    path: '/endurance/2',
    loader: () => import ('@/pages/endurance/page2')
  }, {
    name: '测试悬停',
    icon: 'border',
    path: '/suspense',
    loader: () => import('@/pages/suspense'),
  }, {
    name: '测试',
    icon: 'border',
    path: '/test',
    loader: () => import('@/pages/test'),
  }, {
    path: '/403',
    loader: () => import('@/pages/exception/E403')
  }, {
    path: '/404',
    loader: () => import('@/pages/exception/E404')
  }
];

export interface RouteComponentProps {
  route: RouteItem;
}

const routesRender: (route: RouteItem) => React.ReactNode | null = (routeItem) => {
  const {path, component, loader, auth, routes = []} = routeItem;
  let comp: React.ComponentType | null = null;
  if (loader) {
    comp = lazy((loader as LazyComponent));
  } else if (component) {
    comp = component;
  }
  if (comp === null) return null;
  const Component = comp as React.ComponentType<RouteComponentProps>;
  const listRoutes = routes.map(routesRender);
  if (!auth) {
    listRoutes.unshift(
      <Route
        exact
        key={path}
        path={path}
        render={() => <Component route={routeItem} />}
      />
    )
  } else {
    listRoutes.unshift(
      <AuthorizedRoute
        exact
        key={path}
        authority={path}
        path={path}
        render={() => <Component route={routeItem} />}
        redirectPath="/403"
      />
    );
  }
  return listRoutes;
}

// let Authorized = RenderAuthorized(routeConfig.filter((route, index: number) => {
//   return index !== 4
// }).map(route => route.path));
let Authorized = RenderAuthorized([]);
const { AuthorizedRoute } = Authorized;

const routeRender = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route
          exact
          path="/"
          key="default"
          render={() => <Redirect to="/home" />}
        />
        {routeConfig.map(routesRender)}
      </Switch>
    </Suspense>
  )
}


export default routeRender;