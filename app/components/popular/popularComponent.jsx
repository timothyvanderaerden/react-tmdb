import React from 'react';
import Store from '../../store';
import {getPopularMovies} from '../../api/Discover';
import {getMovieGenres} from '../../api/Genres';
import {getPopularShows} from '../../api/Discover';
import {getTVGenres} from '../../api/Genres';
import PopularMovieComponent from '../movie/movieCardsComponent';
import PopularShowComponent from '../tv/tvShowCardsComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

export default class PopularComponent extends React.Component {
    componentWillMount() {
        this.state = {appBarTitle: "Popular", slideIndex: 0, load: false, movieLoaded: false, showLoaded: false};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});

        this.getMovieData();

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                movieList: Store.getState().movieList,
                movieGenres: Store.getState().movieGenres,
                tvShowList: Store.getState().tvShowList,
                tvGenres: Store.getState().tvGenres
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
            Store.dispatch({type: 'load_movieList', data: movies});
            Store.dispatch({type: 'load_movieGenres', data: genres});
        }).then(() => {
            this.setState({movieLoaded: true});
        })
    }

    getShowData() {
        Promise.all([
            getPopularShows(),
            getTVGenres()
        ]).then((data) => {
            let [ shows, genres ] = data;
            Store.dispatch({type: 'load_tvShowList', data: shows});
            Store.dispatch({type: 'load_tvGenres', data: genres});
        }).then(() => {
            this.setState({showLoaded: true});
        })
    }

    handleChange = (value) => {
        this.setState({slideIndex: value, load: true});
        this.getShowData();
    };

    render() {
        const { index, slideIndex, movieLoaded, movieList, movieGenres,
            load, showLoaded, tvShowList, tvGenres } = this.state;
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={index}
                >
                    <Tab label="Movies" value={0}/>
                    <Tab label="TV Shows" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={ slideIndex }
                    onChangeIndex={ this.handleChange }
                >
                    { movieLoaded ?
                        <PopularMovieComponent movies={ movieList }
                                               movieGenres={ movieGenres }/>
                        : <LoadingComponent/>
                    }

                    { load && showLoaded ?
                        <PopularShowComponent tvShows={ tvShowList }
                                              tvGenres={ tvGenres }
                                              movieGenres={ movieGenres }/>
                        : null
                    }
                </SwipeableViews>
            </div>
        )
    }
}