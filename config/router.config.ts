import { ComponentType } from 'react';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import authorized from './routes/authorized';
import basic from './routes/basic';

function routesFormat(
  routes: RouteItem[],
  parentAuthority?: string[],
  parentName?: string,
): RouteItem[] {
  return routes.map((routeItem) => {
    const { routes } = routeItem;

    let locale: string = 'local';
    if (parentName) {
      locale = `${parentName}.${routeItem.name}`;
    } else {
      locale = `${locale}.${routeItem.name}`;
    }

    if (routes) {
      routeItem.routes = routesFormat(
        [
          ...routes,
          {
            key: `${routeItem.path}/404`,
            component: require('@/pages/exception/404').default,
          },
        ],
        routeItem.authority,
        locale,
      );
    }

    return {
      exact: !routes,
      ...routeItem,
      name: routeItem.name,
      children: routeItem.routes,
      locale,
      authority: routeItem.authority || parentAuthority,
    };
  });
}

export const memoizeOneFormatter = memoizeOne(routesFormat, isEqual);

export interface RouteItem {
  key?: string | number;
  exact?: boolean;
  name?: string; // 名字存在则可上菜单栏
  icon?: string;
  path?: string;
  redirect?: string; // 重定向
  authority?: string[]; // 权限
  hideInMenu?: boolean; // 不上菜单栏
  hideChildrenInMenu?: boolean; // 子路由不上菜单栏
  routes?: RouteItem[];
  // query?: object; // 默认传参
  component?: ComponentType<any>;

  // =========== 经过 routesFormat 处理后存在的属性，会被覆盖 =========== //
  children?: RouteItem[];
  locale?: string;
}

const routesConfig: RouteItem[] = [
  {
    path: '/',
    component: require('@/layouts/ProviderLayout').default,
    routes: [authorized, basic],
  },
];

export default memoizeOneFormatter(routesConfig);
