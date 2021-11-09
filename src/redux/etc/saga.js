import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import { successMessage, errorMessage, loadingMessage, hideMessage } from 'constants/commonFunc';
import { setUserInfo } from 'helpers/authUtils';

import {
  GET_PROFILE_DETAIL,
  POST_PROFILE_UPD,
  POST_PROFILE_PHOTO,
  GET_NOTICE_GRP_LIST,
  GET_NOTICE_GRP_DETAIL,
  POST_NOTICE_GRP_UPD,
  POST_NOTICE_GRP_DEL,
  POST_NOTICE_GRP_REGI,
  GET_NOTICE_SYS_LIST,
  GET_NOTICE_SYS_DETAIL,
  POST_NOTICE_SYS_UPD,
  POST_NOTICE_SYS_DEL,
  POST_NOTICE_SYS_REGI,
  POST_ANNIVERSARY,
  POST_SYSTEM_NOTICE,
  POST_WORKGROUP_NOTICE,
  POST_DTOKEN_REGI,
} from '../../constants/actionTypes'
import {
  postAnniversary,
  getProfileDetail,
  postProfileUpd,
  postProfilePhoto,
  getNoticeGrpList,
  getNoticeGrpDetail,
  postNoticeGrpUpd,
  postNoticeGrpDel,
  postNoticeGrpRegi,
  getNoticeSysList,
  getNoticeSysDetail,
  postNoticeSysUpd,
  postNoticeSysDel,
  postNoticeSysRegi,
  postWorkgroupNotice,
  postSystemNotice,
  postDtokenRegi,
} from './actions'

const cmm = require('../../constants/common');


//customer api 
const PROFILE_INFO = '/org/myinfo'                    //profile detail
const PROFILE_UPD = '/org/upd_myinfo'                 //profile update
const PROFILE_PHOTO = '/org/myinfo_photo'             //profile photo change
const NOTICE_GRP_LIST = '/etc/list_notic_page'        //notice wgroup list
const NOTICE_GRP_DETAIL = '/etc/detail_notic'         //notice wgroup detail
const NOTICE_GRP_UPD = '/etc/upd_notic'               //notice wgroup update
const NOTICE_GRP_DEL = '/etc/del_notic'               //notice wgroup delete
const NOTICE_GRP_REGI = '/etc/regi_notic'             //notice wgroup register
const NOTICE_SYS_LIST = '/etc/list_notic_sys_page'         //notice system list
const NOTICE_SYS_DETAIL = '/etc/detail_notic_sys'     //notice system detail
const NOTICE_SYS_UPD = '/etc/upd_notic_sys'           //notice system update
const NOTICE_SYS_DEL = '/etc/del_notic_sys'           //notice system delete
const NOTICE_SYS_REGI = '/etc/regi_notic_sys'         //notice system register

// right menu
const ANNIVERSARY = '/saleslog/list_anniversary'
const SYSTEM_NOTICE = '/etc/list_notic_sys_gmb'
const WORKGROUP_NOTICE = '/etc/list_notic_gmb'

// device token
const DTOKEN_REGI = '/secure/save_device_token'       //save device token

function* _postSystemNotice() {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + SYSTEM_NOTICE, "")
    yield put(postSystemNotice.success(response))

  } catch (error) {
    yield put(postSystemNotice.error(error))
  }

}
function* _postWorkgroupNotice() {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + WORKGROUP_NOTICE, "")
    yield put(postWorkgroupNotice.success(response))
  } catch (error) {
    yield put(postWorkgroupNotice.error(error))
  }
}

function* _postAnniversary() {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + ANNIVERSARY, "")
    yield put(postAnniversary.success(response))
  }
  catch (error) {
    yield put(postAnniversary.error(error))
  }
}

//프로필 정보
function* _getProfileDetail({ payload: { body } }) {
  try {
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + PROFILE_INFO, body)
    if (response.status == 200 && response.message.length > 0) {
      yield setUserInfo({
        permissions: response.message[0].permissions,
        user_name: response.message[0].user_name,
        wgroupName: response.message[0].organization
      })
    }
    yield put(getProfileDetail.success(response))

  } catch (error) {
    yield put(getProfileDetail.error(error))
  }
}

//프로필 수정
function* _postProfileUpd({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + PROFILE_UPD, body)
    yield hideMessage()
    yield put(postProfileUpd.success(response))
    yield successMessage('저장되었습니다.')

  } catch (error) {
    yield loadingMessage()
    yield errorMessage(error.message)
    yield put(postProfileUpd.error(error))
    yield errorMessage('저장에 실패했습니다.')
  }
}
//프로필 사진변경
function* _postProfilePhoto({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch_files, cmm.SERVER_API_URL + PROFILE_PHOTO, body)
    yield hideMessage()
    yield put(postProfilePhoto.success(response))
    yield successMessage('저장되었습니다.')

  } catch (error) {
    yield put(postProfilePhoto.error(error))
  }
}

//워크그룹 공지 리스트
function* _getNoticeGrpList({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_GRP_LIST, body)
    yield put(getNoticeGrpList.success(response))
  } catch (error) {
    yield put(getNoticeGrpList.error(error))
  }
}

//워크그룹 공지 상세
function* _getNoticeGrpDetail({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_GRP_DETAIL, body)
    yield hideMessage()
    yield put(getNoticeGrpDetail.success(response))
  } catch (error) {
    yield put(getNoticeGrpDetail.error(error))
  }
}

//워크그룹 공지 수정
function* _postNoticeGrpUpd({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_GRP_UPD, body)
    yield hideMessage()
    yield put(postNoticeGrpUpd.success(response))
    yield successMessage('수정되었습니다.')

  } catch (error) {
    yield put(postNoticeGrpUpd.error(error))
  }
}

