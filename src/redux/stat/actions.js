import {
  GET_DASHBOARD_STAT,
  GET_STAT_TYPE1,
  GET_STAT_TYPE2,
  GET_STAT_TYPE3,
  GET_STAT_TYPE4,
  GET_STAT_TYPE5,
  GET_SALES_LOG_SHEET
} from 'constants/actionTypes';
import { fetchActionGenerator } from '../utils';


export const getDashBoardStat = fetchActionGenerator(GET_DASHBOARD_STAT, 'fromDate', 'toDate');
export const getStatType1 = fetchActionGenerator(GET_STAT_TYPE1, 'type', 'fromDate', 'toDate');
export const getStatType2 = fetchActionGenerator(GET_STAT_TYPE2, 'type', 'fromDate', 'toDate');
export const getStatType3 = fetchActionGenerator(GET_STAT_TYPE3, 'type', 'fromDate', 'toDate');
export const getStatType4 = fetchActionGenerator(GET_STAT_TYPE4, 'type', 'fromDate', 'toDate');
export const getStatType5 = fetchActionGenerator(GET_STAT_TYPE5, 'type', 'fromDate', 'toDate');
export const getSalesLogSheet = fetchActionGenerator(GET_SALES_LOG_SHEET, 'year', 'month');
