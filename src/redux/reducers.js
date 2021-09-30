import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import SalesLog from './saleslog/reducers';
import Account from './account/reducers';
import { routerReducer } from 'react-router-redux'
import Customer from './customer/reducers';
import Workgroup from './workgroup/reducers';
import Organization from './organization/reducers';
import Profile from './profile/reducers';
import Support from './support/reducers';
import Dashboard from './dashboard/reducers';
import Etc from './etc/reducers';




export default combineReducers({
  Auth,
  SalesLog,
  Account,
  Customer,
  Workgroup,
  Organization,
  Profile,
  Support,
  Dashboard,
  Etc,
  routing: routerReducer
});