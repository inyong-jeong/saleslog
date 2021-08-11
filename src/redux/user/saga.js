// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  GET_USER,
  GET_USER_TREE,
  GET_USERS
} from '../../constants/actionTypes';


import {
  getUser,
  getUserTree,
  getUserList
} from './actions';

import { getUserCall, getUserTreeCall, getUserListCall } from 'model/user';

function* _getUser({ payload: { userId } }) {
  try {
    const response = yield call(getUserCall, userId);
    console.log(response);
    yield put(getUser.success(response));
  } catch (error) {
    yield put(getUser.error(error.message));
  }
}

function* _getUserTree({ payload: { userId } }) {
  try {
    const response = yield call(getUserTreeCall, userId);
    yield put(getUserTree.success(response));
  } catch (error) {
    yield put(getUserTree.error(error.message));
  }
}

function* _getUserList({ payload: { userId } }) {
  try {
    const response = yield call(getUserListCall, userId);
    yield put(getUserList.success(response));
  } catch (error) {
    yield put(getUserList.error(error.message));
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, _getUser);
}

export function* watchGetUserTree() {
  yield takeEvery(GET_USER_TREE, _getUserTree);
}

export function* watchGetUserList() {
  yield takeEvery(GET_USERS, _getUserList);
}

function* userSaga() {
  yield all([
    fork(watchGetUser),
    fork(watchGetUserTree),
    fork(watchGetUserList)

  ]);
}

export default userSaga;