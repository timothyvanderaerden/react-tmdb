import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class BaseComponent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

BaseComponent.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withRouter(BaseComponent);
