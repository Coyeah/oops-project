import React, { ComponentType, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { match, pathToRegexp, compile } from 'path-to-regexp';
import { Spin } from 'antd';
import matchTarget, { MatchType } from './match';
import BlankLayout from '../BlankLayout';
import { RouteItemType } from 'config/routes.config';
import history from '@/utils/history';

export interface RouterLayoutProps {
  routes?: Array<RouteItemType>;
}

const withLayout = (
  Layout: ComponentType<any>,
  initialProps: object = {}
) => (Component: ComponentType<any>): React.FC => ({
                                                     children,
                                                     ...restProps
                                                   }) => (
  <Layout {...initialProps}>
    {React.createElement(Component, restProps, children)}
  </Layout>
);

const Index: React.FC<RouterLayoutProps> = props => {
  const {routes = []} = props;
  return (
    <Suspense fallback={<Spin/>}>
      <Switch>
        {/* eslint-disable-next-line no-use-before-define */}
        {routes.map(item => routeRender(item))}
      </Switch>
    </Suspense>
  );
};

export default Index;

export interface RouterType extends AnyObject {
  router: RouteItemType;
  history: typeof history;
}

type RouterMatchType =
  | MatchType
  | false;

function routeRender(routeItem: RouteItemType) {
  const {
    path,
    key = path,
    exact,
    component,
    redirect,
    layouts = [],
    routes,
    initialProps = {},
  } = routeItem;
  if (!component && !routes && !redirect) return null;
  const {location: {pathname}} = history;

  let _match: RouterMatchType = false;
  if (typeof path === 'string' && pathToRegexp(path).test(pathname)) {
    const ownMatch = match(path)(pathname);
    const params = ownMatch ? ownMatch.params || {} : {};
    _match = { params, path };
    matchTarget.set(_match);
  }

  const restProps: RouterType = {
    history,
    router: routeItem,
    match: _match,
    ...initialProps,
  };
  let Component: ComponentType<RouterType> = component || BlankLayout;
  if (exact && redirect) {
    Component = () => (
      <Redirect to={compile(redirect)({})}/>
    );
  }

  for (let i = 0; i < layouts.length; i++) {
    const item = layouts[i];
    if (Array.isArray(item)) {
      Component = withLayout(
        item[0],
        {...item[1], ...restProps}
      )(Component);
    } else {
      Component = withLayout(item, restProps)(Component);
    }
  }

  return (
    <Route
        exact={exact}
        key={key}
        path={path}
        render={() => React.createElement(Component, restProps, !!routes && <Index routes={routes}/>)}
    />
  );
}
