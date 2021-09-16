// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  GET_USER_ACCOUNT,
  SELECT_ACCOUNTS,
  SELECT_ACCOUNT_PERSON
} from '../../constants/actionTypes';


import {
  getUserAccounts,
  selectAccounts,
  selectAccountperson
} from './actions';

import { getUserAccountsCall } from 'model/account';

import {
  get_fetch,
  post_fetch,
  post_fetch_files
} from 'model/FetchManage'


function* _getUserAccounts({ payload: { userId } }) {
  try {
    const response = yield call(getUserAccountsCall, userId);
    yield put(getUserAccounts.success(response));
  } catch (error) {
    yield put(getUserAccounts.error(error.message));
  }
}

function* _selectAccounts({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/sel_accounts', data);
    yield put(selectAccounts.success(response));
  } catch (error) {
    yield put(selectAccounts.error(error.message));
  }
}

function* _selectAccountsperson({ payload: { data } }) {
  try {
    const response = yield call(post_fetch, 'https://backend.saleslog.co/saleslog/sel_accounts_man', data);
    yield put(selectAccountperson.success(response));
  } catch (error) {
    yield put(selectAccountperson.error(error.message));
  }
}


export function* watchGetUserAccounts() {
  yield takeEvery(GET_USER_ACCOUNT, _getUserAccounts);
}

export function* watchSelectAccounts() {
  yield takeEvery(SELECT_ACCOUNTS, _selectAccounts);
}

export function* watchSelectAccountsperson() {
  yield takeEvery(SELECT_ACCOUNT_PERSON, _selectAccountsperson);
}

function* accountSaga() {
  yield all([
    fork(watchGetUserAccounts),
    fork(watchSelectAccounts),
    fork(watchSelectAccountsperson)
  ]);
}

export default accountSaga;