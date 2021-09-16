import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { get_fetch, post_fetch, post_fetch_files } from 'model/FetchManage'
import {
  GET_SALES_STAT,
  GET_LEAD_STAT
} from '../../constants/actionTypes'
import {
  getsaleslogstat, getleadlogstat
} from './actions'

function* _getSalesLogStat() {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/org/myinfo')
    console.log(response)
    yield put(getsaleslogstat.success(response))
  } catch (error) {
    yield put(getsaleslogstat.error(error))
  }
}

function* _getLeadLogStat({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/org/myinfo_photo', body)
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
