/*
 * @Author: ye.chen
 * @Date: 2020-04-15 15:06:10
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-27 11:06:11
 */
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import routerConfig from 'config/router.config';
import history from './utils/history';
import RouterLayout from './layouts/RouterLayout';
import '@/common/global.less';

if (MOCK_ENV === 'local') {
  require('../mock/index');
}

const App: React.FC = () => (
  <Router history={history}>
    <RouterLayout routes={routerConfig} />
  </Router>
);

render(<App />, document.getElementById('root'));
