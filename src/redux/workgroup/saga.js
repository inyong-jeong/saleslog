import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import {
  POST_WORKGROUP_LOGO,
} from '../../constants/actionTypes'
import {
  postWorkGroupLogo,
} from './actions'

const cmm = require('../../constants/common');


//customer api 

const ACC_REGISTER = '/org/regi_wgroup_logo'

function* _postLogoWorkgroup({ payload: { body } }) {
  console.log('SAGA :::::::', body, cmm.SERVER_API_URL + ACC_REGISTER)
  try {
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + ACC_REGISTER , body)
    
    yield put(postWorkGroupLogo.success(response))
    yield alert(response.message)

  } catch (error) {
    yield put(postWorkGroupLogo.error(error))
  }
}

function* watchLogoWorkgroup() {
  yield takeEvery(POST_WORKGROUP_LOGO, _postLogoWorkgroup)
}

function* WorkgroupSaga() {
  yield all([
    fork(watchLogoWorkgroup),
 
  ])
}

export default WorkgroupSaga
