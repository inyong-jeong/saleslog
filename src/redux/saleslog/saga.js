// @flow
import { all, call, fork, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  POST_SALESLOG,
  PUT_SALESLOG,
  GET_SALESLOG,
  GET_SALESLOGS,
  GET_NOTABLE_SALESLOGS,
  PUT_NOTABLE_SALESLOG,
  GET_SALESLOG_COMMENT,
  DELETE_SALESLOG,
  POST_COMMENT,
  GET_SALESLOG_FILE,
  POST_SALESLOG_FILE,
  SEARCH_SALESLOG,
  GET_SEARCH_SALESLOG,
  PUT_SALESLOG_COUSER,
  PUT_SALESLOG_GUIDE,
  DELETE_SALESLOG_GUIDE,
  GET_SALESLOG_NEEDS

} from '../../constants/actionTypes';

import {
  postSalesLog,
  putSalesLog,
  getSalesLog,
  getSalesLogs,
  getNotableSalesLogs,
  putNotableSalesLog,
  concatLog,
  getSalesLogComments,
  postComments,
  deleteSalesLog,
  getSalesLogFile,
  postSalesLogFile,
  updateSearchedSalesLogSuccess,
  getsearchsalesLog,
  putSalesLogCoUser,
  putSalesLogGuide,
  deleteSalesLogGuide,
  getSalesLogNeeds
} from './actions';

import {
  postSalesLogCall,
  putSalesLogCall,
  getSalesLogsCall,
  getNotableSalesLogsCall,
  putNotableSalesLogCall,
  getSalesLogCall,
  getSalesLogFileCall,
  deleteSalesLogCall,
  postSalesLogFileCall,
  getsearchsalesLogcall,
  putSalesLogCoUserCall,
  putSalesLogGuideCall,
  deleteSalesLogGuideCall,
  getSalesLogNeedsCall
} from 'model/saleslog';

import {
  getSalesLogCommentsCall,
  postCommentsCall
} from 'model/comments';

function* _postSalesLog({ payload: { body } }) {
  try {
    const response = yield call(postSalesLogCall, body);
    yield put(postSalesLog.success(response));
  } catch (error) {
    yield put(postSalesLog.error(error));
  }
}


function* _putSalesLog({ payload: { id, body, editFlag } }) {
  try {
    const response = yield call(putSalesLogCall, id, body, editFlag);
    yield put(putSalesLog.success(response));
  } catch (error) {
    yield put(putSalesLog.error(error));
  }
}

function* _getSalesLogs({ payload: { params, concat } }) {
  try {
    const response = yield call(getSalesLogsCall, params);
    if (concat)
      yield put(concatLog(response));
    else
      yield put(getSalesLogs.success(response));
  } catch (error) {
    yield put(getSalesLogs.error(error));
  }
}

function* _getNotableSalesLogs({ payload: { page } }) {
  try {
    const response = yield call(getNotableSalesLogsCall, page);
    yield put(getNotableSalesLogs.success(response));
  } catch (error) {
    yield put(getNotableSalesLogs.error(error));
  }
}

function* _putNotableSalesLog({ payload: { id, flag } }) {
  try {
    const response = yield call(putNotableSalesLogCall, id, flag);
    yield put(putNotableSalesLog.success(response));
  } catch (error) {
    yield put(putNotableSalesLog.error(error));
  }
}

function* _getSalesLog({ payload: { id } }) {
  try {
    const response = yield call(getSalesLogCall, id);
    yield put(getSalesLog.success(response));
  } catch (error) {
    yield put(getSalesLog.error(error));
  }
}

function* _getSalesLogFile({ payload: { id, fileName } }) {
  try {
    const response = yield call(getSalesLogFileCall, id, fileName);
    yield put(getSalesLogFile.success(response));
  } catch (error) {
    yield put(getSalesLogFile.error(error));
  }
}


function* _deleteSalesLog({ payload: { id } }) {
  try {
    const response = yield call(deleteSalesLogCall, id);
    yield put(deleteSalesLog.success(response));
  } catch (error) {
    yield put(deleteSalesLog.error(error));
  }
}

function* _getSalesLogComments({ payload: { id } }) {
  try {
    const response = yield call(getSalesLogCommentsCall, id);
    yield put(getSalesLogComments.success(response.body));
  } catch (error) {
    yield put(getSalesLogComments.error(error));
  }
}

function* _postComments({ payload: { comments } }) {
  try {
    const response = yield call(postCommentsCall, comments);
    yield put(postComments.success(response));
  } catch (error) {
    yield put(postComments.error(error));
  }
}

function* _postSalesLogFile({ payload: { fileName, fileType, id, file } }) {
  try {
    const response = yield call(postSalesLogFileCall, fileName, fileType, id, file);
    yield put(postSalesLogFile.success(response));
  } catch (error) {
    yield put(postSalesLogFile.error(error));
  }
}

