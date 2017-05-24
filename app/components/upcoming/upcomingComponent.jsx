import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { appBarActions } from '../../actions';
import { getUpcomingMovies } from '../../api/Movies';
import { getMovieGenres } from '../../api/Genres';
import MovieListComponent from '../movie/movieCardsComponent';
import LoadingComponent from '../shared/loadingComponent';

class UpcomingComponent extends Component {
    componentWillMount() {
        this.state = { appBarTitle: "Now in theaters", movieLoaded: false };
        this.props.actions.changeAppBarTitle(this.state.appBarTitle);

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
        });
    }

    render() {
        const {movieLoaded, movieList, movieGenres} = this.state;
        return (
            <div>
                { movieLoaded ?
                    <MovieListComponent movies={movieList}
                                        movieGenres={movieGenres}/>
                    : <LoadingComponent/>
                }
            </div>
        );
    }
}

UpcomingComponent.propTypes = {
  actions: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingComponent);
