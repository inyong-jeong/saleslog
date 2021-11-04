import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { successMessage, errorMessage, loadingMessage, hideMessage } from 'constants/commonFunc';

import { GET_NOTIFICATION } from '../../constants/actionTypes';
import { getNotificationLists } from './actions';

const GET_NOTI_URL = 'https://backend.saleslog.co/notify/list_notifications'

function* _getNotificationLists({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, GET_NOTI_URL, body)
    yield hideMessage()
    yield put(getNotificationLists.success(response))

  }
  catch (error) {
    yield put(getNotificationLists.error(error))
    yield errorMessage('알림을 가져오는데 실패했습니다.')
  }
}

function* watchGetNotificationLists() {
  yield takeEvery(GET_NOTIFICATION, _getNotificationLists)
}

function* notificationSaga() {
  yield all([
    fork(watchGetNotificationLists)
  ])
}

export default notificationSaga