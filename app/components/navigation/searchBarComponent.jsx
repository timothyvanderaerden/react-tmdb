import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { searchActions } from '../../actions';
import { searchMulti, searchPerson } from '../../api/Search';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import { white, cyan500 } from 'material-ui/styles/colors';

class searchBarComponent extends Component {
    constructor(props) {
        super(props);

        this.styles = {
            appBar: {
                backgroundColor: white
            },
            textField: {
                marginTop: 8
            }
        };
    }

    handleSearch = (event) => {
        if (event.target.value && event.target.value.replace(/\s/g, '').length) {
            Promise.all([
                searchMulti(event.target.value),
                searchPerson(event.target.value)
            ]).then((data) => {
                let [ multi, person ] = data;
                this.props.actions.setSearchResults(multi);
                this.props.actions.setSearchPeople(person);
            });
        } else {
            this.props.actions.setSearchResults(null);
            this.props.actions.setSearchPeople(null);
        }
    };

    render() {
        const { iconElementLeft, onLeftIconButtonTouchTap } = this.props;
        return (
            <AppBar
                title={<TextField
                    hintText="Search..."
                    style={this.styles.textField}
                    fullWidth={true}
                    underlineShow={false}
                    onChange={this.handleSearch}
                    autoFocus
                />}
                style={this.styles.appBar}
                iconElementLeft={iconElementLeft}
                onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
                iconElementRight={<IconButton><SearchIcon color={cyan500}/></IconButton>}
            />
        );
    }
}

searchBarComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  iconElementLeft: PropTypes.object,
  onLeftIconButtonTouchTap: PropTypes.object
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(searchBarComponent);
