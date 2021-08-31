import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import SalesLog from './saleslog/reducers';
import Account from './account/reducers';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  Auth,
  SalesLog,
  Account,
  routing: routerReducer
});