import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import salesLogSaga from './saleslog/saga';
import accountSaga from './account/saga';
import customerSaga from './customer/saga';


export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    salesLogSaga(),
    accountSaga(),
    customerSaga()

  ]);
}
