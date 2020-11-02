import React, { PropsWithChildren } from 'react';
import { Layout, Menu as AntdMenu } from 'antd';
import * as IconV4 from '@ant-design/icons';
import websiteConfig from 'config/website.config';
import styles from './index.less';
import logo from '@/assets/carbon.png';
import { RouteItemType } from 'config/routes.config';

export default function Sider(props: PropsWithChildren<SiderProps>) {
  const { collapsed = false, routes = [] } = props;

  return (
    <Layout.Sider
      className={styles.sider}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className={styles['sider-header']}>
        <div
          className={styles['sider-header-icon']}
          style={{ backgroundImage: `url('${logo}')` }}
        />
        <div>{websiteConfig.title}</div>
      </div>
      <Menu routes={routes} />
    </Layout.Sider>
  );
}

function Menu(props: PropsWithChildren<{ routes: RouteItemType[] }>) {
  const { routes } = props;
  return (
    <AntdMenu theme="dark" mode="inline">
      {routes.map((item) => {
        const { path, name, icon = 'LinkOutlined', routes } = item;
        if (!path || !name) return null;
        const Icon = IconV4[icon];

        if (Array.isArray(routes)) {
          return (
            <AntdMenu.SubMenu key={path} icon={<Icon />} title={name}>
              {routes.map(renderMenuItem)}
            </AntdMenu.SubMenu>
          );
        } else {
          return renderMenuItem(item);
        }
      })}
    </AntdMenu>
  );
}

function renderMenuItem(item: RouteItemType) {
  const { path, name, icon } = item;
  if (!path || !name) return null;
  const Icon = icon ? IconV4[icon] : () => null;
  return (
    <AntdMenu.Item key={path} icon={<Icon />}>
      {name}
    </AntdMenu.Item>
  );
}

export interface SiderProps {
  collapsed?: boolean;
  routes?: RouteItemType[];
}
