// single-ts

if (process.env.NODE_ENV === 'development' && ENV_MOCK) {
  // require('../mock/example.js');
}

import React from 'react';
import {render} from 'react-dom';
import './index.less';

import Example from './Example';

class App extends React.Component {
  render() {
    return (
      <div id='oops-layout'>
        <h1>Oops! I am late. <Example /></h1>
        <div className='oops-logo' />
        <p>Happy Coding at <span>./src/index.tsx</span>.</p>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
