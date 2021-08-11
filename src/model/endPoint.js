import React from 'react';
// import { checkDevelopmentMode } from './utils';
const checkDevelopmentMode = () => {
  return '_self' in React.createElement('div');
}

const stage = checkDevelopmentMode() ? '/dev' : '/prod';
const oauth2 = '/oauth2';

export const SIGNUP_USER = stage + '/signup';
export const CHECK_EMAIL = stage + '/signup/email';
export const OAUTH_AUTORIZE = stage + oauth2 + '/authorize?grant_typee=200&client_id={clientId}&redirect_uri={redirectUri}&expires={expires}';
export const OAUTH_AUTHENTICATE = stage + oauth2 + '/authenticate';
export const FIND_PASSWORD = stage + 'signup/password';