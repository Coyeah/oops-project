if (process.env.NODE_ENV === 'development' && ENV_MOCK) {
  // require('../mock/example.js');
}

import React from 'react';
import {render} from 'react-dom';
import styles from './index.module.less';

class App extends React.Component {
  render() {
    return (
      <div id={styles.layout}>
        <h1>Oops! I am late.</h1>
        <div className={styles.logo} />
        <p>Coding in <span>./src/index.js</span>.</p>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
