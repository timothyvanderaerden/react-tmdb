import React from 'react';
import Store from '../../store';
import {searchMulti, searchPerson} from '../../api/Search';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import {pink400, white, cyan500} from 'material-ui/styles/colors';

export default class searchBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.styles = {
            underlineStyle: {
                borderColor: cyan500
            },
            underlineFocusStyle: {
                borderColor: pink400
            },
            appBar: {
                backgroundColor: white
            },
            textField: {
                marginTop: 8
            }
        }
    }

    handleSearch = (event) => {
        if (event.target.value) {
            searchMulti(event.target.value).then(result => {
                Store.dispatch({type: 'search', data: result});
            });
            searchPerson(event.target.value).then(result => {
                Store.dispatch({type: 'search_people', data: result});
            })
        }
    };

    render() {
        const {iconElementLeft, onLeftIconButtonTouchTap} = this.props;
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