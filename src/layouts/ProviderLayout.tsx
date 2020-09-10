import React from 'react';
import { ConfigProvider } from 'antd';
import { Helmet } from 'react-helmet';
import zhCN from 'antd/lib/locale/zh_CN';

import favicon from '@/assets/logo.png';

const ProviderLayout: React.FC = props => (
  <ConfigProvider locale={zhCN}>
    <Helmet>
      <meta charSet="utf-8" />
      <link href={favicon} rel="shortcut icon" />
    </Helmet>
    {props.children}
  </ConfigProvider>
)

export default ProviderLayout;
