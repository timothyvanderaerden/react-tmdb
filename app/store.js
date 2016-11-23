import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'load_configurations':
            return Object.assign({}, state, {configurations: action.data});
        case 'load_popularMovies':
            return Object.assign({}, state, {popularMovies: action.data});
        case 'appbar_title':
            return Object.assign({}, state, { appBarTitle: action.data });
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
