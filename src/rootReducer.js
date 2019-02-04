import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import lang from './reducer/lang';

export default combineReducers({
  router: routerReducer,
  lang
});
