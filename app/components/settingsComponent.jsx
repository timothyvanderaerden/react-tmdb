/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import Toggle from 'material-ui/Toggle';

export default class SettingsComponent extends React.Component {
    componentWillMount() {
        this.state = { muiTheme: null, toggled: null };
        this.unsubscribe = Store.subscribe(() => {
            this.setState({ muiTheme: Store.getState().muiTheme });
        });

        if (this.state.muiTheme == 'lightBaseTheme') {
            this.setState({ toggled: false });
        }
    }

    handleToggle() {
        this.setState({ toggled: !this.state.toggled });

        if (this.state.toggled) {
            Store.dispatch({type: 'change_theme', data: 'darkBaseTheme'});
        } else {
            Store.dispatch({type: 'change_theme', data: 'lightBaseTheme'});
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div>
                <Toggle
                    label="Dark theme"
                    onToggle={this.handleToggle.bind(this)}
                />
            </div>
        )
    }
}