import React, { PropsWithChildren, useState } from 'react';
import { Layout } from 'antd';
import { RouterType } from '@/common/RouterLayout';
import Sider from './Sider';
import Header from './Header';
import styles from './index.less';

export default function Basic(props: PropsWithChildren<{}>) {
  const {
    router: { routes },
  } = props as RouterType;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.app}>
      <Sider collapsed={collapsed} routes={routes} />
      <Layout>
        <Header
          collapsed={collapsed}
          handleCollapsed={setCollapsed}
        />
        <Layout.Content>{props.children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
