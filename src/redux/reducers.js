import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import SalesLog from './saleslog/reducers';
import Account from './account/reducers';
import { routerReducer } from 'react-router-redux'
import Customer from './customer/reducers';
import CustomerFilter from './customer/filter/reducers';

export default combineReducers({
  Auth,
  SalesLog,
  Account,
  Customer,
  CustomerFilter,
  routing: routerReducer
});