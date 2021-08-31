// @flow
import { all, call, fork, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  POST_SALESLOG,
  POST_TEMPORARY_SALESLOG
} from '../../constants/actionTypes';

import {
  postSalesLog,

} from './actions';

import {
  post_fetch,
  post_fetch_files
} from 'model/FetchManage'


function* _postSalesLog({ payload: { data } }) {
  try {
    const response = yield call(post_fetch_files, 'https://backend.saleslog.co/saleslog/regi_saleslog', data);
    yield put(postSalesLog.success(response));
  } catch (error) {
    yield put(postSalesLog.error(error));
  }
}

function* _postTemporarySalesLog({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_saleslog_temp', data);
    yield put(postSalesLog.success(response));
  } catch (error) {
    yield put(postSalesLog.error(error));
  }
}

export function* watchPostSalesLog() {
  yield takeEvery(POST_SALESLOG, _postSalesLog);
}

export function* watchPostTemporarySalesLog() {
  yield takeEvery(POST_TEMPORARY_SALESLOG, _postTemporarySalesLog);
}

function* salesLogSaga() {
  yield all([
    fork(watchPostSalesLog),
    fork(watchPostTemporarySalesLog),


  ]);
}

export default salesLogSaga;
