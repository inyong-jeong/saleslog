// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  SELECT_ACCOUNTS,
  SELECT_ACCOUNT_PERSON
} from '../../constants/actionTypes';


import {
  selectAccounts,
  selectAccountperson
} from './actions';


import {
  post_fetch,
} from 'model/FetchManage'




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


export function* watchSelectAccounts() {
  yield takeEvery(SELECT_ACCOUNTS, _selectAccounts);
}

export function* watchSelectAccountsperson() {
  yield takeEvery(SELECT_ACCOUNT_PERSON, _selectAccountsperson);
}

function* accountSaga() {
  yield all([
    fork(watchSelectAccounts),
    fork(watchSelectAccountsperson)
  ]);
}

export default accountSaga;