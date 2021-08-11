// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    GET_USER_ACCOUNT
} from '../../constants/actionTypes';


import {
    getUserAccounts
} from './actions';

import { getUserAccountsCall } from 'model/account';


function* _getUserAccounts({payload: { userId }}) {
    try {
        const response = yield call(getUserAccountsCall, userId);
        yield put(getUserAccounts.success(response));
    } catch (error) {
        yield put(getUserAccounts.error(error.message));
    }
}


export function* watchGetUserAccounts() {
    yield takeEvery(GET_USER_ACCOUNT, _getUserAccounts);
}

function* accountSaga() {
    yield all([
        fork(watchGetUserAccounts)
    ]);
}

export default accountSaga;