import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import salesLogSaga from './saleslog/saga';
import accountSaga from './account/saga';

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    salesLogSaga(),
    accountSaga(),
  ]);
}
