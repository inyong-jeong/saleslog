import {
    GET_USER_ACCOUNT,
    GET_USER_ACCOUNT_SUCCESS,
    GET_USER_ACCOUNT_ERROR
} from '../../constants/actionTypes';

const INIT_STATE = {
  accounts: []
};

const Account = (state=INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_ACCOUNT:
      return { ...state };
    case GET_USER_ACCOUNT_SUCCESS:
      return { ...state, accounts: action.payload.response };
    case GET_USER_ACCOUNT_ERROR:
      return { ...state, error: action.payload.error};
    default:
      return { ...state };
  }
};

export default Account;