import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import {
  POST_CUSTOMER,
  GET_CUSTOMER,
  GET_CUSTOMER_OPTION_USERS,
  POST_CUSTOMER_MANAGER,
  GET_CUSTOMER_DETAILS,
  POST_EDIT_CUSTOMER,
  POST_EDIT_MANAGER_INFO,
  GET_MANAGER_INFO,
  POST_EDIT_NAMECARD,
  DEL_CUSTOMER,
  DEL_CUSTOMER_MANAGER,
  POST_ACC_FILE
} from '../../constants/actionTypes'

import {
  postCustomer,
  getAllCustomer,
  getUsers,
  postCustomerManger,
  getCustomerDetails,
  postEditCustomer,
  getManagerInfo,
  postEditManager,
  postEditNamecard,
  deleteCustomer,
  deleteCustomerManager,
  postAccFile
} from './actions'
import { successMessage, loadingMessage, hideMessage, errorMessage } from '../../constants/commonFunc'

//customer api 
const BASE_URL = 'https://backend.saleslog.co/saleslog/'
const ACC_REGISTER = 'regi_accounts'
const ACC_EDIT = 'upd_accounts'
const ACC_MAN_REGISTER = 'regi_accounts_man'
const ACC_LIST = 'list_accounts'
const ACC_DEL = 'del_accounts'
const USERS_URL = 'https://backend.saleslog.co/org/search_users'
const CUSTOMER_DETAILS = 'detail_accounts'
const DETAIL_MANAGER_EDIT = 'upd_accounts_man'
const DETAIL_MANAGER = 'detail_accounts_man'
const NAMECARD_EDIT = 'upd_accounts_man_photo'
const MANAGER_DEL = 'del_accounts_man'
const ACC_FILE_EXCEL = 'regi_accounts_excel'

function* _deleteCustomerManager({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, BASE_URL + MANAGER_DEL, body)
    yield hideMessage()
    yield put(deleteCustomerManager.success(response))
    yield successMessage('해당 담당자가 삭제되었습니다.')
  }
  catch (error) {
    yield put(deleteCustomerManager.error(error))

  }
}

function* _deleteCustomer({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, BASE_URL + ACC_DEL, body)
    yield hideMessage()
    yield put(deleteCustomer.success(response))
    yield successMessage('해당 고객이 삭제되었습니다.')
  }
  catch (error) {
    yield put(deleteCustomer.error(error))

  }
}
function* _postEditNamecard({ payload: { body } }) {
  try {
    const response = yield call(post_fetch_files, BASE_URL + NAMECARD_EDIT, body)
    yield put(postEditNamecard.success(response))
  }
  catch (error) {
    yield put(postEditNamecard.error(error))
  }
}

function* _postEditManager({ payload: { body } }) {
  try {
    console.log('담당자 수정 SAGA :::::::', body)
    const response = yield call(post_fetch, BASE_URL + DETAIL_MANAGER_EDIT, body)
    yield successMessage('담당자 수정이 완료되었습니다.')
    yield put(postEditManager.success(response))

  } catch (error) {
    yield put(getManagerInfo.error(error))
    yield successMessage('담당자 수정에 실패했습니다.')
    console.log('담당자 수정 오류 saga :::::::', error)
  }
}

function* _getManagerInfo({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, BASE_URL + DETAIL_MANAGER, body)
    yield put(getManagerInfo.success(response))

  } catch (error) {
    yield put(getManagerInfo.error(error))

  }
}

function* _postEditCustomer({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, BASE_URL + ACC_EDIT, body)
    yield successMessage('고객 수정이 완료되었습니다.')
    yield put(postEditCustomer.success(response))


  } catch (error) {
    yield put(postEditCustomer.error(error))
    yield successMessage('고객 수정에 실패했습니다.')
    console.log('post edit error ::::', error)
  }
}

