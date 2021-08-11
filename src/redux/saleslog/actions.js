import {
  POST_SALESLOG,
  PUT_SALESLOG,
  GET_SALESLOGS,
  GET_SALESLOG,
  GET_NOTABLE_SALESLOGS,
  PUT_NOTABLE_SALESLOG,
  CONCAT_LOG,
  GET_SALESLOG_COMMENT,
  POST_COMMENT,
  DELETE_SALESLOG,
  DELETE_NOTIFICATION,
  DELETE_GROUP_NOTIFICATION,
  POST_SALESLOG_FILE,
  GET_SALESLOG_FILE,
  CLEAR_SALESLOG,
  CLEAR_SALESLOGS,
  CLEAR_POST_SALESLOG_RESPONSE,
  UPDATE_FILTERED_SALESLOG,
  UPDATE_FILTERED_SALESLOG_SUCCESS,
  SEARCH_SALESLOG,
  UPDATE_SEARCHED_SALESLOG_SUCCESS,
  GET_SEARCH_SALESLOG,
  PUT_SALESLOG_COUSER,
  PUT_SALESLOG_GUIDE,
  DELETE_SALESLOG_GUIDE,
  GET_SALESLOG_NEEDS

} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

// BUISNEES LOGIC
// SALES_LOG

// - CREATE
export const postSalesLog = fetchActionGenerator(POST_SALESLOG, 'body');
// - RETRIEVE
export const getSalesLogs = fetchActionGenerator(GET_SALESLOGS, 'params', 'concat');
export const getSalesLog = fetchActionGenerator(GET_SALESLOG, 'id');
export const getNotableSalesLogs = fetchActionGenerator(GET_NOTABLE_SALESLOGS, 'page');
// - UPDATE
export const putSalesLog = fetchActionGenerator(PUT_SALESLOG, 'id', 'body', 'editFlag');
export const putNotableSalesLog = fetchActionGenerator(PUT_NOTABLE_SALESLOG, 'id', 'flag');
export const putSalesLogCoUser = fetchActionGenerator(PUT_SALESLOG_COUSER, 'id', 'user_id');
// - DELETE
export const deleteSalesLog = fetchActionGenerator(DELETE_SALESLOG, 'id');
// COMMENT
// - CREATE
export const postComments = fetchActionGenerator(POST_COMMENT, 'comments');
// - RETRIEVE
export const getSalesLogComments = fetchActionGenerator(GET_SALESLOG_COMMENT, 'id');
// SALESLOG_FILE
export const postSalesLogFile = fetchActionGenerator(POST_SALESLOG_FILE, 'fileName', 'fileType', 'id', 'file');
export const getSalesLogFile = fetchActionGenerator(GET_SALESLOG_FILE, 'id', 'fileName');
// NOTIFICATION
export const deleteNotification = fetchActionGenerator(DELETE_NOTIFICATION, 'id');
export const deleteGroupNotification = fetchActionGenerator(DELETE_GROUP_NOTIFICATION, 'group');
//SEARCH
export const getsearchsalesLog = fetchActionGenerator(GET_SEARCH_SALESLOG, 'keyword');
//GUIDE
export const putSalesLogGuide = fetchActionGenerator(PUT_SALESLOG_GUIDE, 'id', 'body');
export const deleteSalesLogGuide = fetchActionGenerator(DELETE_SALESLOG_GUIDE, 'id', 'needs_type', 'guide_type', 'index');
//NEEDS
export const getSalesLogNeeds = fetchActionGenerator(GET_SALESLOG_NEEDS, 'needs', 'fromDate', 'toDate');

// APPLICATION LOGIC
export const concatLog = (response) => ({
  type: CONCAT_LOG,
  payload: { response }
});

export const clearSalesLog = () => ({
  type: CLEAR_SALESLOG,
});

export const clearSalesLogs = () => ({
  type: CLEAR_SALESLOGS,
})

export const clearPostSalesLogResponse = () => ({
  type: CLEAR_POST_SALESLOG_RESPONSE
});

export const updateFilteredSalesLog = (salesLogList, condition) => ({
  type: UPDATE_FILTERED_SALESLOG,
  payload: { salesLogList, condition }
});

export const updateFilteredSalesLogSuccess = (salesLogFilteredList) => ({
  type: UPDATE_FILTERED_SALESLOG_SUCCESS,
  payload: { salesLogFilteredList }
});

export const searchSalesLog = (salesLogList, keywords) => ({
  type: SEARCH_SALESLOG,
  payload: { salesLogList, keywords }
});

export const updateSearchedSalesLogSuccess = (salesLogSearchedList) => ({
  type: UPDATE_SEARCHED_SALESLOG_SUCCESS,
  payload: { salesLogSearchedList }
});
