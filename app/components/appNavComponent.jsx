/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import PopularIcon from 'material-ui/svg-icons/action/stars';

export default class appNavComponent extends React.Component  {

    constructor(props){
        super(props);
        injectTapEventPlugin(); //onTouchTap
        this.state = {open:false};
    }

    componentWillMount() {
        this.state = {appBarTitle: null};
        Store.subscribe(() => {
            this.setState({appBarTitle: Store.getState().appBarTitle});
        });
    }

    handleToggle() { this.setState({open: !this.state.open}); }
    handleClose() { this.setState({open: false}); }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.open}>
                    <MenuItem onTouchTap={this.handleClose.bind(this)} leftIcon={<PopularIcon/>} containerElement={<Link to={'/popular'}></Link>} primaryText={"Popular"}></MenuItem>
                </Drawer>

                <AppBar   title={this.state.appBarTitle}
                          onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
            </div>
        );
    }
}