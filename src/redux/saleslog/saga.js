// @flow
import { all, call, fork, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  POST_SALESLOG,
  POST_TEMPORARY_SALESLOG,
  SELECT_USER_LIST,
  GET_TEMPORARY_LISTS,
  GET_TEMPORARY_LIST,
  DELETE_TEMPORARY_LOG
} from '../../constants/actionTypes';

import {
  postSalesLog,
  postTemporarySalesLog,
  getUserList,
  getTemporaryLogLists,
  getTemporaryLogList,
  deleteTemporaryLogList
} from './actions';

import {
  get_fetch,
  post_fetch,
  post_fetch_files
} from 'model/FetchManage'


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
    // console.log('1111111111111111', data)
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
    yield console.log('res:::::::::::::', response);
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

function* salesLogSaga() {
  yield all([
    fork(watchPostSalesLog),
    fork(watchPostTemporarySalesLog),
    fork(watchGetUserList),
    fork(watchGetTemporaryLogLists),
    fork(watchGetTemporaryLogList),
    fork(watchDeleteTemporaryLogList),
  ]);
}

export default salesLogSaga;
