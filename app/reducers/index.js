import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appBar from './appBarReducer';
import search from './searchReducer';
import router from './routerReducer';

const rootReducer = combineReducers({
  appBar,
  search,
  router,
  routing: routerReducer
});

export default rootReducer;
