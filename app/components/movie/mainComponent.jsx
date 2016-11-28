import React from 'react';
import Store from '../../store';
import {getMovieById, getKeywordsForMovie, getMovieReviews,
    getCastForMovie, getSimilarMovies} from '../../api/Movies';
import MovieComponent from './movieComponent';
import SidebarComponent from './sidebarComponent';
import ReviewComponent from './reviewComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Row, Col} from 'react-flexbox-grid';

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const movieId = this.props.params.movieId;
        this.state = {
            appBarTitle: "Movie",
            movie: null,
            keywords: null,
            reviews: null,
            cast: null,
            similar: null,
            loaded: false
        };
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});
        Store.dispatch({type: 'loading_state', data: this.state.loaded});

        this.getDataAsync(movieId);

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                movie: Store.getState().movie,
                keywords: Store.getState().keywords,
                reviews: Store.getState().reviews,
                cast: Store.getState().cast,
                similar: Store.getState().similar,
                loaded: Store.getState().loaded
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getDataAsync(movieId) {
        Promise.all([
            getMovieById(movieId),
            getKeywordsForMovie(movieId),
            getMovieReviews(movieId),
            getCastForMovie(movieId),
            getSimilarMovies(movieId)
        ]).then((data) => {
            let [ movie, keywords, reviews, cast, similar ] = data;
            Store.dispatch({type: 'load_movie', data: movie});
            Store.dispatch({type: 'load_keywords', data: keywords});
            Store.dispatch({type: 'load_reviews', data: reviews});
            Store.dispatch({type: 'load_cast', data: cast});
            Store.dispatch({type: 'load_similar', data: similar});
        }).then(() => {
            Store.dispatch({type: 'loading_state', data: true});
        })
    }

    render() {
        if (this.state.percent) {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12} md={8}>
                        <MovieComponent keywords={this.state.keywords} movie={this.state.movie}/>
                        <ReviewComponent reviews={this.state.reviews}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <SidebarComponent cast={this.state.cast} similar={this.state.similar}/>
                    </Col>
                </Row>
            )
        } else {
            return (
                <LoadingComponent/>
            )
        }
    }
}