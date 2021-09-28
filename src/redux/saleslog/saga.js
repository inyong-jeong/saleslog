// @flow
import { all, call, fork, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  POST_SALESLOG,
  POST_TEMPORARY_SALESLOG,
  SELECT_USER_LIST,
  GET_TEMPORARY_LISTS,
  GET_TEMPORARY_LIST,
  DELETE_TEMPORARY_LOG,
  GET_SALESLOGS,
  GET_SALESLOG,
  SEARCH_SALESLOG_LIST,
  PUT_SALESLOG,
  PUT_FILE,
  DELETE_FILE,
  POST_COMMENT,
  PUT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LISTS
} from '../../constants/actionTypes';

import {
  postSalesLog,
  postTemporarySalesLog,
  getUserList,
  getTemporaryLogLists,
  getTemporaryLogList,
  deleteTemporaryLogList,
  getLogLists,
  getLogList,
  searchLogList,
  putSalesLog,
  putFile,
  deleteFile,
  postComment,
  putComment,
  deleteComment,
  getCommentLists
} from './actions';

import {
  get_fetch,
  post_fetch,
  post_fetch_files
} from 'model/FetchManage'

import { successMessage, errorMessage } from '../../constants/commonFunc'


//일지작성 관련

function* _postSalesLog({ payload: { data } }) {
  try {
    console.log(data)
    const response = yield call(post_fetch_files, 'https://backend.saleslog.co/saleslog/regi_saleslog', data);
    console.log(response)
    yield put(postSalesLog.success(response));
  } catch (error) {
    yield put(postSalesLog.error(error));
  }
}

function* _postTemporarySalesLog({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_saleslog_temp', data);
    yield put(postTemporarySalesLog.success(response));
  } catch (error) {
    yield put(postTemporarySalesLog.error(error));
  }
}

function* _getUserList({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/org/search_users', data);

    yield put(getUserList.success(response));
  } catch (error) {
    yield put(getUserList.error(error));
  }
}

function* _getTemporaryLogLists() {
  try {
    const response = yield call(get_fetch, 'https://backend.saleslog.co/saleslog/list_saleslog_temp');
    yield put(getTemporaryLogLists.success(response));
  } catch (error) {
    yield put(getTemporaryLogLists.error(error));
  }
}

function* _getTemporaryLogList({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/detail_saleslog_temp', data);
    yield put(getTemporaryLogList.success(response));
  } catch (error) {
    yield put(getTemporaryLogList.error(error));
  }
}

function* _deleteTemporaryLogList({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_saleslog_temp', data);
    yield put(deleteTemporaryLogList.success(response));
  } catch (error) {
    yield put(deleteTemporaryLogList.error(error));
  }
}

//영업일지 관련
function* _getLogLists({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/list_saleslog', data);
    yield put(getLogLists.success(response));
  } catch (error) {
    yield put(getLogLists.error(error));
  }
}

function* _getLogList({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/detail_saleslog', data);
    yield put(getLogList.success(response));
  } catch (error) {
    yield put(getLogList.error(error));
  }
}

function* _searchLogList({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/search_saleslog', data);
    console.log(response)
    yield put(searchLogList.success(response));
  } catch (error) {
    yield put(searchLogList.error(error));
  }
}

function* _putSalesLog({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/upd_saleslog', data);
    yield put(putSalesLog.success(response));
  } catch (error) {
    yield put(putSalesLog.error(error));
  }
}

function* _putFile({ payload: { data } }) {
  try {

    console.log(1111)
    const response = yield call(post_fetch_files, 'https://backend.saleslog.co/saleslog/upd_saleslog_file', data);
    yield put(putFile.success(response));
    yield successMessage(response.message)

  } catch (error) {
    yield put(putFile.error(error));
    // yield errorMessage(error.message)
    yield window.alert(error.message)
  }
}


function* _deleteFile({ payload: { data } }) {
  try {
    console.log(22222)
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_saleslog_file', data);
    yield put(deleteFile.success(response));
  } catch (error) {
    yield put(deleteFile.error(error));
  }
}

//피드백 관련

function* _postComment({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_feedback', data);
    yield put(postComment.success(response));
  } catch (error) {
    yield put(postComment.error(error));
  }
}
function* _putComment({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/upd_feedback', data);
    yield put(putComment.success(response));
  } catch (error) {
    yield put(putComment.error(error));
  }
}
function* _deleteComment({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_feedback', data);
    yield put(deleteComment.success(response));
  } catch (error) {
    yield put(deleteComment.error(error));
  }
}
function* _getCommentLists({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/list_feedback', data);
    yield put(getCommentLists.success(response));
  } catch (error) {
    yield put(getCommentLists.error(error));
  }
}


//일지작성 관련

export function* watchPostSalesLog() {
  yield takeEvery(POST_SALESLOG, _postSalesLog);
}

export function* watchPostTemporarySalesLog() {
  yield takeEvery(POST_TEMPORARY_SALESLOG, _postTemporarySalesLog);
}

export function* watchGetUserList() {
  yield takeEvery(SELECT_USER_LIST, _getUserList);
}

export function* watchGetTemporaryLogLists() {
  yield takeEvery(GET_TEMPORARY_LISTS, _getTemporaryLogLists);
}

export function* watchGetTemporaryLogList() {
  yield takeEvery(GET_TEMPORARY_LIST, _getTemporaryLogList);
}

export function* watchDeleteTemporaryLogList() {
  yield takeEvery(DELETE_TEMPORARY_LOG, _deleteTemporaryLogList);
}

//영업일지 관련

export function* watchgetLogLists() {
  yield takeEvery(GET_SALESLOGS, _getLogLists);
}

export function* watchgetLogList() {
  yield takeEvery(GET_SALESLOG, _getLogList);
}

export function* watchsearchLogList() {
  yield takeEvery(SEARCH_SALESLOG_LIST, _searchLogList);
}

export function* watchputSalesLog() {
  yield takeEvery(PUT_SALESLOG, _putSalesLog);
}

export function* watchputFile() {
  yield takeEvery(PUT_FILE, _putFile);
}

export function* watchdeleteFile() {
  yield takeEvery(DELETE_FILE, _deleteFile);
}

//피드백 

export function* watchpostComment() {
  yield takeEvery(POST_COMMENT, _postComment);
}
export function* watchputComment() {
  yield takeEvery(PUT_COMMENT, _putComment);
}
export function* watchdeleteComment() {
  yield takeEvery(DELETE_COMMENT, _deleteComment);
}
export function* watchgetCommentLists() {
  yield takeEvery(GET_COMMENT_LISTS, _getCommentLists);
}

function* salesLogSaga() {
  yield all([
    //일지작성 관련
    fork(watchPostSalesLog),
    fork(watchPostTemporarySalesLog),
    fork(watchGetUserList),
    fork(watchGetTemporaryLogLists),
    fork(watchGetTemporaryLogList),
    fork(watchDeleteTemporaryLogList),
    //영업일지 관련
    fork(watchgetLogLists),
    fork(watchgetLogList),
    fork(watchsearchLogList),
    fork(watchputSalesLog),
    fork(watchputFile),
    fork(watchdeleteFile),
    //피드백 관련
    fork(watchpostComment),
    fork(watchputComment),
    fork(watchdeleteComment),
    fork(watchgetCommentLists),

  ]);
}

export default salesLogSaga;
