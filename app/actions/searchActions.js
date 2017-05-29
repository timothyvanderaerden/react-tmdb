import * as types from '../constants/actionTypes';

export const setSearchResults = (results) => {
    return { type: types.SEARCH_RESULTS, results: { results } };
};

export const setSearchPeople = (people) => {
    return { type: types.SEARCH_PEOPLE, people: { people } };
};
