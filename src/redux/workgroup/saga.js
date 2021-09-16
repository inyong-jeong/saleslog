import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { message } from 'antd';
import {
  POST_WORKGROUP_LOGO,
  GET_WORKGROUP_INFO,
  POST_WORKGROUP_UPD,
  POST_WORKGROUP_REGI,
  GET_WORKGROUP_LIST,
  POST_WORKGROUP_CHANGE,
  POST_WORKGROUP_OUT,
  POST_WORKGROUP_DEL,
  GET_GROUP_MEMBER_LIST,
  GET_GROUP_MEMBER_DETAIL,
  GET_DEPT_INFO,
  POST_DEPT_REGI,
  POST_DEPT_UPD,
  POST_DEPT_DEL,
} from '../../constants/actionTypes'
import {
  postWorkGroupLogo,
  getWorkGroupInfo,
  postWorkGroupUpd,
  postWorkGroupRegi,
  getWorkGroupList,
  postWorkGroupChange,
  postWorkGroupOut,
  postWorkGroupDel,
  getGroupMemberList,
  getGroupMemberDetail,
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
const WGROUP_REGI = '/org/regi_wgroup'                //workgroup create
const WGROUP_LIST = '/org/list_wgroup'                //workgroup list
const WGROUP_CHANGE = '/org/change_wgroup'            //workgroup change
const WGROUP_OUT = '/org/out_wgroup'                  //workgroup out
const WGROUP_DEL = '/org/del_wgroup'                  //workgroup del
const MEMBER_LIST = '/org/list_wgroup_users'          //workgroup member list
const MEMBER_DETAIL = '/org/detail_wgroup_users'      //workgroup member detail
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

//워크그룹 생성
function* _postWorkGroupRegi({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_REGI , body)
    
    yield put(postWorkGroupRegi.success(response))
    yield _success(response, '생성 되었습니다.')

  } catch (error) {
    yield put(postWorkGroupRegi.error(error))
  }
}

//워크그룹 리스트
function* _getWorkGroupList({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_LIST , body)
    yield console.log('fetch result',response);
    yield put(getWorkGroupList.success(response))
  } catch (error) {
    yield put(getWorkGroupList.error(error))
  }
}

//워크그룹 변경
function* _postWorkGroupChange({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_CHANGE , body)
    
    yield put(postWorkGroupChange.success(response))
    yield _success(response, '워크그룹이 변경 되었습니다.')

  } catch (error) {
    yield put(postWorkGroupChange.error(error))
  }
}

//워크그룹 나가기
function* _postWorkGroupOut({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_OUT , body)
    
    yield put(postWorkGroupOut.success(response))
    yield _success(response, '변경 되었습니다.')

  } catch (error) {
    yield put(postWorkGroupOut.error(error))
  }
}


//워크그룹 삭제
function* _postWorkGroupDel({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_DEL , body)
    
    yield put(postWorkGroupDel.success(response))
    yield _success(response, '변경 되었습니다.')

  } catch (error) {
    yield put(postWorkGroupDel.error(error))
  }
}

//워크그룹 맴버 리스트
function* _getGroupMemberList({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + MEMBER_LIST , body)
    yield put(getGroupMemberList.success(response))

  } catch (error) {
    yield put(getGroupMemberList.error(error))
  }
}

//워크그룹 맴버 상세
function* _getGroupMemberDetail({ payload: { body } }) {
  try {
    console.log('fetch:::::::::::::::::::',body)
    const response = yield call(post_fetch, cmm.SERVER_API_URL + MEMBER_DETAIL , body)
    yield console.log('result:::::::::::::::::::',response)
    yield put(getGroupMemberDetail.success(response))

  } catch (error) {
    yield put(getGroupMemberDetail.error(error))
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

function* watchWorkgroupRegi() {
  yield takeEvery(POST_WORKGROUP_REGI, _postWorkGroupRegi)
}

function* watchWorkgroupList() {
  yield takeEvery(GET_WORKGROUP_LIST, _getWorkGroupList)
}

function* watchWorkgroupChange() {
  yield takeEvery(POST_WORKGROUP_CHANGE, _postWorkGroupChange)
}

function* watchWorkgroupOut() {
  yield takeEvery(POST_WORKGROUP_OUT, _postWorkGroupOut)
}

function* watchWorkgroupDel() {
  yield takeEvery(POST_WORKGROUP_DEL, _postWorkGroupDel)
}

function* watchGroupMemberList() {
  yield takeEvery(GET_GROUP_MEMBER_LIST, _getGroupMemberList)
}

function* watchGroupMemberDetail() {
  yield takeEvery(GET_GROUP_MEMBER_DETAIL, _getGroupMemberDetail)
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
    fork(watchPostDeptDel),
    fork(watchWorkgroupRegi),
    fork(watchWorkgroupList),    
    fork(watchWorkgroupChange),
    fork(watchWorkgroupOut),
    fork(watchWorkgroupDel),
    fork(watchGroupMemberList),
    fork(watchGroupMemberDetail) 
  ])
}

export default WorkgroupSaga
