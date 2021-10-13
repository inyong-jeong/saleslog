import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'

import {
  successMessage,
  errorMessage,
  loadingMessage,
  hideMessage,
} from 'constants/commonFunc';
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
  POST_GROUP_MEMBER_UPD,
  POST_GROUP_MEMBER_OUT,
  GET_PROFILE_INFO,
  POST_GROUP_INVITE,
  GET_INVITE_LIST,
  POST_INVITE_DEL,
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
  postGroupMemberUpd,
  postGroupMemberOut,
  getProfileInfo,
  postGroupInvite,
  getInviteList,
  postInviteDel,
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
const MEMBER_UPD = '/org/upd_wgroup_users'            //workgroup member update
const MEMBER_OUT = '/org/out_wgroup_users'            //workgroup member out
const PROFILE_GET_INFO = '/org/myinfo'                //my profile 
const MEMBER_INVITE = '/login/invite_user'            //workgroup member invite
const INVITE_LIST = '/org/list_wgroup_invite'         //workgroup invite list
const INVITE_DEL = '/org/del_wgroup_invite'           //workgroup invite Delete
const DEPT_GET_INFO = '/org/list_dept'                //workgroup Dept List
const DEPT_REGISTER = '/org/regi_dept'                //workgroup Dept Register
const DEPT_UPDATE = '/org/upd_dept'                   //workgroup Dept Update
const DEPT_DELETE = '/org/del_dept'                   //workgroup Dept Delete

//워크그룹 로고
function* _postLogoWorkgroup({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + WGROUP_REGISTER_LOGO, body)
    yield hideMessage()
    yield put(postWorkGroupLogo.success(response))
    yield successMessage('로고가 변경되었습니다.')

  } catch (error) {
    yield put(postWorkGroupLogo.error(error))
  }
}
//워크그룹 상세
function* _getWorkgroupInfo({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_GET_INFO, body)
    yield hideMessage()
    yield put(getWorkGroupInfo.success(response))

  } catch (error) {
    yield put(getWorkGroupInfo.error(error))

  }
}
//워크그룹 수정
function* _postWorkGroupUpd({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_UPD, body)
    yield hideMessage()
    yield put(postWorkGroupUpd.success(response))
    yield successMessage('저장되었습니다.')

  } catch (error) {
    yield put(postWorkGroupUpd.error(error))
  }
}

//워크그룹 생성
function* _postWorkGroupRegi({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_REGI, body)
    yield hideMessage()
    yield put(postWorkGroupRegi.success(response))
    yield successMessage('생성되었습니다.')

  } catch (error) {
    yield put(postWorkGroupRegi.error(error))
  }
}

//워크그룹 리스트
function* _getWorkGroupList({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_LIST, body)
    yield hideMessage()
    yield put(getWorkGroupList.success(response))
  } catch (error) {
    yield put(getWorkGroupList.error(error))
  }
}

//워크그룹 변경
function* _postWorkGroupChange({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_CHANGE, body)
    yield hideMessage()
    yield put(postWorkGroupChange.success(response))
    yield successMessage('워크그룹이 변경되었습니다.')

  } catch (error) {
    yield put(postWorkGroupChange.error(error))
  }
}

//워크그룹 나가기
function* _postWorkGroupOut({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_OUT, body)
    yield hideMessage()
    yield put(postWorkGroupOut.success(response))

  } catch (error) {
    yield console.log('워크그룹 나가기 에러', error.message)
    yield put(postWorkGroupOut.error(error.message))
  }
}


//워크그룹 삭제
function* _postWorkGroupDel({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WGROUP_DEL, body)
    yield hideMessage()
    yield put(postWorkGroupDel.success(response))
    yield successMessage('워크그룹이 삭제되었습니다.')

  } catch (error) {
    yield hideMessage()
    yield console.log('워크그룹 삭제 에러', error.message)
    yield put(postWorkGroupDel.error(error.message))
  }
}

//워크그룹 맴버 리스트
function* _getGroupMemberList({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + MEMBER_LIST, body)
    yield hideMessage()
    yield put(getGroupMemberList.success(response))

  } catch (error) {
    yield put(getGroupMemberList.error(error))
  }
}

