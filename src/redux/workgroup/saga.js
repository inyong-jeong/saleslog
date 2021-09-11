import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,  
} from '../../constants/actionTypes'
import {
  postWorkGroupLogo,
  getWorkGroupInfo,
  postWorkGroupUpd,
} from './actions'

const cmm = require('../../constants/common');


//customer api 

const WGROUP_REGISTER_LOGO = '/org/regi_wgroup_logo'  //workgroup register logo
const WGROUP_GET_INFO = '/org/detail_wgroup'          //workgroup detail
const WGROUP_UPD = '/org/upd_wgroup'                  //workgroup update


function* _postLogoWorkgroup({ payload: { body } }) {
  console.log('SAGA :::::::', body, cmm.SERVER_API_URL + WGROUP_REGISTER_LOGO)
  try {
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + WGROUP_REGISTER_LOGO , body)
    
    yield put(postWorkGroupLogo.success(response))
    yield alert(response.message)

  } catch (error) {
    yield put(postWorkGroupLogo.error(error))
  }
}

function* _getWorkgroupInfo({ payload: { body } }) {
  console.log('SAGA :::::::', body, cmm.SERVER_API_URL + WGROUP_GET_INFO)
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_GET_INFO , body)
    
    yield put(getWorkGroupInfo.success(response))
    yield console.log(response)

  } catch (error) {
    yield put(getWorkGroupInfo.error(error))
  }
}


function* _postWorkGroupUpd({ payload: { body } }) {
  console.log('SAGA :::::::', body, cmm.SERVER_API_URL + WGROUP_UPD)
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_UPD , body)
    
    yield put(postWorkGroupUpd.success(response))
    yield console.log(response)

  } catch (error) {
    yield put(postWorkGroupUpd.error(error))
  }
}

function* watchLogoWorkgroup() {
  yield takeEvery(POST_WORKGROUP_LOGO, _postLogoWorkgroup)
}

function* watchWorkgroupInfo() {
  yield takeEvery(GET_WORKGROUP_INFO, _getWorkgroupInfo)
}

function* watchWorkgroupUpd() {
  yield takeEvery(POST_WORKGROUP_UPD, _postWorkGroupUpd)
}



function* WorkgroupSaga() {
  yield all([
    fork(watchLogoWorkgroup),
    fork(watchWorkgroupInfo),
    fork(watchWorkgroupUpd),
 
  ])
}

export default WorkgroupSaga
