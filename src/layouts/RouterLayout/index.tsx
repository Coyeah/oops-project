/*
 * @Author: ye.chen
 * @Date: 2020-04-15 18:25:13
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-26 10:54:40
 */
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Route, Redirect, Switch, RouteProps } from 'react-router-dom';
import { RouteItem } from 'config/router.config';
import { History } from 'history';
import history from '@/utils/history';
import { AuthorizedRouteProps } from '@/components/function/Authorized/AuthorizedRoute';

export type RouterType = {
  router: RouteItem;
  history: History;
};

export interface RouterLayoutProps {
  routes?: RouteItem[];
  routeComponent?: React.ComponentType;
}

function routeRender<T = AnyObject>(
  routeItem: RouteItem,
  RouteComponent: React.ComponentType<T | RouteProps | AnyObject>,
) {
  const { path, key = path, exact, component, authority, redirect, routes = void 0 } = routeItem;
  if (!component && !routes && !redirect) return null;
  const restProps: RouterType = {
    router: routeItem,
    history,
  };
  let Component: React.ComponentType<RouterType> = (props) => <>{props.children}</>;
  if (!!component) Component = component;
  else if (redirect) Component = () => <Redirect to={redirect} />;

  return (
    <RouteComponent
      key={key}
      path={path}
      exact={!!exact}
      authority={authority}
      render={() => (
        <Component {...restProps}>{!!routes && <RouterLayout routes={routes} />}</Component>
      )}
    />
  );
}

export default function RouterLayout(props: RouterLayoutProps) {
  const { routes, routeComponent: RouteComponent = Route } = props;

  if (!routes) return null;

  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        {routes.map((item) => routeRender<AuthorizedRouteProps>(item, RouteComponent))}
      </Switch>
    </Suspense>
  );
}
