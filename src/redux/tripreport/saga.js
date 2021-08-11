
// @flow
import { all, call, fork, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  GET_TRIPS_SALESLOG,
  POST_TRIP_SALESLOG,
  GET_TRIP_SALESLOG,
  PUT_TRIP_SALESLOG,
  DELETE_TRIP_SALESLOG
} from '../../constants/actionTypes';

import {
  getTripsSalesLog,
  postTripSalesLog,
  getTripSalesLog,
  putTripSalesLog,
  deleteTripSalesLog
} from './actions';

import {
  getTripsSalesLogCall,
  postTripSalesLogCall,
  getTripSalesLogCall,
  putTripSalesLogCall,
  deleteTripSalesLogCall
} from 'model/tripreport';

function* _getTripsSalesLog({ payload: { fromDate, toDate } }) {
  try {
    const response = yield call(getTripsSalesLogCall, fromDate, toDate);
    yield put(getTripsSalesLog.success(response));
  } catch (error) {
    yield put(getTripsSalesLog.error(error));
  }
}

function* _postTripSalesLog({ payload: { body } }) {
  try {
    const response = yield call(postTripSalesLogCall, body);
    yield put(postTripSalesLog.success(response));
  } catch (error) {
    yield put(postTripSalesLog.error(error));
  }
}

function* _getTripSalesLog({ payload: { id } }) {
  try {
    const response = yield call(getTripSalesLogCall, id);
    yield put(getTripSalesLog.success(response));
  } catch (error) {
    yield put(getTripSalesLog.error(error));
  }
}

function* _putTripSalesLog({ payload: { body } }) {
  try {
    const response = yield call(putTripSalesLogCall, body);
    yield put(putTripSalesLog.success(response));
  } catch (error) {
    yield put(putTripSalesLog.error(error));
  }
}

function* _deleteTripSalesLog({ payload: { id } }) {
  try {
    const response = yield call(deleteTripSalesLogCall, id);
    yield put(deleteTripSalesLog.success(response));
  } catch (error) {
    yield put(deleteTripSalesLog.error(error));
  }
}

export function* watchGetTripsSalesLog() {
  yield takeEvery(GET_TRIPS_SALESLOG, _getTripsSalesLog);
}

export function* watchPostTripSalesLog() {
  yield takeEvery(POST_TRIP_SALESLOG, _postTripSalesLog);
}

export function* watchGetTripSalesLog() {
  yield takeEvery(GET_TRIP_SALESLOG, _getTripSalesLog);
}

export function* watchPutTripSalesLog() {
  yield takeEvery(PUT_TRIP_SALESLOG, _putTripSalesLog);
}

export function* watchDeleteTripSalesLog() {
  yield takeEvery(DELETE_TRIP_SALESLOG, _deleteTripSalesLog);
}

function* TripReportSaga() {
  yield all([
    fork(watchGetTripsSalesLog),
    fork(watchPostTripSalesLog),
    fork(watchGetTripSalesLog),
    fork(watchPutTripSalesLog),
    fork(watchDeleteTripSalesLog),
  ]);
}

export default TripReportSaga;
