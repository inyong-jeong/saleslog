// @flow
import {
  AUTHORIZE_REQUEST,
  AUTHORIZE_REQUEST_FAIL,
  SIGN_OUT_USER_SUCCESS,
  TOKEN_EXPIRED,
  OAUTH_AUTHENTICATE_USER,
  OAUTH_AUTHENTICATE_USER_SUCCESS,
  OAUTH_AUTHENTICATE_USER_FAILED,
  FIND_PASSWORD,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILED,
  SET_POLICY_CHECK,
  INIT_FORM,
  CHECK_EMAIL,
  SET_USER_TYPE,
  SET_USER_FORM,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILED,
  SIGN_UP_COMPLETE,
  NOT_EXIST,
  ALREADY_EXIST,
  OAUTH_AUTHORIZE,
  OAUTH_AUTHORIZE_SUCCESS,
  OAUTH_AUTHORIZE_ERROR

} from 'constants/actionTypes';

let INIT_STATE = {
  loading: false,
  policyCheck: false,
  userType: null,
  userForm: null,
  signUpComplete: false
};

const Auth = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    case AUTHORIZE_REQUEST:
      return { ...state };
    case AUTHORIZE_REQUEST_FAIL:
      return { ...state };
    case SIGN_OUT_USER_SUCCESS:
      return { user: {}, ...state };
    case TOKEN_EXPIRED:
      return { ...state, tokenExpired: action.payload.state };
    case 'GET_ACCESS_TOKEN_SUCCESS':
      return { ...state, tokenResponse: action.payload.response };
    case 'GET_ACCESS_TOKEN_ERROR':
      return { ...state }
    case 'GET_REFRESH_TOKEN_SUCCESS':
      return { ...state, refTokenResponse: action.payload.response };
    case 'GET_REFRESH_TOKEN_ERROR':
      return { ...state, refTokenError: action.payload.error };
    case 'CHANGE_PASSWORD_SUCCESS':
      return { ...state, changePasswordResponse: action.payload.response };
    case 'CHANGE_PASSWORD_ERROR':
      return { ...state, changePasswordError: action.payload.error };
    case OAUTH_AUTHENTICATE_USER:
      return { ...state, loading: true };
    case OAUTH_AUTHENTICATE_USER_SUCCESS:
      return { ...state, url: action.payload, loading: false, error: null };
    case OAUTH_AUTHENTICATE_USER_FAILED:
      return { ...state, error: action.payload, loading: false };
    //RENEWAL
    case OAUTH_AUTHORIZE:
      return { ...state, loading: true };
    case OAUTH_AUTHORIZE_SUCCESS:
      return { ...state, url: action.payload, loading: false, error: null };
    case OAUTH_AUTHORIZE_ERROR:
      return { ...state, error: action.payload, loading: false };
    case FIND_PASSWORD:
      return { ...state };
    case FIND_PASSWORD_SUCCESS:
      return { ...state, findPasswordResponse: action.payload.response };
    case FIND_PASSWORD_FAILED:
      return { ...state, findPasswordError: action.payload.error };
    case INIT_FORM:
      return { ...state, emailPassed: null };
    case CHECK_EMAIL:
      return { ...state, emailPassed: null };
    case ALREADY_EXIST:
      return { ...state, emailPassed: false };
    case NOT_EXIST:
      return { ...state, emailPassed: true };
    case SET_POLICY_CHECK:
      return { ...state, policyCheck: action.payload.policyCheck };
    case SET_USER_TYPE:
      return { ...state, userType: action.payload.userType };
    case SET_USER_FORM:
      return { ...state, userForm: action.payload.userForm };
    case SIGNUP_USER:
      return { ...state, signUpLoading: true };
    case SIGNUP_USER_SUCCESS:
      return { ...state, signUpResponse: action.payload.response, signUpLoading: false };
    case SIGNUP_USER_FAILED:
      return { ...state, signUpResError: action.payload.error, signUpLoading: false };
    case SIGN_UP_COMPLETE:
      return { ...state, signUpComplete: true };
    default: return { ...state };
  }
}

export default Auth;