import { useEffect } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { getCookie } from './cookie';
import { RouteItem } from 'config/router.config';
import { flattenTree } from '@/utils/helper';
import check from '@/components/function/Authorized/CheckPermissions';
import history from './history';

const globalCheck = check;

// get ticket from cookie
export function getTicket() {
  return getCookie('ticket') || '';
}

export function pathnameToList(pathname: string) {
  const list = pathname.split('/').filter((str: string) => str);
  return list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`);
}

export function getFirstRoute(routes: RouteItem[]) {
  if (routes.length === 0) return '/home';
  const firstRoute = routes[0];
  if (firstRoute && firstRoute.path) {
    return firstRoute.path;
  } else {
    return '/home';
  }
}

type CheckType = CheckFunc | boolean;
type CheckFunc = typeof check;
export interface RoutesFilterOptions {
  isMenu?: boolean;
  isExact?: boolean;
  check?: CheckType;
}

export function routesFilter(routes: RouteItem[], opts?: RoutesFilterOptions) {
  let { isMenu, check, isExact } = opts || {};
  if (isMenu) {
    routes = routes.filter((item) => item.name && !item.hideInMenu);
  }
  if (!!check) {
    check = globalCheck;
    routes = routes
      .map((item) => (!!item.authority ? (check as CheckFunc)(item.authority, item, '') : item))
      .filter((item) => !!item) as RouteItem[];
  }
  if (isExact) {
    routes = routes.filter((item) => item.exact) as RouteItem[];
  }

  return routes;
}

export function getFlatRoutes(routes: RouteItem[], opts?: RoutesFilterOptions): RouteItem[] {
  let list = routesFilter(flattenTree(routes) as RouteItem[], opts);
  let map = getRoutesMap(list);
  return Object.keys(map).map((key) => map[key]);
}

export function getRoutesMap(routes: RouteItem[]) {
  let map = {};
  for (let i = 0, len = routes.length; i < len; i++) {
    const item = routes[i];
    if (!item.path) continue;
    map[item.path] = {
      ...(map[item.path] || {}),
      ...item,
    };
  }
  return map;
}

export function getCurrentRoute(
  routes: RouteItem[] | { [name: string]: RouteItem },
  pathname: string,
) {
  let target: RouteItem | null = null;
  for (let i = 0, len = routes.length; i < len; i++) {
    const { path } = routes[i];
    if (typeof path !== 'string') continue;
    if (path === pathname || pathToRegexp(path).test(pathname)) {
      target = routes[i];
      break;
    }
  }
  return target;
}
