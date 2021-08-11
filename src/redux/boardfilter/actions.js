// @flow
import {
  SET_FILTER_USERS,
  SET_FILTER_FROM_DATE,
  SET_FILTER_TO_DATE,
  SET_FILTER_PAGE,
  SET_FILTER_ORDER,
} from 'constants/actionTypes';


export const setFilterUsers = (users) => ({
  type: SET_FILTER_USERS,
  payload: { users }
});


export const setFilterFromDate = (fromDate) => ({
  type: SET_FILTER_FROM_DATE,
  payload: { fromDate }
});

export const setFilterToDate = (toDate) => ({
  type: SET_FILTER_TO_DATE,
  payload: { toDate }
});

export const setFilterPage = (page) => ({
  type: SET_FILTER_PAGE,
  payload: { page } 
});

export const setFilterOrder = (order) => ({
  type: SET_FILTER_ORDER,
  payload: { order } 
});
