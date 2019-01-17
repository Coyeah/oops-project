// import "@babel/polyfill";
if (module.hot) module.hot.accept();

import React from 'react';
import {render} from 'react-dom';
import styles from './index.less';

class App extends React.Component {
  render() {
    return (
      <div id={styles.layout}>Hello! I'm Friday.</div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
