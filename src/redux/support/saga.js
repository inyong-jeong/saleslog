import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch } from 'model/FetchManage'
import {
  POST_SUPPORT_INQUIRY,
  GET_SUPPORT_INQUIRY_LISTS,
  GET_SUPPORT_INQUIRY_DETAIL
} from '../../constants/actionTypes'
import {
  postSupportInquiry,
  getSupportInquiryDetail,
  getSupportInquiryLists
} from './actions'
import cmm from '../../constants/common'
import {
  errorMessage,
  successMessage,
  loadingMessage,
  hideMessage,
} from '../../constants/commonFunc'

const ETC = "/etc"
const REGI_QUESTION_SYS = "/regi_question_sys"
const LIST_QUESTION_SYS = '/list_question_sys'
const DETAIL_QUESTION_SYS = '/detail_question_sys'

function* _postSupportInquiry({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + ETC + REGI_QUESTION_SYS, body)
    yield hideMessage()
    yield put(postSupportInquiry.success(response))
    yield successMessage('문의가 등록되었습니다.')

  }
  catch (error) {
    yield errorMessage('문의 등록에 실패했습니다.')
    yield put(postSupportInquiry.error(error))
  }
}

function* _getSupportInquiryLists({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, cmm.SERVER_API_URL + ETC + LIST_QUESTION_SYS, body)
    yield hideMessage()
    yield put(getSupportInquiryLists.success(response))

  }
  catch (error) {
    yield errorMessage('문의내역을 가져오는데 실패했습니다.')
    yield put(getSupportInquiryLists.error(error))

  }
}

function* _getSupportInquiryDetail({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, cmm.SERVER_API_URL + ETC + DETAIL_QUESTION_SYS, body)
    yield put(getSupportInquiryDetail.success(response))

  }
  catch (error) {
    yield errorMessage('해당 문의내역을 가져오는데 실패했습니다.')
    yield put(getSupportInquiryDetail.error(error))

  }
}

function* watchGetSupportInquiryDetail() {
  yield takeEvery(GET_SUPPORT_INQUIRY_DETAIL, _getSupportInquiryDetail)
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
    fork(watchGetSupportInquiryLists),
    fork(watchGetSupportInquiryDetail)
  ])
}

export default supportSaga