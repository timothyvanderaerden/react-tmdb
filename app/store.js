import {createStore} from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'react_router':
            return Object.assign({}, state, {location: action.data});
        case 'search':
            return Object.assign({}, state, {searchResult: action.data});
        case 'search_people':
            return Object.assign({}, state, {searchPeople: action.data});
        case 'search_bar':
            return Object.assign({}, state, {searchBar: action.data});
        case 'appbar_title':
            return Object.assign({}, state, {appBarTitle: action.data});
        case 'appbar_style':
            return Object.assign({}, state, {appBarStyle: action.data});
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
