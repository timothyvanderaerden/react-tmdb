/* -- Core -- */
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* -- Additional -- */
import Root from './root';

/* -- Store -- */
const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./renderApplication', () => {
    const NewRoot = require('./renderApplication').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
