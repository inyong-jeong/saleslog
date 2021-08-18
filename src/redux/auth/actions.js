// @flow
import {
  AUTHORIZE_REQUEST,
  AUTHORIZE_REQUEST_SUCCESS,
  AUTHORIZE_REQUEST_FAIL,
  SIGN_OUT_USER,
  SIGN_OUT_USER_SUCCESS,
  SIGN_OUT_USER_FAIL,
  TOKEN_EXPIRED,
  GET_ACCESS_TOKEN,
  GET_REFRESH_TOKEN,
  CHANGE_PASSWORD,
  OAUTH_AUTHENTICATE_USER,
  FIND_PASSWORD,
  SIGNUP_USER,
  CHECK_EMAIL,
  SET_POLICY_CHECK,
  SET_USER_TYPE,
  SET_USER_FORM,
  SIGN_UP_COMPLETE,
  INIT_FORM,
  NOT_EXIST,
  ALREADY_EXIST,
  OAUTH_AUTHORIZE,
  GET_OAUTH_TOKEN,
  GET_REFRESH_OAUTH_TOKEN,
  POST_AUTHNUMBER,
  POST_REGISTRATION,
  POST_INVITE,
  POST_INVITE_REGISTRATION
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const authorizeRequest = (redirectUri) => ({
  type: AUTHORIZE_REQUEST,
  payload: { redirectUri }
});

export const requestSuccess = () => ({
  type: AUTHORIZE_REQUEST_SUCCESS
});

export const requestFail = (errorMsg) => ({
  type: AUTHORIZE_REQUEST_FAIL,
  payload: { errorMsg }
});

export const signOut = (history) => ({
  type: SIGN_OUT_USER,
  payload: history
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_USER_SUCCESS
});

export const signOutFail = () => ({
  type: SIGN_OUT_USER_FAIL
});

export const tokenExpired = (state) => ({
  type: TOKEN_EXPIRED,
  payload: { state }
});

export const initForm = () => ({
  type: INIT_FORM
});

export const existEmail = () => ({
  type: ALREADY_EXIST
});

export const notExistEmail = () => ({
  type: NOT_EXIST
});

export const setPolicyCheck = (policyCheck) => ({
  type: SET_POLICY_CHECK,
  payload: { policyCheck }
});

export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: { userType }
});

export const setUserForm = (userForm) => ({
  type: SET_USER_FORM,
  payload: { userForm }
});

export const signUpComplete = () => ({
  type: SIGN_UP_COMPLETE
});

export const getAccessToken = fetchActionGenerator(GET_ACCESS_TOKEN);
export const getRefreshToken = fetchActionGenerator(GET_REFRESH_TOKEN);
// export const changePassword = fetchActionGenerator(CHANGE_PASSWORD, 'email', 'password');
export const oauthAuthenticateUser = fetchActionGenerator(OAUTH_AUTHENTICATE_USER, 'email', 'password', 'redirectUri', 'clientType', 'state', 'keepSession', 'responseType');
// export const findPassword = fetchActionGenerator(FIND_PASSWORD, 'email');

export const signUpUser = fetchActionGenerator(SIGNUP_USER, 'userType', 'body');

export const checkEmail = fetchActionGenerator(CHECK_EMAIL, 'email');

// renewal login acion

export const authorize = fetchActionGenerator(OAUTH_AUTHORIZE, 'username', 'password', 'client_id', 'redirect_uri', 'response_type', 'grant_type', 'state');
export const getOauthToken = fetchActionGenerator(GET_OAUTH_TOKEN, 'code', 'client_secret', 'client_id', 'grant_type');
export const getRefreshOauthToken = fetchActionGenerator(GET_REFRESH_OAUTH_TOKEN, 'refresh_token', 'client_id', 'client_secret', 'grant_type');
export const findPassword = fetchActionGenerator(FIND_PASSWORD, 'email');
export const changePassword = fetchActionGenerator(CHANGE_PASSWORD, 'code', 'email', 'password');
export const postAuthNumber = fetchActionGenerator(POST_AUTHNUMBER, 'email');
export const postRegisteration = fetchActionGenerator(POST_REGISTRATION, 'user_email', 'user_name', 'user_password', 'comp_name', 'comp_domain');
export const postInvite = fetchActionGenerator(POST_INVITE, 'login_id', 'invite_email', 'permission');
export const postInviteRegistration = fetchActionGenerator(POST_INVITE_REGISTRATION, 'user_email', 'invite_code', 'user_name', 'user_password', 'use_name');





