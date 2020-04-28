/*
 * @Author: ye.chen
 * @Date: 2020-04-15 16:56:47
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-28 15:35:04
 */
import React, { useState, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import context from './context';
import { RouterType } from '../RouterLayout';
import { PageHeaderLayoutWithContext } from '../PageHeaderLayout';
import BasicSider, { BasicSiderProps } from '@/components/layout/BasicSider';
import BasicHeader, { BasicHeaderProps, HandleCollapseFunc } from '@/components/layout/BasicHeader';
import { getFlatRoutes, getCurrentRoute, routesFilter, getFirstRoute } from '@/utils/authorized';
import styles from './index.less';
import { compose } from '@/utils';
import { inject, observer } from 'mobx-react';
import { AuthStoreProps } from '@/stores/AuthStore';
import RenderAuthorize from '@/components/function/Authorized';
import Exception403 from '@/pages/exception/403';
import { ResponseSchema } from '@/utils/request';

export const basicContext = context;

const { Provider } = context;
const getTraversePath = (pathname = '', withLast?: boolean): string[] => {
  if (!pathname) return [];
  let list = [],
    pathList = pathname.split('/');
  if (!withLast) pathList.pop();
  while (pathList.length !== 1) {
    list.push(pathList.join('/'));
    pathList.pop();
  }
  return list.filter((item) => item);
};

const Basic: React.FC = (props) => {
  const {
    router: { routes = [] },
    history,
  } = props as RouterType;
  const { authStore } = props as { authStore: AuthStoreProps };
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { pathname } = history.location;

  const setDefaultOpenKeys = () => {
    let path = collapsed ? '' : pathname;
    setOpenKeys([...new Set([...openKeys, ...getTraversePath(path)])]);
  };
  useEffect(() => {
    setDefaultOpenKeys();
  }, []);
  useEffect(() => {
    if (collapsed) {
      setOpenKeys([]);
    } else {
      setDefaultOpenKeys();
    }
  }, [collapsed, pathname]);

  const handleCollapsed = (collapsed: boolean) => {
    if (collapsed) {
      setOpenKeys([]);
    } else {
      setDefaultOpenKeys();
    }
    setCollapsed(collapsed);
  };

  // ============ authorized & route & routes ============ //
  useEffect(() => {
    authStore.login();
  }, []);
  const Authorized = RenderAuthorize(authStore.getInfomation().authority);
  const routesFlat = getFlatRoutes(routes);
  const routesEnds = routesFilter(routesFlat, { isExact: true, check: Authorized.check });
  const currentRoute = getCurrentRoute(routesFlat, pathname);
  useEffect(() => {
    if (authStore.isLogin && pathname === '/') {
      const targetPath = getFirstRoute(routesEnds);
      history.push(targetPath);
    }
  }, [authStore.isLogin, pathname]);
  // ============ authorized & route & routes ============ //

  // ============ props format ============ //

  const basicHeaderProps: BasicHeaderProps = {
    collapsed,
    handleCollapse: handleCollapsed as HandleCollapseFunc,
  };

  const basicSiderProps: BasicSiderProps = {
    collapsed,
    handleCollapse: setCollapsed as (collapse?: boolean) => void,
    openKeys,
    onOpenChange: setOpenKeys,
  };

  const providerValue = {
    routesTree: routes,
    routesEnds,
    routesFlat,
    Authorized,
    collapsed,
    setCollapsed,
  };

  // ============ props format ============ //

  return (
    <Provider value={providerValue}>
      <Spin spinning={authStore.loading} wrapperClassName={styles.spin}>
        <Layout className={styles['full-height']}>
          <BasicSider {...basicSiderProps} />
          <Layout className={styles.content}>
            <BasicHeader {...basicHeaderProps} />
            <Layout.Content>
              <PageHeaderLayoutWithContext>
                <Authorized authority={currentRoute?.authority} noMatch={<Exception403 />}>
                  {props.children}
                </Authorized>
              </PageHeaderLayoutWithContext>
            </Layout.Content>
          </Layout>
        </Layout>
      </Spin>
    </Provider>
  );
};

export default compose(inject('authStore'), observer)(Basic);
