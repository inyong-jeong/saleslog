import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_download } from 'model/FetchManage'

import {
  GET_SALES_STAT,
  GET_LEAD_STAT,
  GET_LOGS_EXCEL_DOWNLOAD
} from 'constants/actionTypes'

import {
  getsaleslogstat,
  getleadlogstat,
  getlogsdownload
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
const LOGS_EXCEL_DOWNLOAD = '/saleslog/list_saleslog_download'

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

function* _getLogsExcelDownload({ payload: { body } }) {
  try {
    yield loadingMessage()
    yield console.log('getLogsExcelDownload::: ', body)
    const response = yield call(post_fetch_download, cmm.SERVER_API_URL + LOGS_EXCEL_DOWNLOAD, body)
    yield hideMessage()
    yield put(getlogsdownload.success(response))
  } catch (error) {
    yield put(getlogsdownload.error(error))
  }
}


function* watchGetSalesLogStat() {
  yield takeEvery(GET_SALES_STAT, _getSalesLogStat)
}

function* watchGetLeadLogStat() {
  yield takeEvery(GET_LEAD_STAT, _getLeadLogStat)
}

function* watchGetLogsExcelDownload() {
  yield takeEvery(GET_LOGS_EXCEL_DOWNLOAD, _getLogsExcelDownload)
}


function* dashboardSaga() {
  yield all([
    fork(watchGetSalesLogStat),
    fork(watchGetLeadLogStat),
    fork(watchGetLogsExcelDownload),
  ])
}

export default dashboardSaga
