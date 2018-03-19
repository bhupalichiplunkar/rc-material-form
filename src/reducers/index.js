import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mainReducer from './main.js';

export default combineReducers({
  router: routerReducer,
  mainReducer
});
