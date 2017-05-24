import * as types from '../constants/actionTypes';

const appBarReducer = (state = {}, action) => {
  switch (action.type) {
    case types.APPBAR_TITLE:
      return (Object.assign({}, state, action.title));
    case types.APPBAR_STYLE:
      return (Object.assign({}, state, action.style));
    case types.APPBAR_SEARCH:
      return (Object.assign({}, state, action.visible));
    default:
      return state;
  }
};

export default appBarReducer;
