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
  checkAccessToken,
  postCheckIsRegistered,
  findPassword,
  changePassword
} from "../actions";

//RENEWAL
import {
  oauthAuthorize, oauthgetaccesstoken, oauthgetrefreshaccesstoken,
  postAuthorizationNumber, postClientRegisteration, postInviteEmail, postInviteRegister,
  postWorkGroupmodel, postFindPassword, postChangePassword
} from 'model/auth';

import { check_fetch, post_fetch_no_token } from 'model/FetchManage'
import {
  setUserAuthenticating,
  setOauthCode,
  setOauthAccessToken,
  setOauthRefreshToken,
} from "helpers/authUtils";

import {
  OAUTH_AUTHORIZE,
  GET_OAUTH_TOKEN,
  GET_REFRESH_OAUTH_TOKEN,
  POST_AUTHNUMBER,
  POST_REGISTRATION,
  POST_INVITE,
  POST_INVITE_REGISTRATION,
  POST_WORKGROUP,
  CHECK_ACCESS_TOKEN,
  POST_CHECK_IS_REGISTERED,
  FIND_PASSWORD,
  CHANGE_PASSWORD
} from "constants/actionTypes";
import { errorMessage, hideMessage, loadingMessage } from "../../constants/commonFunc";

const REGISTER_CHECK_URL = 'https://auth.theklab.co/login/check_user_invite'
//Res 값 체크 (invalid_grant)
function _oauthResCheck(res) {
  if (res.error && res.error == "invalid_grant") {
    return false;
  } else {
    return true;
  }
}

function* _postCheckIsRegistered({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch_no_token, REGISTER_CHECK_URL, body)
    yield hideMessage()
    yield put(postCheckIsRegistered.success(response))

  }
  catch (error) {
    yield put(postCheckIsRegistered.error(error))
  }

}


function* _OauthAuthorize({ payload: { username, password, client_id, redirect_uri, response_type, grant_type, state, scope } }) {
  try {
    yield loadingMessage()
    const response = yield call(oauthAuthorize, username, password, client_id, redirect_uri, response_type, grant_type, state, scope);
    console.log('* _OauthAuthorize ::', response);
    setOauthCode(response.message.code);
    setUserAuthenticating(true);
    yield hideMessage()
    yield put(authorize.success(response));

  } catch (error) {
    const message = "error";
    yield put(authorize.error(message));
    console.log('* _OauthAuthorize error::', error);
  }
}

function* _getOauthToken({ payload: { code, client_secret, client_id, grant_type } }) {
  try {

    let response = yield call(oauthgetaccesstoken, code, client_secret, client_id, grant_type);
    if (yield _oauthResCheck(response)) {
      yield setOauthAccessToken(response.access_token);
      yield setOauthRefreshToken(response.refresh_token);
      yield setUserAuthenticating(false);
      yield put(getOauthToken.success(response));
      return;
    } else {

      // 오류가 떨어지면 2회 반복 로그인 시도
      for (let i = 0; i < 2; i++) {
        response = yield call(oauthgetaccesstoken, code, client_secret, client_id, grant_type);
        if (yield _oauthResCheck(response)) {
          yield setOauthAccessToken(response.access_token);
          yield setOauthRefreshToken(response.refresh_token);
          yield setUserAuthenticating(false);
          yield put(getOauthToken.success(response));
          return;
          //break;
        }


      }
      yield put(getOauthToken.error(response.error));
    }


  } catch (error) {
    yield put(getOauthToken.error(error.message));
  }
}

function* _getRefreshOauthToken({ payload: { refresh_token, client_id, client_secret, grant_type } }) {
  try {
    console.log(client_secret);
    const response = yield call(oauthgetrefreshaccesstoken, refresh_token, client_id, client_secret, grant_type);
    yield setOauthAccessToken(response.access_token);
    yield setOauthRefreshToken(response.refresh_token);
    yield setUserAuthenticating(false);
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

function* _postRegistration({ payload: { useremail, password, user_name } }) {
  try {
    console.log('_postRegistration::::', user_name)
    const response = yield call(postClientRegisteration, useremail, password, user_name);
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
    loadingMessage()
    const response = yield call(postInviteRegister, user_email, invite_code, user_name, user_password, use_name);
    yield hideMessage()
    yield put(postInviteRegistration.success(response));

  } catch (error) {
    yield put(postInviteRegistration.error(error.message));
    yield put(errorMessage('유효하지 않은 가입 경로입니다.'))

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
    //yield console.log('엑세스 토큰 체크::::::::::::::::')
    const response = yield call(check_fetch, 'https://backend.saleslog.co/secure');
    yield put(checkAccessToken.success(response));
  } catch (error) {
    yield put(checkAccessToken.error(error));
    console.log(error)
  }
}

function* _postFindPassword({ payload: { email } }) {
  try {
    const response = yield call(postFindPassword, email);
    yield put(findPassword.success(response));
  } catch (error) {
    yield put(findPassword.error(error));
    console.log(error)
  }
}

function* _postChangePassword({ payload: { code, email, password } }) {
  try {
    const response = yield call(postChangePassword, code, email, password);
    console.log(response);
    yield put(changePassword.success(response));
  } catch (error) {
    yield put(changePassword.error(error));
    console.log(error)
  }
}
//renewal

export function* wawtchPostCheckIsRegistered() {
  yield takeEvery(POST_CHECK_IS_REGISTERED, _postCheckIsRegistered)
}
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

//비번 찾기

export function* watchPostFindPassword() {
  yield takeEvery(FIND_PASSWORD, _postFindPassword);
}

//비번 변경

export function* watchPostChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, _postChangePassword);
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
    fork(wawtchPostCheckIsRegistered),
    //토큰만료 확인
    fork(watchCheckAccessToken),
    //비밀번호 찾기
    fork(watchPostFindPassword),
    //비밀번호 변경
    fork(watchPostChangePassword),

  ]);
}


export default authSaga;
