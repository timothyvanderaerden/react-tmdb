import React from 'react';
import Store from '../store';
import PopularMovieComponent from './popularMovieComponent';
import PopularShowComponent from './popularShowComponent';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


export default class PopularComponent extends React.Component {
    componentWillMount() {
        this.state = {popularMovies: null, popularShows: null, appBarTitle: "Popular", slideIndex: 0};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});
    }

    handleChange(value) {
        this.setState({slideIndex: value});
    }

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange.bind(this)}
                    value={this.state.slideIndex}
                >
                    <Tab label="Movies" value={0}/>
                    <Tab label="TV Shows" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange.bind(this)}
                >
                    <PopularMovieComponent/>
                    <PopularShowComponent/>
                </SwipeableViews>
            </div>
        )
    }
}