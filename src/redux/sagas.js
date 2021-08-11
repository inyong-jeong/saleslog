import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import salesLogSaga from './saleslog/saga';
import userSaga from './user/saga';
import accountSaga from './account/saga';
import statSaga from './stat/saga';
import notificationSaga from './notification/saga';
import organizationSaga from './organization/saga';
import BoardSaga from './board/saga';
import TripReportSaga from './tripreport/saga';

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    salesLogSaga(),
    userSaga(),
    accountSaga(),
    notificationSaga(),
    statSaga(),
    organizationSaga(),
    BoardSaga(),
    TripReportSaga()
  ]);
}
