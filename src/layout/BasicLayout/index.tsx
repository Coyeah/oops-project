import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import history from '@/utils/history';
import GlobalSider from '../GlobalSider';
import styles from './index.module.less';

const { Content } = Layout;

const BasicLayout: React.FC = (props) => {
  const [, set] = useState(0);
  useEffect(() => {
    const unListen = history.listen(() => {
      set(num => num + 1);
    });
    return () => unListen();
  }, []);
  const { location: { pathname } } = history;
  return (
    <Layout className={styles.layout}>
      <GlobalSider pathname={pathname} />
      <Layout className={styles.main}>
        <Content className={styles.content}>
          {props.children}
        </Content>  
      </Layout>
    </Layout>
  )
};

export default BasicLayout;
