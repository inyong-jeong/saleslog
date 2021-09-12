import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { message } from 'antd';
import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,  
  GET_DEPT_INFO,
} from '../../constants/actionTypes'
import {
  postWorkGroupLogo,
  getWorkGroupInfo,
  postWorkGroupUpd,
  getDeptInfo,
} from './actions'

const cmm = require('../../constants/common');


//customer api 

const WGROUP_REGISTER_LOGO = '/org/regi_wgroup_logo'  //workgroup register logo
const WGROUP_GET_INFO = '/org/detail_wgroup'          //workgroup detail
const WGROUP_UPD = '/org/upd_wgroup'                  //workgroup update
const DEPT_GET_INFO = '/org/list_dept'                //workgroup Dept List

const _success = (response, msg) => {
  //if (response.info.indexOf('Changed: 1')>0){
    message.success({
      content : msg,
      duration : 0.8,
      style: {
        marginTop: '100px',
      },
    });
  //}
}

function* _postLogoWorkgroup({ payload: { body } }) {  
  try {
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + WGROUP_REGISTER_LOGO , body)
    yield _success(response, '로고가 변경 되었습니다.')
    yield put(postWorkGroupLogo.success(response))
   
  } catch (error) {
    yield put(postWorkGroupLogo.error(error))
  }
}

function* _getWorkgroupInfo({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_GET_INFO , body)
    
    yield put(getWorkGroupInfo.success(response))
    yield console.log(response)

  } catch (error) {
    yield put(getWorkGroupInfo.error(error))
  }
}


function* _postWorkGroupUpd({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_UPD , body)
    
    yield put(postWorkGroupUpd.success(response))
    yield _success(response, '저장 되었습니다.')

  } catch (error) {
    yield put(postWorkGroupUpd.error(error))
  }
}


function* _getDeptInfo({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_GET_INFO , body)
    
    yield put(getDeptInfo.success(response))
    

  } catch (error) {
    yield put(getDeptInfo.error(error))
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

function* watchGetDeptInfo() {
  yield takeEvery(GET_DEPT_INFO, _getDeptInfo)
}



function* WorkgroupSaga() {
  yield all([
    fork(watchLogoWorkgroup),
    fork(watchWorkgroupInfo),
    fork(watchWorkgroupUpd),
    fork(watchGetDeptInfo)
 
  ])
}

export default WorkgroupSaga
