import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import history from '@/utils/history';
import BasicLayout from './layout/BasicLayout';
import routeRender from './router';



const App: React.FC = () => {

  return (
    <Provider>
      <Router history={history}>
        <BasicLayout>
          {routeRender()}
        </BasicLayout>
      </Router>
    </Provider>
  )
};

export default App;