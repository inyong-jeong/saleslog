// @flow
import {
  SET_FILTER_USERS,
  SET_FILTER_FROM_DATE,
  SET_FILTER_TO_DATE,
  SET_FILTER_PAGE,
  SET_FILTER_ORDER,
} from 'constants/actionTypes';

let INIT_STATE = {
  order: 1,
  fromDate: 1,
  toDate: new Date().getTime(),
  page: 0,
  count:5
};

const BoardFilter = (state=INIT_STATE, action) => {
  switch (action.type) {
    case SET_FILTER_USERS:
      return { ...state, users: action.payload.users };
    case SET_FILTER_FROM_DATE:
      return { ...state, fromDate: action.payload.fromDate };
    case SET_FILTER_TO_DATE:
      return { ...state, toDate: action.payload.toDate };
    case SET_FILTER_PAGE:
      return { ...state, page: action.payload.page };
    case SET_FILTER_ORDER:
      return { ...state, order: action.payload.order };
    default: return { ...state };
  }
}

export default BoardFilter;
