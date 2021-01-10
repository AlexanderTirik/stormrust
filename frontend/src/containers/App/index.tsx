import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Routing from '../Routing';
import { history } from '../../common/helpers/historyHelper';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Routing />
      </>
    </ConnectedRouter>
  </Provider>
);

export default App;
