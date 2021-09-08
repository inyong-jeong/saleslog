// @flow
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {

  authorize,
  getOauthToken,
  getRefreshOauthToken,
  postAuthNumber,
  postRegisteration,
  postInvite,
  postInviteRegistration,
  postWorkGroup,
  checkAccessToken
} from "../actions";

//RENEWAL
import {
  oauthAuthorize, oauthgetaccesstoken, oauthgetrefreshaccesstoken,
  postAuthorizationNumber, postClientRegisteration, postInviteEmail, postInviteRegister,
  postWorkGroupmodel
} from 'model/auth';

import { get_fetch, check_fetch, post_fetch } from 'model/FetchManage'
import {
  setUserAuthenticating,
  setOauthCode,
  setOauthAccessToken,
  setOauthRefreshToken,
} from "helpers/authUtils";

import {
  OAUTH_AUTHORIZE,
  GET_OAUTH_TOKEN, GET_REFRESH_OAUTH_TOKEN, POST_AUTHNUMBER, POST_REGISTRATION, POST_INVITE, POST_INVITE_REGISTRATION,
  POST_WORKGROUP, CHECK_ACCESS_TOKEN
} from "constants/actionTypes";

//RENEWAL

function* _OauthAuthorize({ payload: { username, password, client_id, redirect_uri, response_type, grant_type, state } }) {
  try {
    const response = yield call(oauthAuthorize, username, password, client_id, redirect_uri, response_type, grant_type, state);
    console.log(response);
    setOauthCode(response.message.code);
    setUserAuthenticating(true);
    yield put(authorize.success(response));

  } catch (error) {
    const message = "error";
    yield put(authorize.error(message));
  }
}

function* _getOauthToken({ payload: { code, client_secret, client_id, grant_type } }) {
  try {
    const response = yield call(oauthgetaccesstoken, code, client_secret, client_id, grant_type);
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
    setOauthAccessToken(response.access_token);
    setOauthRefreshToken(response.refresh_token);
    setUserAuthenticating(false);
    yield put(getRefreshOauthToken.success(response));
  } catch (error) {
    yield put(getRefreshOauthToken.error(error.message));
  }
}

function* _postAuthNumber({ payload: { email } }) {
  try {
    const response = yield call(postAuthorizationNumber, email);
    yield put(postAuthNumber.success(response));
  } catch (error) {
    yield put(postAuthNumber.error(error.message));
  }
}

function* _postRegistration({ payload: { useremail, password, firstname, lastname } }) {
  try {
    const response = yield call(postClientRegisteration, useremail, password, firstname, lastname);
    console.log(response);
    yield put(postRegisteration.success(response));
  } catch (error) {
    yield put(postRegisteration.error(error.message));
  }
}

function* _postInvite({ payload: { login_id, invite_email, permission } }) {
  try {
    const response = yield call(postInviteEmail, login_id, invite_email, permission);
    yield put(postInvite.success(response));
  } catch (error) {
    yield put(postInvite.error(error.message));
  }
}

function* _postInviteRegistration({ payload: { user_email, invite_code, user_name, user_password, use_name } }) {
  try {
    const response = yield call(postInviteRegister, user_email, invite_code, user_name, user_password, use_name);
    yield put(postInviteRegistration.success(response));
  } catch (error) {
    yield put(postInviteRegistration.error(error.message));
  }
}


function* _postWorkGroup({ payload: { user_email, comp_name, comp_domain } }) {
  try {
    const response = yield call(postWorkGroupmodel, user_email, comp_name, comp_domain);
    yield put(postWorkGroup.success(response));
  } catch (error) {
    yield put(postWorkGroup.error(error.message));
  }
}

function* _checkAccessToken() {
  try {
    const response = yield call(check_fetch, 'https://backend.saleslog.co/secure');
    yield put(checkAccessToken.success(response));
  } catch (error) {
    yield put(checkAccessToken.error(error));
    console.log(error)
  }
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

export function* watchPostAuthNumber() {
  yield takeEvery(POST_AUTHNUMBER, _postAuthNumber);
}
export function* watchPostRegistration() {
  yield takeEvery(POST_REGISTRATION, _postRegistration);
}
export function* watchPostInvite() {
  yield takeEvery(POST_INVITE, _postInvite);
}
export function* watchPostInviteRegistration() {
  yield takeEvery(POST_INVITE_REGISTRATION, _postInviteRegistration);
}
export function* watchPostWorkGroup() {
  yield takeEvery(POST_WORKGROUP, _postWorkGroup);
}

//토큰 만료 확인

export function* watchCheckAccessToken() {
  yield takeEvery(CHECK_ACCESS_TOKEN, _checkAccessToken);
}

function* authSaga() {
  yield all([
    fork(watchOauthAuthorize),
    fork(watchGetOauthoken),
    fork(watchGetRefreshOauthoken),
    fork(watchPostAuthNumber),
    fork(watchPostRegistration),
    fork(watchPostInvite),
    fork(watchPostInviteRegistration),
    fork(watchPostWorkGroup),
    //토큰만료 확인
    fork(watchCheckAccessToken),


  ]);
}

export default authSaga;
