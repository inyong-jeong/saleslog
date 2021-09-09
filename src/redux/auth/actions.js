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
  POST_WORKGROUP,
  CHECK_ACCESS_TOKEN,

} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';


//토큰 만료 확인
export const checkAccessToken = fetchActionGenerator(CHECK_ACCESS_TOKEN);


// renewal login acion

export const authorize = fetchActionGenerator(OAUTH_AUTHORIZE, 'username', 'password', 'client_id', 'redirect_uri', 'response_type', 'grant_type', 'state');
export const getOauthToken = fetchActionGenerator(GET_OAUTH_TOKEN, 'code', 'client_secret', 'client_id', 'grant_type');
export const getRefreshOauthToken = fetchActionGenerator(GET_REFRESH_OAUTH_TOKEN, 'refresh_token', 'client_id', 'client_secret', 'grant_type');
export const findPassword = fetchActionGenerator(FIND_PASSWORD, 'email');
export const changePassword = fetchActionGenerator(CHANGE_PASSWORD, 'code', 'email', 'password');
export const postAuthNumber = fetchActionGenerator(POST_AUTHNUMBER, 'email');
export const postRegisteration = fetchActionGenerator(POST_REGISTRATION, 'useremail', 'password', 'firstname', 'lastname');
export const postInvite = fetchActionGenerator(POST_INVITE, 'login_id', 'invite_email', 'permission');
export const postInviteRegistration = fetchActionGenerator(POST_INVITE_REGISTRATION, 'user_email', 'invite_code', 'user_name', 'user_password', 'use_name');
export const postWorkGroup = fetchActionGenerator(POST_WORKGROUP, 'user_email', 'comp_name', 'comp_domain');


