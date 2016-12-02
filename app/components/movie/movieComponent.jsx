import React from 'react';
import Store from '../../store';
import {
    getMovieById, getKeywordsForMovie, getMovieReviews,
    getCastForMovie, getSimilarMovies
} from '../../api/Movies';
import MovieCardComponent from './movieCardComponent';
import SidebarComponent from '../shared/sidebarComponent';
import ReviewComponent from '../shared/reviewComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Row, Col} from 'react-flexbox-grid';

export default class MovieComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {movieLoaded: false, movieId: this.props.params.movieId};
        Store.dispatch({type: 'appbar_title', data: this.props.params.movieName});
        Store.dispatch({type: 'appbar_navigationBack', data: true});

        this.getMovieData(this.state.movieId);

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                movie: Store.getState().movie,
                keywords: Store.getState().keywords,
                reviews: Store.getState().reviews,
                cast: Store.getState().cast,
                similar: Store.getState().similar,
                location: Store.getState().location
            });
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.location !== nextState.location) {
            window.scrollTo(0,0);
            const [ , , movieId, movieName ] = nextState.location.pathname.split('/');
            Store.dispatch({type: 'appbar_title', data: movieName});
            this.getMovieData(movieId);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getMovieData(movieId) {
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
            this.setState({movieLoaded: true})
        })
    }

    render() {
        const {movieLoaded, keywords, reviews, movie, cast, similar} = this.state;
        if (movieLoaded) {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12} md={8}>
                        <MovieCardComponent keywords={keywords} movie={movie}/>
                        <ReviewComponent reviews={reviews}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <SidebarComponent cast={cast} similar={similar}/>
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