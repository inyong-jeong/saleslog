import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch, post_fetch_files } from 'model/FetchManage'
import {
  POST_CUSTOMER, GET_CUSTOMER, GET_CUSTOMER_OPTION_USERS, POST_CUSTOMER_MANAGER,
  GET_CUSTOMER_DETAILS,
  POST_EDIT_CUSTOMER
} from '../../constants/actionTypes'
import {
  postCustomer, getAllCustomer, getUsers, postCustomerManger,
  getCustomerDetails, postEditCustomer
} from './actions'

//customer api 
const BASE_URL = 'https://backend.saleslog.co/saleslog/'
const ACC_REGISTER = 'regi_accounts'
const ACC_EDIT = 'upd_accounts'
const ACC_MAN_REGISTER = 'regi_accounts_man'
const ACC_LIST = 'list_accounts'
const USERS_URL = 'https://backend.saleslog.co/org/search_users'
const CUSTOMER_DETAILS = 'detail_accounts'

function* _postEditCustomer({ payload: { body } }) {
  console.log('SAGA :::::::', body)
  try {
    const response = yield call(post_fetch, BASE_URL + ACC_EDIT, body)
    console.log(response)
    yield put(postEditCustomer.success(response))
    yield alert(response.message)

  } catch (error) {
    yield put(postEditCustomer.error(error))
  }
}

function* _getCustomerDetails({ payload: { body } }) {
  try {
    console.log(body)
    const response = yield call(post_fetch, BASE_URL + CUSTOMER_DETAILS, body)
    //console.log(response)
    yield put(getCustomerDetails.success(response))

  }
  catch (error) {
    yield put(getCustomerDetails.error(error))
    // yield alert(error)

  }
}
function* _postCustomerManager({ payload: { body } }) {
  try {
    console.log(body)
    const response = yield call(post_fetch_files, BASE_URL + ACC_MAN_REGISTER, body)
    yield put(postCustomerManger.success(response))
    yield alert(response.message)

  } catch (error) {
    yield put(postCustomerManger.error(error))
    //  yield alert(error)
  }
}

function* _postCustomer({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, BASE_URL + ACC_REGISTER, body)
    console.log(response)
    yield put(postCustomer.success(response))
    yield alert(response.message)

  } catch (error) {
    yield put(postCustomer.error(error))
    // yield alert(error)
  }
}

function* _getCustomer({ payload: { body, pageno } }) {
  try {
    body.pageno = pageno
    const response = yield call(post_fetch, BASE_URL + ACC_LIST, body)
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

function* customerSaga() {
  yield all([
    fork(watchPostCustomer),
    fork(watchGetCustomer),
    fork(watchGetUsers),
    fork(watchPostCustomerManager),
    fork(watchGetCustomerDetails),
    fork(watchPostEditCustomer)
  ])
}

export default customerSaga
