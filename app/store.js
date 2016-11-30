import {createStore} from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'load_configurations':
            return Object.assign({}, state, {configurations: action.data});
        case 'load_popularMovies':
            return Object.assign({}, state, {popularMovies: action.data});
        case 'load_popularShows':
            return Object.assign({}, state, {popularShows: action.data});
        case 'load_movieGenres':
            return Object.assign({}, state, {movieGenres: action.data});
        case 'load_tvGenres':
            return Object.assign({}, state, {tvGenres: action.data});
        case 'load_movie':
            return Object.assign({}, state, {movie: action.data});
        case 'load_keywords':
            return Object.assign({}, state, {keywords: action.data});
        case 'load_cast':
            return Object.assign({}, state, {cast: action.data});
        case 'load_similar':
            return Object.assign({}, state, {similar: action.data});
        case 'load_reviews':
            return Object.assign({}, state, {reviews: action.data});
        case 'load_tvShow':
            return Object.assign({}, state, {tvShow: action.data});
        case 'appbar_title':
            return Object.assign({}, state, {appBarTitle: action.data});
        case 'appbar_navigationBack':
            return Object.assign({}, state, {appBarBack: action.data});
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