//워크그룹 맴버 상세
function* _getGroupMemberDetail({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + MEMBER_DETAIL, body)
    yield hideMessage()
    yield put(getGroupMemberDetail.success(response))

  } catch (error) {
    yield put(getGroupMemberDetail.error(error))
  }
}

//워크그룹 맴버 수정
function* _postGroupMemberUpd({ payload: { body } }) {
  try {

    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + MEMBER_UPD, body)
    yield hideMessage()
    yield put(postGroupMemberUpd.success(response))
    yield successMessage('멤버가 수정되었습니다.')

  } catch (error) {
    yield put(postGroupMemberUpd.error(error))
  }
}

//워크그룹 맴버 내보내기
function* _postGroupMemberOut({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + MEMBER_OUT, body)
    yield hideMessage()
    yield put(postGroupMemberOut.success(response))
    yield successMessage('맴버를 내보냈습니다.')

  } catch (error) {
    yield put(postGroupMemberOut.error(error))
  }
}


//내 프로필 정보 가져오기
function* _getProfileInfo({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + PROFILE_GET_INFO, body)
    yield hideMessage()
    yield put(getProfileInfo.success(response))


  } catch (error) {
    yield put(getProfileInfo.error(error))
  }
}

//워크그룹 초대
function* _postGroupInvite({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.AUTH_SERVER_API_URL + MEMBER_INVITE, body)
    yield hideMessage()
    yield put(postGroupInvite.success(response))
    yield successMessage('초대 메일을 성공적으로 발송했습니다.')

  } catch (error) {
    yield put(postGroupInvite.error(error))
  }
}


//워크그룹 초대 리스트
function* _getInviteList({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + INVITE_LIST, body)
    yield hideMessage()
    yield put(getInviteList.success(response))

  } catch (error) {
    yield put(getInviteList.error(error))
  }
}

//워크그룹 초대 취소
function* _postInviteDel({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + INVITE_DEL, body)
    yield hideMessage()
    yield put(postInviteDel.success(response))
    yield successMessage('초대가 취소되었습니다.')

  } catch (error) {
    yield put(postInviteDel.error(error))
  }
}

//부서리스트
function* _getDeptInfo({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_GET_INFO, body)
    yield hideMessage()
    yield put(getDeptInfo.success(response))

  } catch (error) {
    yield put(getDeptInfo.error(error))
  }
}

//부서 등록
function* _postDeptRegi({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_REGISTER, body)
    yield hideMessage()
    yield put(postDeptRegi.success(response))
    yield successMessage('부서가 등록되었습니다.')

  } catch (error) {
    yield put(postDeptRegi.error(error))
  }
}

//부서 수정
function* _postDeptUpd({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_UPDATE, body)
    yield hideMessage()
    yield put(postDeptUpd.success(response))
    yield successMessage('부서가 수정되었습니다.')

  } catch (error) {
    yield put(postDeptUpd.error(error))
  }
}
//부서 삭제
function* _postDeptDel({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + DEPT_DELETE, body)
    yield hideMessage()
    yield put(postDeptDel.success(response))
    yield successMessage('부서가 삭제되었습니다.')

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

function* watchGroupMemberUpd() {
  yield takeEvery(POST_GROUP_MEMBER_UPD, _postGroupMemberUpd)
}

function* watchGroupMemberOut() {
  yield takeEvery(POST_GROUP_MEMBER_OUT, _postGroupMemberOut)
}

function* watchProfileInfo() {
  yield takeEvery(GET_PROFILE_INFO, _getProfileInfo)
}


function* watchGroupInvite() {
  yield takeEvery(POST_GROUP_INVITE, _postGroupInvite)
}

function* watchInviteList() {
  yield takeEvery(GET_INVITE_LIST, _getInviteList)
}

function* watchInviteDel() {
  yield takeEvery(POST_INVITE_DEL, _postInviteDel)
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
    fork(watchGroupMemberDetail),
    fork(watchGroupMemberUpd),
    fork(watchGroupMemberOut),
    fork(watchProfileInfo),
    fork(watchGroupInvite),
    fork(watchInviteList),
    fork(watchInviteDel)
  ])
}

export default WorkgroupSaga
