// @flow
import {
  OAUTH_AUTHENTICATE_USER,
  OAUTH_AUTHENTICATE_USER_SUCCESS,
  OAUTH_AUTHENTICATE_USER_FAILED,
  FIND_PASSWORD,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILED,
  OAUTH_AUTHORIZE,
  OAUTH_AUTHORIZE_SUCCESS,
  OAUTH_AUTHORIZE_ERROR,
  POST_AUTHNUMBER,
  POST_AUTHNUMBER_SUCCESS,
  POST_AUTHNUMBER_ERROR,
  SET_POLICY_CHECK,
  SET_USER_TYPE,
  SET_USER_FORM,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILED,
  SIGN_UP_COMPLETE,
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_ERROR,
  POST_WORKGROUP,
  POST_WORKGROUP_SUCCESS,
  POST_WORKGROUP_ERROR,
  POST_INVITE,
  POST_INVITE_SUCCESS,
  POST_INVITE_ERROR,



} from 'constants/actionTypes';

let INIT_STATE = {
  loading: false,
  policyCheck: false,
  userType: null,
  userForm: null,
  signUpComplete: false,
  authNumbercheck: false,
  email: null,
  postworkgroupResponse: null,
  postinviteResponse: null

};

const Auth = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
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
    case POST_AUTHNUMBER:
      return { ...state };
    case POST_AUTHNUMBER_SUCCESS:
      return { ...state, authNumberResponse: action.payload.response.message, loading: false };
    case POST_AUTHNUMBER_ERROR:
      return { ...state, authNumberError: action.payload.error, loading: false };
    case POST_REGISTRATION:
      return { ...state, email: action.payload.useremail };
    case POST_REGISTRATION_SUCCESS:
      return { ...state };
    case POST_REGISTRATION_ERROR:
      return { ...state, error: action.payload };
    case POST_WORKGROUP:
      return { ...state, email: action.payload.useremail };
    case POST_WORKGROUP_SUCCESS:
      return { ...state, postworkgroupResponse: action.payload.response.message };
    case POST_WORKGROUP_ERROR:
      return { ...state, error: action.payload };
    case POST_INVITE:
      return { ...state };
    case POST_INVITE_SUCCESS:
      return { ...state, postinviteResponse: action.payload.response.message.state };
    case POST_INVITE_ERROR:
      return { ...state, error: action.payload };
    case FIND_PASSWORD:
      return { ...state };
    case FIND_PASSWORD_SUCCESS:
      return { ...state, findPasswordResponse: action.payload.response };
    case FIND_PASSWORD_FAILED:
      return { ...state, findPasswordError: action.payload.error };
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