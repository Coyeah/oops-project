/*
 * @Author: ye.chen
 * @Date: 2020-04-16 10:40:41
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-28 15:44:25
 */
import React, { useContext } from 'react';
import { Layout } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import styles from './index.less';
import { Link } from 'react-router-dom';
import Center from '../Center';

import logo from '@/assets/layouts/logo.png';
import BasicMenu from './BasicMenu';
import history from '@/utils/history';
import { basicContext } from '@/layouts/BasicLayout';
import { getFirstRoute } from '@/utils/authorized';

const textColor = (theme: string) => (theme !== 'dark' ? 'rgba(0,0,0,0.65)' : '#fff');

export type BasicSiderProps = {
  handleCollapse?: (collapse?: boolean) => void;
  openKeys?: string[];
  onOpenChange?: Function;
} & SiderProps;

const BasicSider: React.FC<BasicSiderProps> = (props) => {
  const {
    theme = 'dark',
    width = 240,
    collapsed,
    handleCollapse,
    openKeys,
    onOpenChange,
    ...siderProps
  } = props;

  const {
    location: { pathname },
  } = history;
  const { routesEnds, routesTree, Authorized } = useContext(basicContext);

  return (
    <Layout.Sider
      trigger={null}
      breakpoint="lg"
      onBreakpoint={handleCollapse}
      collapsible
      collapsed={collapsed}
      className={styles.layout}
      theme={theme}
      width={width}
      {...siderProps}
    >
      <Link to={getFirstRoute(routesEnds)}>
        <Center className={styles.logo} justifyContent="flex-start">
          <img src={logo} alt="logo" />
          <span style={{ color: textColor(theme) }}>{INITIAL_SITE_INFO.title}</span>
        </Center>
      </Link>
      <div className={styles.content}>
        <BasicMenu
          authorized={Authorized}
          routes={routesTree}
          theme={theme}
          openKeys={openKeys}
          onOpenChange={onOpenChange as any}
          selectedKeys={[pathname]}
        />
      </div>
    </Layout.Sider>
  );
};

export default BasicSider;
