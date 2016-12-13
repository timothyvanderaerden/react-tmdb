import {createStore} from 'redux';
import * as types from '../constants/actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
        case types.ROUTER_LISTEN:
            return Object.assign({}, state, {location: action.data});
        case types.SEARCH_RESULTS:
            return Object.assign({}, state, {searchResult: action.data});
        case types.SEARCH_PEOPLE:
            return Object.assign({}, state, {searchPeople: action.data});
        case types.APPBAR_SEARCH:
            return Object.assign({}, state, {searchBar: action.data});
        case types.APPBAR_TITLE:
            return Object.assign({}, state, {appBarTitle: action.data});
        case types.APPBAR_STYLE:
            return Object.assign({}, state, {appBarStyle: action.data});
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
