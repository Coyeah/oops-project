import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './App.less';

// if (MOCK_ENV === 'local') {
//   require('../mock/index');
// }

moment.locale('zh-cn');

const App: React.FC = () => (
  <div className="app">Hello World!</div>
);

render(<App />, document.getElementById('root'));
