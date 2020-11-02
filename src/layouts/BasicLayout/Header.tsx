import React, { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import styles from './index.less';

export default function Header(
  props: PropsWithChildren<HeaderProps>,
) {
  const { collapsed = false, handleCollapsed } = props;

  return (
    <Layout.Header className={styles.header}>
      <div
        className={styles['header-collapsed']}
        onClick={() => handleCollapsed && handleCollapsed(!collapsed)}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        )}
      </div>
    </Layout.Header>
  );
}

export interface HeaderProps {
  collapsed?: boolean;
  handleCollapsed?: (collapsed: boolean) => void;
}
