import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link, browserHistory } from 'react-router-dom';
import PopularIcon from 'material-ui/svg-icons/action/stars';
import TheatersIcon from 'material-ui/svg-icons/action/theaters';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SearchBar from './searchBarComponent';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { cyan500 } from 'material-ui/styles/colors';
import { appBarActions } from '../../actions';

class appNavComponent extends Component {
  constructor(props) {
      super(props);
      this.state = { open: false, searchBar: false };
  }

  componentWillMount() {
      this.state = { appBarTitle: null };
  }

  handleToggle = () => {
      this.setState({ open: !this.state.open });
  };

  handleClose = () => {
      this.setState({ open: false });
  };

  handleSearchToggle = () => {
      browserHistory.push('/search');
      this.setState({ searchBar: !this.state.searchBar });
  };

  handleSearchClose = () => {
      browserHistory.goBack();
      this.props.actions.setAppBarSearch(true);
  };

  render() {
    const { open } = this.state;
    const { appBarTitle, searchBar, appBarStyle } = this.props;

    return (
        <div>
            <Drawer
                docked={false}
                open={open}
                onRequestChange={(open) => this.setState({open})}
            >
                <MenuItem onTouchTap={this.handleClose} leftIcon={<PopularIcon/>}
                          containerElement={<Link to={'/popular'}/>} primaryText={"Popular"}/>
                <MenuItem onTouchTap={this.handleClose} leftIcon={<TheatersIcon/>}
                          containerElement={<Link to={'/upcoming'}/>} primaryText={"Now in theaters"}/>
            </Drawer>

            {!searchBar ?
                <AppBar title={appBarTitle}
                        onLeftIconButtonTouchTap={this.handleToggle}
                        iconElementRight={
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                        }
                        onRightIconButtonTouchTap={this.handleSearchToggle}
                        style={appBarStyle}
                />
                :
                <SearchBar iconElementLeft={<IconButton><BackIcon color={cyan500}/></IconButton>}
                           onLeftIconButtonTouchTap={this.handleSearchClose}
                />
            }
        </div>
    );
  }
}

appNavComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  appBarTitle: PropTypes.string,
  searchBar: PropTypes.bool,
  appBarStyle: PropTypes.string
};

function mapStateToProps(state) {
  return {
    appBarTitle: state.appBar.title,
    appBarStyle: state.appBar.Style,
    searchBar: state.searchBar
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(appNavComponent);
