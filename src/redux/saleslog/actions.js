import {
  POST_SALESLOG,
  POST_TEMPORARY_SALESLOG,
  UPLOAD_FILE,
  SELECT_USER_LIST,
  GET_TEMPORARY_LISTS,
  GET_TEMPORARY_LIST,
  DELETE_TEMPORARY_LOG
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postSalesLog = fetchActionGenerator(POST_SALESLOG, 'data');
export const postTemporarySalesLog = fetchActionGenerator(POST_TEMPORARY_SALESLOG, 'data');
export const uploadFile = fetchActionGenerator(UPLOAD_FILE, 'data');
export const getUserList = fetchActionGenerator(SELECT_USER_LIST, 'data');
export const getTemporaryLogLists = fetchActionGenerator(GET_TEMPORARY_LISTS);
export const getTemporaryLogList = fetchActionGenerator(GET_TEMPORARY_LIST, 'data');
export const deleteTemporaryLogList = fetchActionGenerator(DELETE_TEMPORARY_LOG, 'data');



