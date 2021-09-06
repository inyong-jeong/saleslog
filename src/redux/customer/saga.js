import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { post_fetch } from 'model/FetchManage'
import {
  POST_CUSTOMER, GET_CUSTOMER, GET_CUSTOMER_OPTION_USERS
} from '../../constants/actionTypes'
import {
  postCustomer, getAllCustomer, getUsers
} from './actions'

//customer api 
const BASE_URL = 'https://backend.saleslog.co/saleslog/'
const ACC_REGISTER = 'regi_accounts'
const ACC_LIST = 'list_accounts'
const USERS_URL = 'https://backend.saleslog.co/org/search_users'

function* _postCustomer({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, BASE_URL + ACC_REGISTER, body)
    yield put(postCustomer.success(response))
    yield alert(response.message)

  } catch (error) {
    yield put(postCustomer.error(error))
    yield alert(error)
  }
}

function* _getCustomer({ payload: { body, pageno } }) {
  try {
    body.pageno = pageno
    //  console.log(body)
    const response = yield call(post_fetch, BASE_URL + ACC_LIST, body)
    yield put(getAllCustomer.success(response))

  } catch (error) {
    yield put(getAllCustomer.error(error))
    yield alert(error)
  }
}
function* _getUser({ payload: { body } }) {
  try {
    const response = yield call(post_fetch, USERS_URL, body)
    yield put(getUsers.success(response))
  } catch (error) {
    yield put(getUsers.error(error))
    yield alert(error)
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

function* customerSaga() {
  yield all([
    fork(watchPostCustomer),
    fork(watchGetCustomer),
    fork(watchGetUsers)
  ])
}

export default customerSaga
