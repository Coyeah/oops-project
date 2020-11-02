import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import RouterLayout from '@/common/RouterLayout';
import 'moment/locale/zh-cn';
import './App.less';

moment.locale('zh-cn');

import routes from 'config/routes.config';

// if (MOCK_ENV === 'local') {
//   require('../mock/index');
// }

const App: React.FC = () => {
  return <RouterLayout routes={routes} />;
};

render(<App />, document.getElementById('root'));
