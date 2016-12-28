import React from 'react';
import Store from '../../store/store';
import {changeAppBarTitle} from '../../actions/appBarActions';
import {getUpcomingMovies} from '../../api/Movies';
import {getMovieGenres} from '../../api/Genres';
import MovieListComponent from '../movie/movieCardsComponent';
import LoadingComponent from '../shared/loadingComponent';

export default class UpcomingComponent extends React.Component {
    componentWillMount() {
        this.state = {appBarTitle: "Now in theaters", movieLoaded: false};
        Store.dispatch(changeAppBarTitle(this.state.appBarTitle));

        this.getMovieData();
    }

    getMovieData() {
        Promise.all([
            getUpcomingMovies(),
            getMovieGenres()
        ]).then((data) => {
            let [ movies, genres ] = data;
            this.setState({movieList: movies});
            this.setState({movieGenres: genres});
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