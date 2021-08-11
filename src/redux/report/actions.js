import {
  GET_DASHBOARD_STAT
} from 'constants/actionTypes';
import { fetchActionGenerator } from '../utils';


export const getSalesLogCount = fetchActionGenerator(GET_SALESLOG_COUNT, 'fromDate', 'toDate');
export const getSalesLogDistriubtion = fetchActionGenerator(GET_SALESLOG_DISTRIUBTION, 'fromDate', 'toDate');
export const getAccountsCount = fetchActionGenerator(GET_ACCOUNTS_COUNT, 'fromDate', 'toDate');
export const getSalesLogGroupCount = fetchActionGenerator(GET_SALESLOGGROUP_COUNT, 'fromDate', 'toDate');
export const getCommentsCount = fetchActionGenerator(GET_COMMENTS_COUNT, 'fromDate', 'toDate');
