/* -- Core -- */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* -- Additional -- */
import App from './renderApplication';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;

    return (
      <MuiThemeProvider>
          <Provider store={store}>
            <App history={history} />
          </Provider>
      </MuiThemeProvider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
