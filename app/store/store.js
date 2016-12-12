import {createStore} from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'ROUTER_LISTEN':
            return Object.assign({}, state, {location: action.data});
        case 'SEARCH_RESULTS':
            return Object.assign({}, state, {searchResult: action.data});
        case 'SEARCH_PEOPLE':
            return Object.assign({}, state, {searchPeople: action.data});
        case 'APPBAR_SEARCH':
            return Object.assign({}, state, {searchBar: action.data});
        case 'APPBAR_TITLE':
            return Object.assign({}, state, {appBarTitle: action.data});
        case 'APPBAR_STYLE':
            return Object.assign({}, state, {appBarStyle: action.data});
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
