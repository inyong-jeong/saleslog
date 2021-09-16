import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch } from 'model/FetchManage'
import {
  POST_SUPPORT_INQUIRY,
  GET_SUPPORT_INQUIRY_LISTS
} from '../../constants/actionTypes'
import {
  postSupportInquiry,
  getSupportInquiryDetail,
  getSupportInquiryLists
} from './actions'
import cmm from '../../constants/common'
import { errorMessage, successMessage } from '../../constants/commonFunc'

const ETC = "/etc"
const REGI_QUESTION_SYS = "/regi_question_sys"
const LIST_QUESTION_SYS = '/list_question_sys'

function* _postSupportInquiry({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + ETC + REGI_QUESTION_SYS, body)
    yield successMessage('문의가 등록되었습니다.')
    yield put(postSupportInquiry.success(response))
  }
  catch (error) {
    yield errorMessage('문의 등록에 실패했습니다.')
    yield put(postSupportInquiry.error(error))
  }
}

function* _getSupportInquiryLists({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + ETC + LIST_QUESTION_SYS, body)
    yield put(getSupportInquiryLists.success(response))

  }
  catch (error) {
    yield errorMessage('문의내역을 가져오는데 실패했습니다.')
    yield put(getSupportInquiryLists.error(error))

  }
}
function* watchPostSupportInquiry() {
  yield takeEvery(POST_SUPPORT_INQUIRY, _postSupportInquiry)
}
function* watchGetSupportInquiryLists() {
  yield takeEvery(GET_SUPPORT_INQUIRY_LISTS, _getSupportInquiryLists)
}

function* supportSaga() {
  yield all([
    fork(watchPostSupportInquiry),
    fork(watchGetSupportInquiryLists)
  ])
}

export default supportSaga