function* _getCustomerDetails({ payload: { body } }) {
  try {
    console.log(body)
    const response = yield call(post_fetch, BASE_URL + CUSTOMER_DETAILS, body)
    yield put(getCustomerDetails.success(response))

  }
  catch (error) {
    yield put(getCustomerDetails.error(error))
    // yield alert(error)

  }
}
function* _postCustomerManager({ payload: { body } }) {
  try {

    const response = yield call(post_fetch_files, BASE_URL + ACC_MAN_REGISTER, body)
    yield successMessage('담당자가 등록되었습니다.')
    yield put(postCustomerManger.success(response))

  } catch (error) {
    yield put(postCustomerManger.error(error))
    yield successMessage('담당자 등록에 실패했습니다.')
  }
}

function* _postCustomer({ payload: { body } }) {
  try {
    yield loadingMessage()
    const response = yield call(post_fetch, BASE_URL + ACC_REGISTER, body)
    yield hideMessage()
    yield put(postCustomer.success(response))
    yield successMessage('고객이 등록되었습니다.')


  } catch (error) {
    yield put(postCustomer.error(error))
    yield errorMessage('같은 이름,대표자명으로 등록된 고객이 있습니다.')
    console.log(error);


  }
}

function* _getCustomer({ payload: { body, pageno } }) {
  try {
    yield loadingMessage()
    body.pageno = pageno
    const response = yield call(post_fetch, BASE_URL + ACC_LIST, body)
    yield hideMessage()
    yield put(getAllCustomer.success(response))

  } catch (error) {
    yield put(getAllCustomer.error(error))
    //   yield alert(error)
  }
}
function* _getUser({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, USERS_URL, body)
    yield put(getUsers.success(response))
  } catch (error) {
    yield put(getUsers.error(error))
    //  yield alert(error)
  }
}

function* _postAccFile({ payload: { body } }) {
  try {
    const response = yield call(post_fetch_files, BASE_URL + ACC_FILE_EXCEL, body)
    yield put(postAccFile.success(response))
  }
  catch (error) {
    yield put(postAccFile.error(error))
  }
}


function* watchDeleteCustomerManager() {
  yield takeEvery(DEL_CUSTOMER_MANAGER, _deleteCustomerManager)
}

function* watchDeleteCustomer() {
  yield takeEvery(DEL_CUSTOMER, _deleteCustomer)
}

function* watchPostEditNamecard() {
  yield takeEvery(POST_EDIT_NAMECARD, _postEditNamecard)
}

function* watchPostCustomer() {
  yield takeEvery(POST_CUSTOMER, _postCustomer)
}
function* watchGetCustomer() {
  yield takeEvery(GET_CUSTOMER, _getCustomer)
}
function* watchGetUsers() {
  yield takeEvery(GET_CUSTOMER_OPTION_USERS, _getUser)
}
function* watchPostCustomerManager() {
  yield takeEvery(POST_CUSTOMER_MANAGER, _postCustomerManager)
}
function* watchGetCustomerDetails() {
  yield takeEvery(GET_CUSTOMER_DETAILS, _getCustomerDetails)
}
function* watchPostEditCustomer() {
  yield takeEvery(POST_EDIT_CUSTOMER, _postEditCustomer)
}
function* watchPostEditManager() {
  yield takeEvery(POST_EDIT_MANAGER_INFO, _postEditManager)
}
function* watchGetMangerInfo() {
  yield takeEvery(GET_MANAGER_INFO, _getManagerInfo)
}
function* watchPostAccFile() {
  yield takeEvery(POST_ACC_FILE, _postAccFile)
}

function* customerSaga() {
  yield all([
    fork(watchPostCustomer),
    fork(watchGetCustomer),
    fork(watchGetUsers),
    fork(watchPostCustomerManager),
    fork(watchGetCustomerDetails),
    fork(watchPostEditCustomer),
    fork(watchPostEditManager),
    fork(watchGetMangerInfo),
    fork(watchPostEditNamecard),
    fork(watchDeleteCustomer),
    fork(watchDeleteCustomerManager),
    fork(watchPostAccFile)    
  ])
}

export default customerSaga
