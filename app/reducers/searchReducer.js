import * as types from '../constants/actionTypes';

const appBarReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SEARCH_RESULTS:
      return (Object.assign({}, state, action.results));
    case types.SEARCH_PEOPLE:
      return (Object.assign({}, state, action.people));
    default:
      return state;
  }
};

export default appBarReducer;
