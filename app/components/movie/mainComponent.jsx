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
            percent: 0
        };
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});
        Store.dispatch({type: 'loading_state', data: this.state.percent});

        getMovieById(movieId).then(jsondata => {
            Store.dispatch({type: 'load_movie', data: jsondata});
            Store.dispatch({type: 'loading_state', data: Store.getState().percent + 1})
        });

        getKeywordsForMovie(movieId).then(jsondata => {
            Store.dispatch({type: 'load_keywords', data: jsondata});
            Store.dispatch({type: 'loading_state', data: Store.getState().percent + 1})
        });

        getMovieReviews(movieId).then(jsondata => {
            Store.dispatch({type: 'load_reviews', data: jsondata});
            Store.dispatch({type: 'loading_state', data: Store.getState().percent + 1})
        });

        getCastForMovie(movieId).then(jsondata => {
            Store.dispatch({type: 'load_cast', data: jsondata});
            Store.dispatch({type: 'loading_state', data: Store.getState().percent + 1});
        });

        getSimilarMovies(movieId).then(jsondata => {
            Store.dispatch({type: 'load_similar', data: jsondata});
            Store.dispatch({type: 'loading_state', data: Store.getState().percent + 1});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                movie: Store.getState().movie,
                keywords: Store.getState().keywords,
                reviews: Store.getState().reviews,
                cast: Store.getState().cast,
                similar: Store.getState().similar,
                percent: Store.getState().percent
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.percent === 5) {
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