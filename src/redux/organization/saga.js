import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import {
  GET_ORGANIZATION, GET_ORGANIZATION_USER
} from '../../constants/actionTypes'
import {
  getorganization, getorganizationusers
} from './actions'

function* _getOrganization({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/org/list_dept', body)
    console.log(response)
    yield put(getorganization.success(response))
  } catch (error) {
    yield put(getorganization.error(error))
  }
}

function* _getOrganizationUser({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/org/list_dept_users', body)
    yield put(getorganizationusers.success(response))
  } catch (error) {
    yield put(getorganizationusers.error(error))
  }
}

function* watchGetOrganization() {
  yield takeEvery(GET_ORGANIZATION, _getOrganization)
}

function* watchGetOrganizationUser() {
  yield takeEvery(GET_ORGANIZATION_USER, _getOrganizationUser)
}

function* organizationSaga() {
  yield all([
    fork(watchGetOrganization),
    fork(watchGetOrganizationUser),
  ])
}

export default organizationSaga
