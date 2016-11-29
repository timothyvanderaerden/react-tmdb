import React from 'react';
import Store from '../../store';
import {getPopularMovies} from '../../api/Discover';
import {getMovieGenres} from '../../api/Genres';
import {getPopularShows} from '../../api/Discover';
import {getTVGenres} from '../../api/Genres';
import PopularMovieComponent from '../movie/movieCardsComponent';
import PopularShowComponent from '../tv/tvShowCardsComponent';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

export default class PopularComponent extends React.Component {
    componentWillMount() {
        this.state = {popularMovies: null, popularShows: null, appBarTitle: "Popular", slideIndex: 0, load: false};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});
        Store.dispatch({type: 'loading_state', data: this.state.loaded});

        this.getMovieData();

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                popularMovies: Store.getState().popularMovies,
                movieGenres: Store.getState().movieGenres,
                popularShows: Store.getState().popularShows,
                tvGenres: Store.getState().tvGenres,
                loaded: Store.getState().loaded
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getMovieData() {
        Promise.all([
            getPopularMovies(),
            getMovieGenres()
        ]).then((data) => {
            let [ movies, genres ] = data;
            Store.dispatch({type: 'load_popularMovies', data: movies});
            Store.dispatch({type: 'load_movieGenres', data: genres});
        }).then(() => {
            Store.dispatch({type: 'loading_state', data: true});
        })
    }

    getShowData() {
        Promise.all([
            getPopularShows(),
            getTVGenres()
        ]).then((data) => {
            let [ shows, genres ] = data;
            Store.dispatch({type: 'load_popularShows', data: shows});
            Store.dispatch({type: 'load_tvGenres', data: genres});
        }).then(() => {
            Store.dispatch({type: 'loading_state', data: true});
        })
    }

    handleChange(value) {
        this.setState({slideIndex: value, load: true});
        this.getShowData();
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
                    index={ this.state.slideIndex }
                    onChangeIndex={ this.handleChange.bind(this) }
                >
                    <PopularMovieComponent movies={this.state.popularMovies} movieGenres={this.state.movieGenres} />
                    { this.state.load ? <PopularShowComponent tvShows={this.state.popularShows}
                                                              tvGenres={this.state.tvGenres}
                                                              movieGenres={this.state.movieGenres}/> : null
                    }
                </SwipeableViews>
            </div>
        )
    }
}