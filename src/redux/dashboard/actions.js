import {
  GET_SALES_STAT,
  GET_LEAD_STAT,
  GET_LOGS_EXCEL_DOWNLOAD,
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getsaleslogstat = fetchActionGenerator(GET_SALES_STAT, 'body');
export const getleadlogstat = fetchActionGenerator(GET_LEAD_STAT, 'body');
export const getlogsdownload = fetchActionGenerator(GET_LOGS_EXCEL_DOWNLOAD, 'body');
