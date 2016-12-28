import React from 'react';
import Store from '../../store/store';
import {changeAppBarTitle} from '../../actions/appBarActions';
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
        const movieId = this.props.params.movieId;
        this.state = {movieLoaded: false, location: Store.getState().location};
        Store.dispatch(changeAppBarTitle(this.props.params.movieName));

        this.getMovieData(movieId);

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                location: Store.getState().location
            });
        });
    }

    componentWillUpdate(nextState) {
        if (this.state.location !== nextState.location && this.state.location !== undefined) {
            const [ , , movieId, movieName ] = nextState.location.pathname.split('/');
            Store.dispatch(changeAppBarTitle(movieName));
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
            this.setState({movie: movie});
            this.setState({keywords: keywords});
            this.setState({reviews: reviews});
            this.setState({cast: cast});
            this.setState({similar: similar});
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