//워크그룹 공지 삭제
function* _postNoticeGrpDel({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_GRP_DEL, body)
    yield hideMessage()
    yield put(postNoticeGrpDel.success(response))
    yield successMessage('삭제되었습니다.')

  } catch (error) {
    yield put(postNoticeGrpDel.error(error))
  }
}


//워크그룹 공지 등록
function* _postNoticeGrpRegi({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_GRP_REGI, body)
    yield hideMessage()
    yield put(postNoticeGrpRegi.success(response))
    yield successMessage('등록되었습니다.')

  } catch (error) {
    yield errorMessage(error.message)
    yield put(postNoticeGrpRegi.error(error))
  }
}


//시스템 공지 리스트
function* _getNoticeSysList({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_SYS_LIST, body)
    yield put(getNoticeSysList.success(response))

  } catch (error) {
    yield put(getNoticeSysList.error(error))
  }
}

//시스템 공지 상세
function* _getNoticeSysDetail({ payload: { body } }) {
  try {

    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_SYS_DETAIL, body)
    yield put(getNoticeSysDetail.success(response))
  } catch (error) {
    yield put(getNoticeSysDetail.error(error))
  }
}

//시스템 공지 수정
function* _postNoticeSysUpd({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_SYS_UPD, body)
    yield hideMessage()
    yield put(postNoticeSysUpd.success(response))
    yield successMessage('수정되었습니다.')

  } catch (error) {
    yield put(postNoticeSysUpd.error(error))
  }
}

//시스템 공지 삭제
function* _postNoticeSysDel({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_SYS_DEL, body)
    yield hideMessage()
    yield put(postNoticeSysDel.success(response))
    yield successMessage('삭제되었습니다.')

  } catch (error) {
    yield put(postNoticeSysDel.error(error))
  }
}


//시스템 공지 등록
function* _postNoticeSysRegi({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + NOTICE_SYS_REGI, body)
    yield hideMessage()
    yield put(postNoticeSysRegi.success(response))
    yield successMessage('등록되었습니다.')

  } catch (error) {

    yield errorMessage(error.message)
    yield put(postNoticeSysRegi.error(error))
  }
}

//디바이스 토큰 등록
function* _postDtokenRegi({ payload: { body } }) {
  try {
    //yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + DTOKEN_REGI, body)
    //yield hideMessage()
    yield put(postNoticeSysRegi.success(response))
    //yield successMessage('등록되었습니다.')

  } catch (error) {
    //yield errorMessage(error.message)
    yield put(postNoticeSysRegi.error(error))
  }
}



function* watchPostSystemNotice() {
  yield takeEvery(POST_SYSTEM_NOTICE, _postSystemNotice)
}

function* watchPostWorkgroupNotice() {
  yield takeEvery(POST_WORKGROUP_NOTICE, _postWorkgroupNotice)
}

function* watchPostAnniversary() {
  yield takeEvery(POST_ANNIVERSARY, _postAnniversary)
}

function* watchProfileDetail() {
  yield takeEvery(GET_PROFILE_DETAIL, _getProfileDetail)
}

function* watchProfileUpd() {
  yield takeEvery(POST_PROFILE_UPD, _postProfileUpd)
}

function* watchProfilePhoto() {
  yield takeEvery(POST_PROFILE_PHOTO, _postProfilePhoto)
}

function* watchNoticeGrpList() {
  yield takeEvery(GET_NOTICE_GRP_LIST, _getNoticeGrpList)
}

function* watchNoticeGrpDetail() {
  yield takeEvery(GET_NOTICE_GRP_DETAIL, _getNoticeGrpDetail)
}

function* watchNoticeGrpUpd() {
  yield takeEvery(POST_NOTICE_GRP_UPD, _postNoticeGrpUpd)
}

function* watchNoticeGrpDel() {
  yield takeEvery(POST_NOTICE_GRP_DEL, _postNoticeGrpDel)
}

function* watchNoticeGrpRegi() {
  yield takeEvery(POST_NOTICE_GRP_REGI, _postNoticeGrpRegi)
}

function* watchNoticeSysList() {
  yield takeEvery(GET_NOTICE_SYS_LIST, _getNoticeSysList)
}

function* watchNoticeSysDetail() {
  yield takeEvery(GET_NOTICE_SYS_DETAIL, _getNoticeSysDetail)
}

function* watchNoticeSysUpd() {
  yield takeEvery(POST_NOTICE_SYS_UPD, _postNoticeSysUpd)
}

function* watchNoticeSysDel() {
  yield takeEvery(POST_NOTICE_SYS_DEL, _postNoticeSysDel)
}

function* watchNoticeSysRegi() {
  yield takeEvery(POST_NOTICE_SYS_REGI, _postNoticeSysRegi)
}


function* EtcSaga() {
  yield all([
    fork(watchProfileDetail),
    fork(watchProfileUpd),
    fork(watchProfilePhoto),
    fork(watchNoticeGrpList),
    fork(watchNoticeGrpDetail),
    fork(watchNoticeGrpUpd),
    fork(watchNoticeGrpDel),
    fork(watchNoticeGrpRegi),
    fork(watchNoticeSysList),
    fork(watchNoticeSysDetail),
    fork(watchNoticeSysUpd),
    fork(watchNoticeSysDel),
    fork(watchNoticeSysRegi),
    fork(watchPostAnniversary),
    fork(watchPostSystemNotice),
    fork(watchPostWorkgroupNotice)
  ])
}

export default EtcSaga
