import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import history from '@/utils/history';


const App: React.FC = () => {

  return (
    <Provider>
      <Router history={history}>

      </Router>
    </Provider>
  )
};

export default App;