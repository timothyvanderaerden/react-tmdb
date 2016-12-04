import React from 'react';
import Store from '../store';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import PopularIcon from 'material-ui/svg-icons/action/stars';
import TheatersIcon from 'material-ui/svg-icons/action/theaters'

export default class appNavComponent extends React.Component {

    constructor(props) {
        super(props);
        injectTapEventPlugin(); //onTouchTap
        this.state = {open: false};
    }

    componentWillMount() {
        this.state = {appBarTitle: null};
        Store.subscribe(() => {
            this.setState({
                appBarTitle: Store.getState().appBarTitle,
            });
        });
    }

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const {open, appBarTitle} = this.state;
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

                <AppBar title={appBarTitle}
                        onLeftIconButtonTouchTap={this.handleToggle}
                >
                </AppBar>
            </div>
        );
    }
}