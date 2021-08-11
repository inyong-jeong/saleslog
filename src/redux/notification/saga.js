import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  GET_NOTIFICATIONS,
  GET_ENTITY_NOTIFICATIONS,
  PUT_NOTIFICATION
} from "constants/actionTypes";

import {
  getNotifications,
  getEntityNotifications,
  putNotification,
} from "./actions";

import { getNotificationsCall, getEntityNotificationsCall, putNotificationCall } from "model/notification";

function parseEntityNotifications(entityNoti) {
  let priorDate = new Date(entityNoti[0].creation_date);
  let temp = [];
  temp.push({
    type: 'divider',
    note: `${priorDate.getMonth()+1}월 ${priorDate.getDate()}일, ${priorDate.getYear() + 1900}`
  });
  for (const noti of entityNoti) {
    const notiDate = new Date(noti.creation_date);
    if (priorDate.getDate() !== notiDate.getDate()) {
      temp.push({
        type: 'date',
        note: `${notiDate.getMonth()+1}월 ${notiDate.getDate()}일, ${notiDate.getYear() + 1900}`
      });
    }
    temp.push({
      commenter_id: noti.actor_id,
      note: noti.note,
      user_name: noti.user_name
    });
    priorDate = notiDate;
  }
  return temp;
}

function* _getNotifcations({ payload: { id, page } }) {
  try {
    const response = yield call(getNotificationsCall, id, page);
    yield put(getNotifications.success(response));
  } catch (error) {
    yield put(getNotifications.error(error.message));
  }
}

function* _getEntityNotifications({ payload: { id } }) {
  try {
    const response = yield call(getEntityNotificationsCall, id);
    yield put(getEntityNotifications.success(parseEntityNotifications(response)));
  } catch (error) {
    yield put(getEntityNotifications.error(error.message));
  }
}

function* _putNotifcation({ payload: { id } }) {
  try {
    const response = yield call(putNotificationCall, id);
    yield put(putNotification.success(response));
  } catch (error) {
    yield put(putNotification.error(error.message));
  }
}

export function* watchGetNotifications() {
  yield takeEvery(GET_NOTIFICATIONS, _getNotifcations);
}

export function* watchGetEntityNotifications() {
  yield takeEvery(GET_ENTITY_NOTIFICATIONS, _getEntityNotifications);
}

export function* watchPutNotification() {
  yield takeEvery(PUT_NOTIFICATION, _putNotifcation);
}

function* notificationSaga() {
  yield all([
    fork(watchGetNotifications),
    fork(watchGetEntityNotifications),
    fork(watchPutNotification)
  ]);
}

export default notificationSaga;