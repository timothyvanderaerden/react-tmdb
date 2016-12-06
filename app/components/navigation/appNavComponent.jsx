import React from 'react';
import Store from '../../store';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import PopularIcon from 'material-ui/svg-icons/action/stars';
import TheatersIcon from 'material-ui/svg-icons/action/theaters';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SearchBar from './searchBarComponent';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import {cyan500} from 'material-ui/styles/colors';

export default class appNavComponent extends React.Component {

    constructor(props) {
        super(props);
        injectTapEventPlugin(); //onTouchTap
        this.state = {open: false, searchBar: false};
    }

    componentWillMount() {
        this.state = {appBarTitle: null};
        Store.subscribe(() => {
            this.setState({
                appBarTitle: Store.getState().appBarTitle
            });
        });
    }

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleSearchToggle = () => {
        browserHistory.push('/search');
        this.setState({searchBar: !this.state.searchBar})
    };

    handleSearchClose = () => {
        browserHistory.goBack();
        this.setState({searchBar: false})
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

                {!this.state.searchBar ?
                    <AppBar title={appBarTitle}
                            onLeftIconButtonTouchTap={this.handleToggle}
                            iconElementRight={
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            }
                            onRightIconButtonTouchTap={this.handleSearchToggle}
                    >
                    </AppBar> :
                    <SearchBar iconElementLeft={<IconButton><BackIcon color={cyan500}/></IconButton>}
                               onLeftIconButtonTouchTap={this.handleSearchClose}
                    />
                }
            </div>
        );
    }
}