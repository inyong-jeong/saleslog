// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    GET_ORGANIZATION,
    GET_USERS
} from '../../constants/actionTypes';


import {
    getOrganization,
    getUsers
} from './actions';

import { getOrganizationCall, getUsersCall } from 'model/organization';


function* _getOrganization({payload: { orgId }}) {
    try {
        const response = yield call(getOrganizationCall, orgId);
        yield put(getOrganization.success(response));
    } catch (error) {
        yield put(getOrganization.error(error.message));
    }
}

function* _getUsers({payload: { orgId }}) {
    try {
        const response = yield call(getUsersCall, orgId);
        yield put(getUsers.success(response));
    } catch (error) {
        yield put(getUsers.error(error.message));
    }
}

export function* watchGetOragnization() {
    yield takeEvery(GET_ORGANIZATION, _getOrganization);
}

export function* watchGetUsers() {
    yield takeEvery(GET_USERS, _getUsers);
}

function* organizationSaga() {
    yield all([
        fork(watchGetOragnization),
        fork(watchGetUsers)
    ]);
}

export default organizationSaga;