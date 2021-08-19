// @flow
import {
  CHANGE_PASSWORD,
  FIND_PASSWORD,
  OAUTH_AUTHORIZE,
  GET_OAUTH_TOKEN,
  GET_REFRESH_OAUTH_TOKEN,
  POST_AUTHNUMBER,
  POST_REGISTRATION,
  POST_INVITE,
  POST_INVITE_REGISTRATION,
  SIGNUP_USER,
  SET_USER_TYPE,
  SET_USER_FORM,
  SET_POLICY_CHECK,

} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';


// renewal login acion

export const authorize = fetchActionGenerator(OAUTH_AUTHORIZE, 'username', 'password', 'client_id', 'redirect_uri', 'response_type', 'grant_type', 'state');
export const getOauthToken = fetchActionGenerator(GET_OAUTH_TOKEN, 'code', 'client_secret', 'client_id', 'grant_type');
export const getRefreshOauthToken = fetchActionGenerator(GET_REFRESH_OAUTH_TOKEN, 'refresh_token', 'client_id', 'client_secret', 'grant_type');
export const findPassword = fetchActionGenerator(FIND_PASSWORD, 'email');
export const changePassword = fetchActionGenerator(CHANGE_PASSWORD, 'code', 'email', 'password');
export const postAuthNumber = fetchActionGenerator(POST_AUTHNUMBER, 'email');
export const postRegisteration = fetchActionGenerator(POST_REGISTRATION, 'useremail', 'password', 'firstname', 'lastname', 'comp_name', 'comp_domain');
export const postInvite = fetchActionGenerator(POST_INVITE, 'login_id', 'invite_email', 'permission');
export const postInviteRegistration = fetchActionGenerator(POST_INVITE_REGISTRATION, 'user_email', 'invite_code', 'user_name', 'user_password', 'use_name');

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


export const signUpUser = fetchActionGenerator(SIGNUP_USER, 'userType', 'body');
