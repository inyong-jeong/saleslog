// @flow
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  requestSuccess,
  requestFail,
  signOutSuccess,
  signOutFail,
  getAccessToken,
  getRefreshToken,
  changePassword,
  oauthAuthenticateUser,
  findPassword,
  signUpUser,
  existEmail,
  notExistEmail,
  authorize,
  getOauthToken,
  getRefreshOauthToken
} from "../actions";

import { checkDevelopmentMode } from "helpers/domainUtils";

import { oauthAuthenticate, postFindPassword, getCheckEmail, postSignUpUser } from 'model/auth';

//RENEWAL
import { oauthAuthorize, oauthgetaccesstoken, oauthgetrefreshaccesstoken } from 'model/auth';

import {
  saveSSOSession,
  getAuthCode,
  setAccessToken,
  removeAllInfo,
  setRefreshToken,
  getUserId,
  getRandomSHA256,
  setPCKE,
  getPCKE,
  setUserAuthenticating,
  getOauthCode,
  setOauthCode,
  getOauthAccessToken,
  setOauthAccessToken,
  setOauthRefreshToken
} from "helpers/authUtils";

import {
  AUTHORIZE_REQUEST, SIGN_OUT_USER, GET_ACCESS_TOKEN, GET_REFRESH_TOKEN, CHANGE_PASSWORD,
  OAUTH_AUTHENTICATE_USER, FIND_PASSWORD, CHECK_EMAIL, SIGNUP_USER, OAUTH_AUTHORIZE, GET_OAUTH_TOKEN, GET_REFRESH_OAUTH_TOKEN
} from "constants/actionTypes";

const KEEP_LOGIN_FLAG = -1;


function getClientId() {
  const isDevMode = checkDevelopmentMode();
  let clientId;
  const host = window.location.host.match(/[A-z0-9]+.saleslog.co/);
  if (isDevMode) {
    clientId = "dev_saleslog_root.all.fd8bbf18dd1d98d684dae3a711ada761.web";
  } else {
    if (!host) {
      clientId = "saleslog.b2c.fd8bbf18dd1d98d684dae3a711ada761.web";
    } else {
      const org = host[0].split('.')[0];
      clientId = `saleslog.${org}.fd8bbf18dd1d98d684dae3a711ada761.web`;
    }
  }
  return clientId;
}

async function createUrl(_redirectUri) {
  const endPoint = "https://oauth2sso.theklab.co/dev/oauth2/authorize";
  const grantType = 100;
  let pcke;
  pcke = await getRandomSHA256();
  setPCKE(pcke);

  const host = window.location.host.match(/[A-z0-9]+.saleslog.co/);
  const isDevMode = checkDevelopmentMode();
  let clientId;
  let redirectUri = _redirectUri;

  if (isDevMode) {
    clientId = "dev_saleslog_root.all.fd8bbf18dd1d98d684dae3a711ada761.web";
    redirectUri = "http://localhost:3000";
  } else {
    if (!host) {
      clientId = "saleslog.b2c.fd8bbf18dd1d98d684dae3a711ada761.web";
      redirectUri = "https://saleslog.co";
    } else {
      const org = host[0].split('.')[0];
      clientId = `saleslog.${org}.fd8bbf18dd1d98d684dae3a711ada761.web`;
      redirectUri = `https://${org}.saleslog.co`;
    }
  }

  const response_type = "token";
  const state = saveSSOSession();
  return `${endPoint}?grant_type=${grantType}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${response_type}&state=${state}&pcke=${pcke}`;
}

function createAccessTokenUrl() {
  const endPoint = "https://oauth2sso.theklab.co/dev/oauth2/token";
  const authCode = getAuthCode();
  const clientId = getClientId();
  const pcke = getPCKE();
  const userId = getUserId();
  const platform = 'web';
  return `${endPoint}?code=${authCode}&client_id=${clientId}&pcke=${pcke}&user_id=${userId}&platform=${platform}`;
}

function createRefreshTokenUrl() {
  const endPoint = "https://oauth2sso.theklab.co/dev/oauth2/token/refresh";
  const authCode = getAuthCode();
  const clientId = getClientId();
  const pcke = getPCKE();
  const userId = getUserId();
  const platform = 'web';
  return `${endPoint}?code=${authCode}&client_id=${clientId}&pcke=${pcke}&user_id=${userId}&platform=${platform}`;
}

