import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { successMessage, errorMessage, loadingMessage, hideMessage } from 'constants/commonFunc';

import { GET_NOTIFICATION, POST_NOTIFICATION_BEDGE, POST_NOTIFICATION_SETTING } from '../../constants/actionTypes';
import { getNotificationLists, postNotificationSetting, postNotificationBadge } from './actions';

const GET_NOTI_URL = 'https://backend.saleslog.co/notify/list_notifications'
const POST_NOTI_SETTING_URL = 'https://backend.saleslog.co/org/upd_myinfo_config'
const POST_NOTI_BADGE_URL = 'https://backend.saleslog.co/notify/count_notifications'


function* _postNotificationBadge() {
  try {
    const response = yield call(post_fetch, POST_NOTI_BADGE_URL)
    yield put(postNotificationBadge.success(response))
  }
  catch (error) {
    yield put(postNotificationBadge.error(error))

  }
}

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

function* _postNotificationSetting({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, POST_NOTI_SETTING_URL, body)
    yield put(postNotificationSetting.success(response))
  }
  catch (error) {
    yield put(postNotificationSetting.error(error))

  }
}

function* watchPostNotificationBadge() {
  yield takeEvery(POST_NOTIFICATION_BEDGE, _postNotificationBadge)
}

function* watchGetNotificationLists() {
  yield takeEvery(GET_NOTIFICATION, _getNotificationLists)
}

function* watchPostNotificationSetting() {
  yield takeEvery(POST_NOTIFICATION_SETTING, _postNotificationSetting)
}

function* notificationSaga() {
  yield all([
    fork(watchGetNotificationLists),
    fork(watchPostNotificationSetting),
    fork(watchPostNotificationBadge)
  ])
}

export default notificationSaga