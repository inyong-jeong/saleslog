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
  GET_COMMENT_LISTS,
  POST_AUTO_SALESLOG,
  DELETE_SALESLOG,
  PUT_COUSER,
  DELETE_COUSER,
  NEEDS_TRAIN,
  NEEDS_TRAIN_LISTS,
  NEEDS_TRAIN_DEFINE,
  NEEDS_TRAIN_SAVE
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
  getCommentLists,
  postAutoSalesLog,
  deleteSalesLog,
  putCouser,
  deleteCouser,
  postNeedsTrain,
  getNeedsTrainLists,
  getNeedsTrainDefine,
  postNeedsTrainSave
} from './actions';

import {
  get_fetch,
  post_fetch,
  post_fetch_files
} from 'model/FetchManage'

import { successMessage, errorMessage, loadingMessage, hideMessage } from '../../constants/commonFunc'


//일지작성 관련

function* _postSalesLog({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch_files, 'https://backend.saleslog.co/saleslog/regi_saleslog', data);
    yield hideMessage()
    yield put(postSalesLog.success(response));
    yield successMessage('일지가 등록되었습니다.')
  } catch (error) {
    yield put(postSalesLog.error(error));
    yield errorMessage('일지가 등록에 실패했습니다.')

  }
}

function* _deleteSalesLog({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_saleslog', data);
    yield hideMessage()
    yield put(deleteSalesLog.success(response));
    yield successMessage('일지가 삭제되었습니다.')
  } catch (error) {
    yield put(deleteSalesLog.error(error));
    yield errorMessage('일지가 삭제에 실패했습니다.')

  }
}


function* _postTemporarySalesLog({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_saleslog_temp', data);
    yield hideMessage()
    yield put(postTemporarySalesLog.success(response));
    yield successMessage('일지가 임시저장 되었습니다.')

  } catch (error) {
    yield put(postTemporarySalesLog.error(error));
    yield errorMessage('일지가 임시저장에 실패했습니다.')

  }
}

function* _postAutoSalesLog({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_saleslog_temp_auto', data);
    yield put(postAutoSalesLog.success(response));
    yield successMessage('일지가 자동 임시저장 되었습니다.')
  } catch (error) {
    yield put(postAutoSalesLog.error(error));
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
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/list_saleslog', data);
    yield hideMessage()
    yield put(getLogLists.success(response));
  } catch (error) {
    yield put(getLogLists.error(error));
  }
}

function* _getLogList({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/detail_saleslog', data);
    yield hideMessage()
    yield put(getLogList.success(response));
  } catch (error) {
    yield put(getLogList.error(error));
  }
}

function* _searchLogList({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/search_saleslog', data);
    yield hideMessage()
    yield put(searchLogList.success(response));
  } catch (error) {
    yield put(searchLogList.error(error));
  }
}

function* _putSalesLog({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/upd_saleslog', data);
    yield hideMessage()
    yield put(putSalesLog.success(response));
    yield successMessage('일지가 수정되었습니다.')

  } catch (error) {
    yield put(putSalesLog.error(error));
    yield errorMessage('일지수정에 실패했습니다.')

  }
}

function* _putFile({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch_files, 'https://backend.saleslog.co/saleslog/upd_saleslog_file', data);
    yield hideMessage()
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
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_saleslog_file', data);
    yield hideMessage()

    yield put(deleteFile.success(response));
  } catch (error) {
    yield put(deleteFile.error(error));
  }
}

//피드백 관련

