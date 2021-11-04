import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { successMessage, errorMessage, loadingMessage, hideMessage } from 'constants/commonFunc';
import { setUserInfo } from 'helpers/authUtils';

import {
  GET_CALENDAR_LISTS,
  GET_CALENDAR_LIST,
  POST_CALENDAR,
  PUT_CALENDAR,
  DELETE_CALENDAR
} from '../../constants/actionTypes'
import {
  getCalendarLists,
  getCalendarList,
  postCalendar,
  putCalendar,
  deleteCalendar
} from './actions'

const cmm = require('../../constants/common');


//calendar api 
const C_LISTS = '/org/myinfo'                    //profile detail
const C_LIST = '/org/upd_myinfo'                 //profile update
const C_POST = '/org/myinfo_photo'             //profile photo change
const C_PUT = '/etc/list_notic'             //notice wgroup list
const C_DELETE = '/etc/detail_notic'         //notice wgroup detail

//캘린더 리스트들 불러오기
function* _getCalendarLists({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + C_LISTS, body)
    yield put(getCalendarLists.success(response))

  } catch (error) {
    yield put(getCalendarLists.error(error))
  }

}

//캘린더 리스트 불러오기

function* _getCalendarList({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + C_LIST, body)
    yield put(getCalendarList.success(response))
  } catch (error) {
    yield put(getCalendarList.error(error))
  }
}

//캘린더 작성

function* _postCalendar({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + C_POST, body)
    yield put(postCalendar.success(response))
  }
  catch (error) {
    yield put(postCalendar.error(error))
  }
}

//캘린더 수정
function* _putCalendar({ payload: { body } }) {
  try {
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + C_PUT, body)

    yield put(putCalendar.success(response))

  } catch (error) {
    yield put(putCalendar.error(error))
  }
}

//캘린더 삭제
function* _deleteCalendar({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + C_DELETE, body)
    yield hideMessage()
    yield put(deleteCalendar.success(response))
    yield successMessage('저장되었습니다.')

  } catch (error) {
    yield loadingMessage()
    yield errorMessage(error.message)
    yield put(deleteCalendar.error(error))
    yield errorMessage('저장에 실패했습니다.')
  }
}


function* watchCalendarLists() {
  yield takeEvery(GET_CALENDAR_LISTS, _getCalendarLists)
}

function* watchCalendarList() {
  yield takeEvery(GET_CALENDAR_LIST, _getCalendarList)
}

function* watchCalendarPost() {
  yield takeEvery(POST_CALENDAR, _postCalendar)
}

function* watchCalendarPut() {
  yield takeEvery(PUT_CALENDAR, _putCalendar)
}

function* watchCalendarDelete() {
  yield takeEvery(DELETE_CALENDAR, _deleteCalendar)
}



function* CalendarSaga() {
  yield all([
    fork(watchCalendarLists),
    fork(watchCalendarList),
    fork(watchCalendarPost),
    fork(watchCalendarPut),
    fork(watchCalendarDelete),

  ])
}

export default CalendarSaga
