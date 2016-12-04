import React from 'react';
import Store from '../store';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link, useRouterHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import PopularIcon from 'material-ui/svg-icons/action/stars';
import TheatersIcon from 'material-ui/svg-icons/action/theaters'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import createHashHistory from 'history/lib/createHashHistory';
export const history = useRouterHistory(createHashHistory)({queryKey: false});

export default class appNavComponent extends React.Component {

    constructor(props) {
        super(props);
        injectTapEventPlugin(); //onTouchTap
        this.state = {open: false};
    }

    componentWillMount() {
        this.state = {appBarTitle: null, appBarBack: false};
        Store.subscribe(() => {
            this.setState({
                appBarTitle: Store.getState().appBarTitle,
                appBarBack: Store.getState().appBarBack
            });
        });
    }

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };
    handleClose = () => {
        this.setState({open: false})
    };
    handleBack = () => {
        Store.dispatch({type: 'appbar_navigationBack', data: false});
        history.goBack();
    };

    render() {
        const {open, appBarTitle, appBarBack} = this.state;
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
                        iconElementLeft={appBarBack ? <IconButton><BackIcon /></IconButton> : null}
                        onLeftIconButtonTouchTap={appBarBack ? () => {this.handleBack()} : this.handleToggle}
                />
            </div>
        );
    }
}