function* _postComment({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_feedback', data);
    yield hideMessage()
    yield put(postComment.success(response));
  } catch (error) {
    yield put(postComment.error(error));
  }
}
function* _putComment({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/upd_feedback', data);
    yield hideMessage()
    yield put(putComment.success(response));
  } catch (error) {
    yield put(putComment.error(error));
  }
}
function* _deleteComment({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_feedback', data);
    yield hideMessage()
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

//공동작성자 관련
function* _putCouser({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/regi_saleslog_cousers', data);
    yield hideMessage()
    yield put(putCouser.success(response));
  } catch (error) {
    yield put(putCouser.error(error));
  }
}
function* _deleteCouser({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/del_saleslog_cousers', data);
    yield hideMessage()
    yield put(deleteCouser.success(response));
  } catch (error) {
    yield put(deleteCouser.error(error));
  }
}

//니즈 학습

function* _postNeedsTrain({ payload: { data } }) {
  try {
    yield loadingMessage()
    console.log(data);
    const response = yield call(post_fetch, 'https://backend.saleslog.co/needs/regi_needs_learning', data);
    console.log(response)
    yield hideMessage()
    yield put(postNeedsTrain.success(response));
    yield successMessage('학습요청이 성공되었습니다')
  } catch (error) {
    yield put(postNeedsTrain.error(error));
    yield errorMessage('학습요청이 실패하였습니다. 문장 및 선택한 키워드를 확인해주세요')

  }
}

function* _getNeedsTrainLists({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/needs/list_needs_learning', data);
    yield hideMessage()
    yield put(getNeedsTrainLists.success(response));
  } catch (error) {
    yield put(getNeedsTrainLists.error(error));
  }
}

function* _getNeedsDefine({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/needs/detail_needs_noun', data);
    yield hideMessage()
    yield put(getNeedsTrainDefine.success(response));
  } catch (error) {
    yield put(getNeedsTrainDefine.error(error));
  }
}

function* _postNeedsSave({ payload: { data } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, 'https://backend.saleslog.co/needs/regi_needs_noun', data);
    yield hideMessage()
    yield put(postNeedsTrainSave.success(response));
    yield successMessage('저장이 성공되었습니다')
  } catch (error) {
    yield put(postNeedsTrainSave.error(error));
    yield errorMessage('저장이 실패되었습니다')

  }
}



//일지작성 관련

export function* watchPostSalesLog() {
  yield takeEvery(POST_SALESLOG, _postSalesLog);
}

export function* watchDeleteSalesLog() {
  yield takeEvery(DELETE_SALESLOG, _deleteSalesLog);
}


export function* watchPostTemporarySalesLog() {
  yield takeEvery(POST_TEMPORARY_SALESLOG, _postTemporarySalesLog);
}

export function* watchPostAutoSalesLog() {
  yield takeEvery(POST_AUTO_SALESLOG, _postAutoSalesLog);
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

//공동작성자
export function* watchputCouser() {
  yield takeEvery(PUT_COUSER, _putCouser);
}
export function* watchdeleteCouser() {
  yield takeEvery(DELETE_COUSER, _deleteCouser);
}

//니즈 학습
export function* watchpostNeedsTrain() {
  yield takeEvery(NEEDS_TRAIN, _postNeedsTrain);
}
export function* watchgetNeedsTrainLists() {
  yield takeEvery(NEEDS_TRAIN_LISTS, _getNeedsTrainLists);
}
export function* watchgetNeedsDefine() {
  yield takeEvery(NEEDS_TRAIN_DEFINE, _getNeedsDefine);
}
export function* watchpostNeedsSave() {
  yield takeEvery(NEEDS_TRAIN_SAVE, _postNeedsSave);
}



function* salesLogSaga() {
  yield all([
    //일지작성 관련
    fork(watchPostSalesLog),
    fork(watchDeleteSalesLog),
    fork(watchPostTemporarySalesLog),
    fork(watchPostAutoSalesLog),
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
    //공동작성자 관련
    fork(watchputCouser),
    fork(watchdeleteCouser),
    //니즈학습
    fork(watchpostNeedsTrain),
    fork(watchgetNeedsTrainLists),
    fork(watchgetNeedsDefine),
    fork(watchpostNeedsSave),

  ]);
}

export default salesLogSaga;