function* _searchSalesLog({ payload: { salesLogList, keywords } }) {
  let filtered = [];

  for (const index in salesLogList) {
    const log = salesLogList[index];
    if (log.title.match(keywords) || log.log.match(keywords)) {
      filtered.push(log);
    }
  }
  yield put(updateSearchedSalesLogSuccess(filtered));
}

function* _getSearchSalesLog({ payload: { keyword } }) {
  try {
    const response = yield call(getsearchsalesLogcall, keyword);
    yield put(getsearchsalesLog.success(response));
  } catch (error) {
    yield put(getsearchsalesLog.error(error));
  }
}

function* _putSalesLogCoUser({ payload: { id, user_id } }) {
  try {
    yield alert("공동작성자가 추가되었습니다.");
    const response = yield call(putSalesLogCoUserCall, id, user_id);
    yield put(putSalesLogCoUser.success(response));
  } catch (error) {
    yield put(putSalesLogCoUser.error(error));
  }
}

function* _putSalesLogGuide({ payload: { id, body } }) {
  try {
    const response = yield call(putSalesLogGuideCall, id, body);
    yield put(putSalesLogGuide.success(response));
  } catch (error) {
    yield put(putSalesLogGuide.error(error));
  }
}

function* _deleteSalesLogGuide({ payload: { id, needs_type, guide_type, index } }) {
  try {
    const response = yield call(deleteSalesLogGuideCall, id, needs_type, guide_type, index);
    yield put(deleteSalesLogGuide.success(response));
  } catch (error) {
    yield put(deleteSalesLogGuide.error(error));
  }
}

function* _getSalesLogNeeds({ payload: { needs, fromDate, toDate } }) {
  try {
    const response = yield call(getSalesLogNeedsCall, needs, fromDate, toDate);
    yield put(getSalesLogNeeds.success(response));
  } catch (error) {
    yield put(getSalesLogNeeds.error(error));
  }
}

export function* watchPostSalesLog() {
  yield takeEvery(POST_SALESLOG, _postSalesLog);
}

export function* watchPutSalesLog() {
  yield takeEvery(PUT_SALESLOG, _putSalesLog);
}

export function* watchGetSalesLogs() {
  yield takeEvery(GET_SALESLOGS, _getSalesLogs);
}

export function* watchGetSalesLog() {
  yield takeLeading(GET_SALESLOG, _getSalesLog);
}

export function* watchGetSalesLogFile() {
  yield takeLeading(GET_SALESLOG_FILE, _getSalesLogFile);
}

export function* watchGetNotableSalesLogs() {
  yield takeEvery(GET_NOTABLE_SALESLOGS, _getNotableSalesLogs);
}

export function* watchPutNotableSalesLog() {
  yield takeEvery(PUT_NOTABLE_SALESLOG, _putNotableSalesLog);
}

export function* watchDeleteSalesLog() {
  yield takeEvery(DELETE_SALESLOG, _deleteSalesLog);
}

export function* watchGetSalesLogComments() {
  yield takeEvery(GET_SALESLOG_COMMENT, _getSalesLogComments);
}

export function* watchPostComments() {
  yield takeLeading(POST_COMMENT, _postComments);
}

export function* watchPostSalesLogFile() {
  yield takeLeading(POST_SALESLOG_FILE, _postSalesLogFile);
}

export function* watchSearchSalesLog() {
  yield takeLeading(SEARCH_SALESLOG, _searchSalesLog);
}

export function* watchGetSearchSalesLog() {
  yield takeLeading(GET_SEARCH_SALESLOG, _getSearchSalesLog);
}

export function* watchPutSalesLogCoUser() {
  yield takeLeading(PUT_SALESLOG_COUSER, _putSalesLogCoUser);
}

export function* watchPutSalesLogGuide() {
  yield takeLeading(PUT_SALESLOG_GUIDE, _putSalesLogGuide);
}

export function* watchdeleteSalesLogGuide() {
  yield takeLeading(DELETE_SALESLOG_GUIDE, _deleteSalesLogGuide);
}

export function* watchgetSalesLogNeeds() {
  yield takeLeading(GET_SALESLOG_NEEDS, _getSalesLogNeeds);
}

function* salesLogSaga() {
  yield all([
    fork(watchPostSalesLog),
    fork(watchPutSalesLog),
    fork(watchGetSalesLogs),
    fork(watchGetSalesLog),
    fork(watchGetSalesLogFile),
    fork(watchGetNotableSalesLogs),
    fork(watchPutNotableSalesLog),
    fork(watchDeleteSalesLog),
    fork(watchGetSalesLogComments),
    fork(watchPostComments),
    fork(watchPostSalesLogFile),
    fork(watchSearchSalesLog),
    fork(watchGetSearchSalesLog),
    fork(watchPutSalesLogCoUser),
    fork(watchPutSalesLogGuide),
    fork(watchdeleteSalesLogGuide),
    fork(watchgetSalesLogNeeds)
  ]);
}

export default salesLogSaga;
