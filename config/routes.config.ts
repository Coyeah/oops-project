import { ComponentType, lazy } from 'react';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { AuthorityType } from '@/components/function/Authorized/CheckPermissions';

export interface RouteItemType {
  key?: string; // 不存在默认使用 path
  path?: string;
  exact?: boolean;
  name?: string;
  icon?: string;
  redirect?: string; // 重定向
  authority?: Array<AuthorityType>; // 权限
  routes?: Array<RouteItemType>;
  hideInMenu?: boolean; // 不上菜单栏
  hideChildrenInMenu?: boolean; // 子路由不上菜单栏
  hideInBreadcrumb?: boolean; // 不上面包屑
  query?: object; // 默认路由问号传参
  defaultLayouts?: Array<ComponentType<unknown> | [ComponentType<unknown>, object]>;
  layouts?: Array<ComponentType<unknown> | [ComponentType<unknown>, object]>;
  component?: ComponentType<any>;
  initialProps?: object; // 初始化 props
  // =========== 经过 routesFormat 处理后存在的属性，会被覆盖 =========== //
  children?: Array<RouteItemType>;
  locale?: string;
}

function _routesFormat(
  routes: Array<RouteItemType>,
  parentAuthority?: Array<AuthorityType>,
  parentName?: string,
  parentDefaultLayouts?: RouteItemType['layouts']
): Array<RouteItemType> {
  return routes.map(routeItem => {
    const {routes} = routeItem;

    let locale: string = 'local';
    const name = routeItem.name ? '.' + routeItem.name : '';
    if (parentName) {
      locale = `${parentName}${name}`;
    } else {
      locale = `${locale}${name}`;
    }

    if (routes) {
      routeItem.routes = _routesFormat(
        [
          ...routes,
          {
            key: `${routeItem.path}/404`,
            component: lazy(() => import('@/pages/exception/404'))
          }
        ],
        routeItem.authority,
        locale
      );
    }

    let result: RouteItemType = {
      exact: !routes,
      ...routeItem,
      name: routeItem.name,
      children: routeItem.routes,
      locale,
      authority: routeItem.authority || parentAuthority,
      defaultLayouts: routeItem.defaultLayouts || parentDefaultLayouts,
    }

    if (
      result.exact &&
      !result.layouts &&
      result.defaultLayouts
    ) {
      result.layouts = result.defaultLayouts;
    }

    return result;
  });
}

export const routesFormat = memoizeOne(_routesFormat, isEqual);

const routesConfig: Array<RouteItemType> = [{
  path: '/',
  component: lazy(() => import('@/layouts/ProviderLayout'))
}];

export default routesFormat(routesConfig);
