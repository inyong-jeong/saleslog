// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    GET_DASHBOARD_STAT
} from 'constants/actionTypes';


import {
    getDashBoardStat
} from './actions';

import { getDashBoardStatCall } from 'model/stat';


function* _getDashBoardStat({payload: { fromDate, toDate }}) {
    try {
        const response = yield call(getDashBoardStatCall, fromDate, toDate);
        yield put(getDashBoardStat.success(response));
    } catch (error) {
        yield put(getDashBoardStat.error(error.message));
    }
}

export function* watchGetDashBoardStat() {
    yield takeEvery(GET_DASHBOARD_STAT, _getDashBoardStat);
}

function* statSaga() {
    yield all([
        fork(watchGetDashBoardStat)
    ]);
}

export default statSaga;