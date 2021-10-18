import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch } from 'model/FetchManage'

import {
  GET_SALES_STAT,
  GET_LEAD_STAT
} from 'constants/actionTypes'

import {
  getsaleslogstat,
  getleadlogstat
} from './actions'

import {
  successMessage,
  loadingMessage,
  hideMessage,
  errorMessage
} from '../../constants/commonFunc'

const cmm = require('constants/common');
const SALESLOG_STAT = '/saleslog/summary_saleslog'
const LEADLOG_STAT = '/saleslog/summary_saleslog_lead'

function* _getSalesLogStat({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + SALESLOG_STAT, body)
    yield hideMessage()
    yield put(getsaleslogstat.success(response))

  } catch (error) {
    yield put(getsaleslogstat.error(error))
  }
}

function* _getLeadLogStat({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + LEADLOG_STAT, body)
    yield hideMessage()
    yield put(getleadlogstat.success(response))
  } catch (error) {
    yield put(getleadlogstat.error(error))
  }
}

function* watchGetSalesLogStat() {
  yield takeEvery(GET_SALES_STAT, _getSalesLogStat)
}

function* watchGetLeadLogStat() {
  yield takeEvery(GET_LEAD_STAT, _getLeadLogStat)
}

function* dashboardSaga() {
  yield all([
    fork(watchGetSalesLogStat),
    fork(watchGetLeadLogStat),
  ])
}

export default dashboardSaga
