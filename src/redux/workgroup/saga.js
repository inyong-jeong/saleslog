import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { message } from 'antd';
import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,  
  GET_DEPT_INFO,
  POST_DEPT_REGI,
  POST_DEPT_UPD,
  POST_DEPT_DEL,
} from '../../constants/actionTypes'
import {
  postWorkGroupLogo,
  getWorkGroupInfo,
  postWorkGroupUpd,
  getDeptInfo,
  postDeptRegi,
  postDeptUpd,
  postDeptDel,
} from './actions'

const cmm = require('../../constants/common');


//customer api 

const WGROUP_REGISTER_LOGO = '/org/regi_wgroup_logo'  //workgroup register logo
const WGROUP_GET_INFO = '/org/detail_wgroup'          //workgroup detail
const WGROUP_UPD = '/org/upd_wgroup'                  //workgroup update
const DEPT_GET_INFO = '/org/list_dept'                //workgroup Dept List
const DEPT_REGISTER = '/org/regi_dept'                //workgroup Dept Register
const DEPT_UPDATE = '/org/upd_dept'                   //workgroup Dept Update
const DEPT_DELETE = '/org/del_dept'                   //workgroup Dept Delete


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

//워크그룹 로고
function* _postLogoWorkgroup({ payload: { body } }) {  
  try {
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + WGROUP_REGISTER_LOGO , body)
    yield _success(response, '로고가 변경 되었습니다.')
    yield put(postWorkGroupLogo.success(response))
   
  } catch (error) {
    yield put(postWorkGroupLogo.error(error))
  }
}
//워크그룹 상세
function* _getWorkgroupInfo({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_GET_INFO , body)
    
    yield put(getWorkGroupInfo.success(response))
    yield console.log(response)

  } catch (error) {
    yield put(getWorkGroupInfo.error(error))
  }
}
//워크그룹 수정
function* _postWorkGroupUpd({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_UPD , body)
    
    yield put(postWorkGroupUpd.success(response))
    yield _success(response, '저장 되었습니다.')

  } catch (error) {
    yield put(postWorkGroupUpd.error(error))
  }
}
//부서리스트
function* _getDeptInfo({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_GET_INFO , body)
    
    yield put(getDeptInfo.success(response))
    

  } catch (error) {
    yield put(getDeptInfo.error(error))
  }
}
//부서 등록
function* _postDeptRegi({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_REGISTER , body)
    yield put(postDeptRegi.success(response))
    yield _success(response, '등록 되었습니다.')
    
  } catch (error) {
    yield put(postDeptRegi.error(error))
  }
}
//부서 수정
function* _postDeptUpd({ payload: { body } }) {
  try {
    
    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_UPDATE , body)
    yield put(postDeptUpd.success(response))
    yield _success(response, '수정 되었습니다.')
    
  } catch (error) {
    yield put(postDeptUpd.error(error))
  }
}
//부서 삭제
function* _postDeptDel({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_DELETE , body)
    yield put(postDeptDel.success(response))
    yield _success(response, '삭제 되었습니다.')
    
  } catch (error) {
    yield put(postDeptDel.error(error))
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

function* watchPostDeptRegi() {
  yield takeEvery(POST_DEPT_REGI, _postDeptRegi)
}

function* watchPostDeptUpd() {
  yield takeEvery(POST_DEPT_UPD, _postDeptUpd)
}

function* watchPostDeptDel() {
  yield takeEvery(POST_DEPT_DEL, _postDeptDel)
}

function* WorkgroupSaga() {
  yield all([
    fork(watchLogoWorkgroup),
    fork(watchWorkgroupInfo),
    fork(watchWorkgroupUpd),
    fork(watchGetDeptInfo),
    fork(watchPostDeptRegi),
    fork(watchPostDeptUpd),
    fork(watchPostDeptDel)
 
  ])
}

export default WorkgroupSaga
