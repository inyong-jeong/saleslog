import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import salesLogSaga from './saleslog/saga';
import accountSaga from './account/saga';
import customerSaga from './customer/saga';
import WorkgroupSaga from './workgroup/saga';
import organizationSaga from './organization/saga';
import profileSaga from './profile/saga';
import supportSaga from './support/saga';
import dashboardSaga from './profile/saga';
import EtcSaga from './etc/saga';





export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    salesLogSaga(),
    accountSaga(),
    customerSaga(),
    WorkgroupSaga(),
    organizationSaga(),
    profileSaga(),
    supportSaga(),
    dashboardSaga(),
    EtcSaga()
  ]);
}
