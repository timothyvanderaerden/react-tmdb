import React from 'react';
import Store from '../../store';
import {getUpcomingMovies} from '../../api/Movies';
import {getMovieGenres} from '../../api/Genres';
import MovieListComponent from '../movie/movieCardsComponent';
import LoadingComponent from '../shared/loadingComponent';

export default class UpcomingComponent extends React.Component {
    componentWillMount() {
        this.state = {appBarTitle: "Now in theaters", movieLoaded: false};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});

        this.getMovieData();

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                movieList: Store.getState().movieList,
                movieGenres: Store.getState().movieGenres
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getMovieData() {
        Promise.all([
            getUpcomingMovies(),
            getMovieGenres()
        ]).then((data) => {
            let [ movies, genres ] = data;
            Store.dispatch({type: 'load_movieList', data: movies});
            Store.dispatch({type: 'load_movieGenres', data: genres});
        }).then(() => {
            this.setState({movieLoaded: true});
        })
    }

    render() {
        const {movieLoaded, movieList, movieGenres} = this.state;
        return (
            <div>
                { movieLoaded ?
                    <MovieListComponent movies={ movieList }
                                        movieGenres={ movieGenres }/>
                    : <LoadingComponent/>
                }
            </div>
        )
    }
}