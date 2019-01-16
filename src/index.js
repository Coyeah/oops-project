// import "@babel/polyfill";
if (module.hot) module.hot.accept();

import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <h1>Hello! I'm Friday.</h1>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
