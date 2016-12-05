import React from 'react';
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
                height: 56
            }
        }
    }

    render() {
        const {iconElementLeft, onLeftIconButtonTouchTap} = this.props;
        return (
                <AppBar
                    title={<TextField
                        hintText="Search..."
                        style={this.styles.textField}
                        fullWidth={true}
                        underlineShow={false}
                    />}
                    style={this.styles.appBar}
                    iconElementLeft={iconElementLeft}
                    onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
                    iconElementRight={<IconButton><SearchIcon color={cyan500}/></IconButton>}
                />
        );
    }
}