async function redirect(url) {
  window.location.href = url;
}

async function fetchUrl(url) {
  const response = await fetch(url);
  return response;
}

async function fetchUrlJson(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function fetchChangePassword(email, password) {
  const endPoint = "/dev/auth2/password";
  const body = { email: email, password: password };
  const response = await fetch(endPoint, { method: "PUT", body: JSON.stringify(body) });
  return response;
}

async function setssoAccessToken(url) {
  let sigTokenRegex = new RegExp('(?!accessToken=)[A-z0-9_-]{43}(?=&)');
  let sigToken = sigTokenRegex.exec(url);
  if (sigToken) {
    localStorage.setItem('tk-sso-token', sigToken[0]);
  }
}

function* _request({ redirectUri }) {
  try {
    console.log(redirectUri);
    const url = yield call(createUrl, redirectUri);
    const response = yield call(fetchUrl, url);
    redirect(response.url);
    yield put(requestSuccess());
  } catch (error) {
    alert("로그인에 실패했습니다");
    yield put(requestFail(error.message));
  }
}

function* _signOut(history) {
  try {
    removeAllInfo();
    window.location.href = window.location.origin;
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error.message));
  }
}

function* _getAccessToken() {
  try {
    const response = yield call(fetchUrlJson, createAccessTokenUrl());
    setAccessToken(response.access_token);
    setUserAuthenticating(false);
    yield put(getAccessToken.success(response));
  } catch (error) {
    yield put(getAccessToken.error(error.message));
  }
}

function* _getRefreshToken() {
  try {
    const response = yield call(fetchUrlJson, createRefreshTokenUrl());
    setRefreshToken(response.refresh_token);
    setUserAuthenticating(false);
    yield put(getRefreshToken.success(response));
  } catch (error) {
    yield put(getRefreshToken.error(error.message));
  }
}

function* _changePassword({ payload: { email, password } }) {
  try {
    const response = yield call(fetchChangePassword, email, password);
    if (response.status === 400) {
      throw new Error("same with previous");
    }
    yield put(changePassword.success("ok"));
  } catch (error) {
    yield put(changePassword.error(error.message));
  }
}

function* _signIn({ payload: { email, password, redirectUri, clientType, state, keepSession, responseType } }) {
  try {
    let expires = keepSession ? KEEP_LOGIN_FLAG : undefined;
    console.log({ payload: { email, password, redirectUri, clientType, state, keepSession, responseType } });
    const response = yield call(oauthAuthenticate, email, password, redirectUri, clientType, state, expires, responseType);
    if (response.status !== 200) {
      yield put(oauthAuthenticateUser.error("error"));
    } else {
      setssoAccessToken(response.url);
      redirect(response.url);
      yield put(oauthAuthenticateUser.success(response.url));
    }
  } catch (error) {
    let message = "error";
    yield put(oauthAuthenticateUser.error(message));
  }
}

function* _signUp({ payload: { userType, body } }) {
  try {
    console.log(userType, body);
    const response = yield call(postSignUpUser, userType, body);
    yield put(signUpUser.success(response));
  } catch (error) {
    yield put(signUpUser.error(error.message));
  }
}

function* _checkEmail({ payload: { email } }) {
  try {
    const response = yield call(getCheckEmail, email);
    if (response.status === 404)
      yield put(notExistEmail());
    else
      yield put(existEmail());
  } catch (error) {
    yield put(notExistEmail());
  }
}

function* _findPassword({ payload: { email } }) {
  try {
    const response = yield call(postFindPassword, email);
    if (response.staus !== 200) {
      yield put();
    }
    yield put(findPassword.success());
  } catch (error) {
    yield put(findPassword.error(error));
  }
}

//RENEWAL

// function createOauthTokenUrl() {
//   const endPoint = "https://auth.theklab.co/oauth/token";
//   const authCode = getOauthCode();
//   const clientId = getClientId();
//   const pcke = getPCKE();
//   const userId = getUserId();
//   const platform = 'web';
//   return `${endPoint}?code=${authCode}&client_id=${clientId}&pcke=${pcke}&user_id=${userId}&platform=${platform}`;
// }

