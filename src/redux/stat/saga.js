// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  GET_STAT_TYPE1,
  GET_STAT_TYPE2,
  GET_STAT_TYPE3,
  GET_STAT_TYPE4,
  GET_STAT_TYPE5,
  GET_DASHBOARD_STAT,
  GET_SALES_LOG_SHEET
} from 'constants/actionTypes';


import {
  getStatType1,
  getStatType2,
  getStatType3,
  getStatType4,
  getStatType5,
  getDashBoardStat,
  getSalesLogSheet
} from './actions';

import {
  getDashBoardStatCall,
  getStatType1Call,
  getStatType2Call,
  getStatType3Call,
  getStatType4Call,
  getStatType5Call,
  getSalesLogSheetCall
} from 'model/stat';


function* _getStatType1({ payload: { type, fromDate, toDate } }) {
  try {
    const response = yield call(getStatType1Call, type, fromDate, toDate);
    yield put(getStatType1.success(response));
  } catch (error) {
    yield put(getStatType1.error(error));
  }
}

function* _getStatType2({ payload: { type, fromDate, toDate } }) {
  try {
    const response = yield call(getStatType2Call, type, fromDate, toDate);
    yield put(getStatType2.success(response));
  } catch (error) {
    yield put(getStatType2.error(error));
  }
}

function* _getStatType3({ payload: { type, fromDate, toDate } }) {
  try {
    const response = yield call(getStatType3Call, type, fromDate, toDate);
    yield put(getStatType3.success(response));

  } catch (error) {
    yield put(getStatType3.error(error));
  }
}

function* _getStatType4({ payload: { type, fromDate, toDate } }) {
  try {
    console.log(type);
    const response = yield call(getStatType4Call, type, fromDate, toDate);
    console.log(response)
    yield put(getStatType4.success(response));

  } catch (error) {
    yield put(getStatType4.error(error));
  }
}

function* _getStatType5({ payload: { type, fromDate, toDate } }) {
  try {
    const response = yield call(getStatType5Call, type, fromDate, toDate);
    yield put(getStatType5.success(response));

  } catch (error) {
    yield put(getStatType5.error(error));
  }
}

function* _getDashBoardStat({ payload: { fromDate, toDate } }) {
  try {
    const response = yield call(getDashBoardStatCall, fromDate, toDate);
    yield put(getDashBoardStat.success(response));
  } catch (error) {
    yield put(getDashBoardStat.error(error.message));
  }
}

function* _getSalesLogSheet({ payload: { year, month } }) {
  try {
    const response = yield call(getSalesLogSheetCall, year, month);
    yield put(getSalesLogSheet.success(response));
  } catch (error) {
    yield put(getSalesLogSheet.error(error.message));
  }
}

export function* watchGetDashBoardStat() {
  yield takeEvery(GET_DASHBOARD_STAT, _getDashBoardStat);
}

export function* watchGetStatType1() {
  yield takeEvery(GET_STAT_TYPE1, _getStatType1);
}

export function* watchGetStatType2() {
  yield takeEvery(GET_STAT_TYPE2, _getStatType2);
}

export function* watchGetStatType3() {
  yield takeEvery(GET_STAT_TYPE3, _getStatType3);
}

export function* watchGetStatType4() {
  yield takeEvery(GET_STAT_TYPE4, _getStatType4);
}

export function* watchGetStatType5() {
  yield takeEvery(GET_STAT_TYPE5, _getStatType5);
}

export function* watchGetSalesLogSheet() {
  yield takeEvery(GET_SALES_LOG_SHEET, _getSalesLogSheet);
}

function* statSaga() {
  yield all([
    fork(watchGetDashBoardStat),
    fork(watchGetStatType1),
    fork(watchGetStatType2),
    fork(watchGetStatType3),
    fork(watchGetStatType4),
    fork(watchGetStatType5),
    fork(watchGetSalesLogSheet)
  ]);
}

export default statSaga;