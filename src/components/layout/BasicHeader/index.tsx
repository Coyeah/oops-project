/*
 * @Author: ye.chen
 * @Date: 2020-04-02 17:47:50
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-23 14:30:22
 */
import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Func from './functions';
import Center from '@/components/layout/Center';
import styles from './index.less';

const { Header } = Layout;

export type HandleCollapseFunc = (collapse?: boolean) => void;

export interface BasicHeaderProps {
  collapsed?: boolean;
  handleCollapse?: HandleCollapseFunc;
}

const BasicHeader: React.FC<BasicHeaderProps> = (props) => {
  const { collapsed, handleCollapse = () => {} } = props;

  return (
    <Header className={styles.layout}>
      <Center>
        <div className={styles.collapsed} onClick={() => handleCollapse(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className={styles.functions}>
          <Center>
            <Func />
          </Center>
        </div>
      </Center>
    </Header>
  );
};

export default BasicHeader;
