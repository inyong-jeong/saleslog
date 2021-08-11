import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import SalesLog from './saleslog/reducers';
import TripReport from './tripreport/reducers';
import User from './user/reducers';
import Account from './account/reducers';
import Filter from './filter/reducers';
import Notification from './notification/reducers';
import Stat from './stat/reducers';
import Organization from './organization/reducers';
import Board from './board/reducers';
import BoardFilter from './boardfilter/reducers';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  Auth,
  SalesLog,
  User,
  Account,
  Filter,
  TripReport,
  Notification,
  Stat,
  Organization,
  Board,
  BoardFilter,
  routing: routerReducer
});