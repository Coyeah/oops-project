/*
 * @Author: ye.chen
 * @Date: 2020-04-02 17:48:03
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-27 18:23:04
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Helmet } from 'react-helmet';
import { Provider, observer } from 'mobx-react';
import stores from '@/stores';

const ProviderLayout: React.FC = observer((props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider {...stores}>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        {props.children}
      </Provider>
    </ConfigProvider>
  );
});

export default ProviderLayout;
