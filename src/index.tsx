import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './App.less';

moment.locale('zh-cn');

// if (MOCK_ENV === 'local') {
//   require('../mock/index');
// }

const App: React.FC = () => {
  return (
    <div className="app">Hello World!</div>
  )
}

render(<App />, document.getElementById('root'));
