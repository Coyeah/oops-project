import React, {
  PropsWithChildren,
  Suspense,
  createElement,
  ComponentType,
} from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { Spin } from 'antd';
import { RouteItemType } from 'config/routes.config';
import history from '@/utils/history';
import BlankLayout from '@/common/BlankLayout';
import {
  match as matchFunction,
  pathToRegexp,
  compile,
} from 'path-to-regexp';

interface RouterLayoutProps {
  routes?: RouteItemType[];
}

export interface MatchType {
  params: object;
  path: string;
}

class Match {
  params: object = {};
  path: string = '';

  constructor() {}

  set(m: Partial<MatchType>) {
    this.params = m.params || this.params;
    this.path = m.path || this.path;
  }
}

type RouterMatchType = MatchType | false;

export const match = new Match();

export default function RouterLayout(
  props: PropsWithChildren<RouterLayoutProps>,
) {
  const { routes = [] } = props;

  return (
    <Suspense fallback={<Spin />}>
      <Router history={history}>
        <Switch>{routes.map((item) => routeRender(item))}</Switch>
      </Router>
    </Suspense>
  );
}

function withLayout(
  Layout: ComponentType<any>,
  initialProps: object = {},
) {
  return (Component: ComponentType<any>): React.FC => ({
    children,
    ...restProps
  }) => (
    <Layout {...initialProps}>
      {React.createElement(Component, restProps, children)}
    </Layout>
  );
}

function routeRender(routeItem: RouteItemType) {
  const {
    path,
    exact,
    key = `${path}?exact={${!!exact}`,
    component,
    redirect,
    layouts = [],
    routes,
    initialProps = {},
  } = routeItem;
  if (!component && !routes && !redirect) return null;
  const {
    location: { pathname },
  } = history;

  let _match: RouterMatchType = false;
  if (typeof path === 'string' && pathToRegexp(path).test(pathname)) {
    const ownMatch = matchFunction(path)(pathname);
    const params = ownMatch ? ownMatch.params || {} : {};
    _match = { params, path };
    match.set(_match);
  }

  const restProps: RouterType = {
    ...initialProps,
    history,
    router: routeItem,
    match: _match,
  };
  let Component: ComponentType<RouterType> = component || BlankLayout;
  if (exact && redirect) {
    Component = () => <Redirect to={compile(redirect)({})} />;
  }

  for (let i = 0; i < layouts.length; i++) {
    const item = layouts[i];
    if (Array.isArray(item)) {
      Component = withLayout(item[0], {
        ...item[1],
        ...restProps,
        _layout_key: i,
      })(Component);
    } else {
      Component = withLayout(item, {
        ...restProps,
        _layout_key: i,
      })(Component);
    }
  }

  return (
    <Route
      key={key}
      exact={exact}
      path={path}
      render={() =>
        createElement(
          Component,
          restProps,
          !!routes && <RouterLayout routes={routes} />,
        )
      }
    />
  );
}

export interface RouterType extends AnyObject {
  router: RouteItemType;
  history: typeof history;
}
