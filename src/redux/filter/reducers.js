// @flow
import {
  SET_ACCOUNTS,
  SET_USERS,
  ON_DELETED_USER,
  SET_FROM_DATE,
  SET_TO_DATE,
  SET_PAGE
} from 'constants/actionTypes';

let INIT_STATE = {
  accounts: [],
  users: [],
  deletedUser: {},
  fromDate: 1,
  toDate: new Date().getTime(),
  page: 0
};

const Filter = (state=INIT_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return { ...state, accounts: action.payload.accounts };
    case SET_USERS:
      return { ...state, users: action.payload.users };
    case ON_DELETED_USER:
      return { ...state, deletedUser: action.payload.user };
    case SET_FROM_DATE:
      return { ...state, fromDate: action.payload.fromDate };
    case SET_TO_DATE:
      return { ...state, toDate: action.payload.toDate };
    case SET_PAGE:
      return { ...state, page: action.payload.page };
    default: return { ...state };
  }
}

export default Filter;