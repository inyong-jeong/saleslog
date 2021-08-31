import {
  GET_USER_ACCOUNT,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_ERROR,
  SELECT_ACCOUNTS,
  SELECT_ACCOUNTS_SUCCESS,
  SELECT_ACCOUNTS_ERROR,
  SELECT_ACCOUNT_PERSON,
  SELECT_ACCOUNT_PERSON_SUCCESS,
  SELECT_ACCOUNT_PERSON_ERROR
} from '../../constants/actionTypes';

const INIT_STATE = {
  accounts: [],
  accountslist: [],
  accountpersonlist: [],
};

const Account = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_ACCOUNT:
      return { ...state };
    case GET_USER_ACCOUNT_SUCCESS:
      return { ...state, accounts: action.payload.response };
    case GET_USER_ACCOUNT_ERROR:
      return { ...state, error: action.payload.error };
    case SELECT_ACCOUNTS:
      return { ...state };
    case SELECT_ACCOUNTS_SUCCESS:
      return { ...state, accountslist: action.payload.response.message };
    case SELECT_ACCOUNTS_ERROR:
      return { ...state, error: action.payload.error };
    case SELECT_ACCOUNT_PERSON:
      return { ...state };
    case SELECT_ACCOUNT_PERSON_SUCCESS:
      return { ...state, accountpersonlist: action.payload.response.message };
    case SELECT_ACCOUNT_PERSON_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default Account;