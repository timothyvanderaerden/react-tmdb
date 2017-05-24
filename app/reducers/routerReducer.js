import * as types from '../constants/actionTypes';

const appBarReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ROUTER_LISTEN:
      return (Object.assign({}, state, action.route));
    default:
      return state;
  }
};

export default appBarReducer;
