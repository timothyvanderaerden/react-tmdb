import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
    getMovieById, getKeywordsForMovie, getMovieReviews,
    getCastForMovie, getSimilarMovies
} from '../../api/Movies';
import MovieCardComponent from './movieCardComponent';
import SidebarComponent from '../shared/sidebarComponent';
import ReviewComponent from '../shared/reviewComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Row, Col} from 'react-flexbox-grid';
import { appBarActions } from '../../actions';

class MovieComponent extends Component {
    componentWillMount() {
        const movieId = this.props.match.params.movieId;
        this.state = { movieLoaded: false };
        this.props.actions.changeAppBarTitle(this.props.match.params.movieName);

        this.getMovieData(movieId);
    }

    componentWillUpdate(nextState) {
        if (this.state.location !== nextState.location && this.state.location !== undefined) {
            const [ , , movieId, movieName ] = nextState.location.pathname.split('/');
            this.props.actions.changeAppBarTitle(movieName);
            this.getMovieData(movieId);
        }
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
            this.setState({movieLoaded: true});
        });
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
            );
        } else {
            return (
                <LoadingComponent/>
            );
        }
    }
}

MovieComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieComponent);
