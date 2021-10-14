import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { get_fetch, post_fetch_files } from 'model/FetchManage'
import { setUserInfo } from 'helpers/authUtils';

import {
  GET_PROFILE,
  GET_PROFILE_PICTURE
} from '../../constants/actionTypes'
import {
  getprofile, getprofilepicture
} from './actions'

function* _getProfile() {
  try {
    const response = yield call(get_fetch, 'https://backend.saleslog.co/org/myinfo')
    if (response.status == 200 && response.message.length > 0) {
      yield setUserInfo({
        permissions:response.message[0].permissions, 
        user_name:response.message[0].user_name, 
        wgroupName:response.message[0].organization
      })
    }
    yield put(getprofile.success(response))
  } catch (error) {
    yield put(getprofile.error(error))
  }
}

function* _getProfilePicture({ payload: { body } }) {
  try {
    const response = yield call(post_fetch_files, 'https://backend.saleslog.co/org/myinfo_photo', body)
    yield put(getprofilepicture.success(response))
  } catch (error) {
    yield put(getprofilepicture.error(error))
  }
}

function* watchGetProfile() {
  yield takeEvery(GET_PROFILE, _getProfile)
}

function* watchGetProfilePicture() {
  yield takeEvery(GET_PROFILE_PICTURE, _getProfilePicture)
}

function* profileSaga() {
  yield all([
    fork(watchGetProfile),
    fork(watchGetProfilePicture),
  ])
}

export default profileSaga