// async function filterAuthCode(url) {
//   let AuthCodeRegex = new RegExp('(?!code=)[A-z0-9_-]{40}(?=&)');
//   let AuthCode = AuthCodeRegex.exec(url);
//   if (AuthCode) {
//     localStorage.setItem('auth-code', AuthCode[0]);
//   }
// }

function* _OauthAuthorize({ payload: { username, password, client_id, redirect_uri, response_type, grant_type, state } }) {
  try {
    const response = yield call(oauthAuthorize, username, password, client_id, redirect_uri, response_type, grant_type, state);
    if (response.status !== 200) {
      yield put(authorize.error("error"));
    } else {
      // filterAuthCode(response.url);
      setOauthCode(response.message.code);
      console.log("3 res:::::::::::::::::::::::::::::", response.message.code);
      setUserAuthenticating(true);
      yield put(authorize.success());
    }
  } catch (error) {
    let message = "error";
    yield put(authorize.error(message));
  }
}

function* _getOauthToken({ payload: { code, client_secret, client_id, grant_type } }) {
  try {
    const response = yield call(oauthgetaccesstoken, code, client_secret, client_id, grant_type);
    // setAccessToken(response.access_token);
    console.log(response.access_token);
    setOauthAccessToken(response.access_token);
    setOauthRefreshToken(response.refresh_token);
    setUserAuthenticating(false);
    yield put(getOauthToken.success(response));
  } catch (error) {
    yield put(getOauthToken.error(error.message));
  }
}

function* _getRefreshOauthToken({ payload: { refresh_token, client_id, client_secret, grant_type } }) {
  try {
    console.log(client_secret);
    const response = yield call(oauthgetrefreshaccesstoken, refresh_token, client_id, client_secret, grant_type);
    // setAccessToken(response.access_token);
    console.log(response.access_token);
    setOauthAccessToken(response.access_token);
    setOauthRefreshToken(response.refresh_token);
    setUserAuthenticating(false);
    yield put(getRefreshOauthToken.success(response));
  } catch (error) {
    yield put(getRefreshOauthToken.error(error.message));
  }
}

export function* watchAuthorizeRequest() {
  yield takeEvery(AUTHORIZE_REQUEST, _request);
}

export function* watchSignOut() {
  yield takeEvery(SIGN_OUT_USER, _signOut);
}

export function* watchGetAccessToken() {
  yield takeEvery(GET_ACCESS_TOKEN, _getAccessToken);
}


export function* watchGetRefreshAccessToken() {
  yield takeEvery(GET_REFRESH_TOKEN, _getRefreshToken);
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, _changePassword);
}

export function* watchFindPassword() {
  yield takeEvery(FIND_PASSWORD, _findPassword);
}


export function* watchSignInUser() {
  yield takeEvery(OAUTH_AUTHENTICATE_USER, _signIn);
}

export function* watchSignUpUser() {
  yield takeEvery(SIGNUP_USER, _signUp);
}

export function* watchCheckEmail() {
  yield takeEvery(CHECK_EMAIL, _checkEmail);
}

//renewal
export function* watchOauthAuthorize() {
  yield takeEvery(OAUTH_AUTHORIZE, _OauthAuthorize);
}

export function* watchGetOauthoken() {
  yield takeEvery(GET_OAUTH_TOKEN, _getOauthToken);
}

export function* watchGetRefreshOauthoken() {
  yield takeEvery(GET_REFRESH_OAUTH_TOKEN, _getRefreshOauthToken);
}

function* authSaga() {
  yield all([
    fork(watchAuthorizeRequest),
    fork(watchSignOut),
    fork(watchGetAccessToken),
    fork(watchGetRefreshAccessToken),
    fork(watchChangePassword),
    fork(watchSignInUser),
    fork(watchFindPassword),
    fork(watchSignUpUser),
    fork(watchCheckEmail),
    fork(watchOauthAuthorize),
    fork(watchGetOauthoken),
    fork(watchGetRefreshOauthoken)

  ]);
}

export default authSaga;
