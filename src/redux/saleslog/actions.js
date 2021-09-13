import {
  POST_SALESLOG,
  POST_TEMPORARY_SALESLOG,
  UPLOAD_FILE,
  SELECT_USER_LIST,
  GET_TEMPORARY_LISTS,
  GET_TEMPORARY_LIST,
  DELETE_TEMPORARY_LOG,
  GET_SALESLOGS,
  GET_SALESLOG,
  SEARCH_SALESLOG_LIST,
  PUT_SALESLOG,
  PUT_FILE,
  DELETE_FILE,
  POST_COMMENT,
  PUT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LISTS
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';
//일지 작성관련

export const postSalesLog = fetchActionGenerator(POST_SALESLOG, 'data');
export const postTemporarySalesLog = fetchActionGenerator(POST_TEMPORARY_SALESLOG, 'data');
export const uploadFile = fetchActionGenerator(UPLOAD_FILE, 'data');
export const getUserList = fetchActionGenerator(SELECT_USER_LIST, 'data');
export const getTemporaryLogLists = fetchActionGenerator(GET_TEMPORARY_LISTS);
export const getTemporaryLogList = fetchActionGenerator(GET_TEMPORARY_LIST, 'data');
export const deleteTemporaryLogList = fetchActionGenerator(DELETE_TEMPORARY_LOG, 'data');

//영업일지 관련
export const getLogLists = fetchActionGenerator(GET_SALESLOGS, 'data');
export const getLogList = fetchActionGenerator(GET_SALESLOG, 'data');
export const searchLogList = fetchActionGenerator(SEARCH_SALESLOG_LIST, 'data');
export const putSalesLog = fetchActionGenerator(PUT_SALESLOG, 'data');
export const putFile = fetchActionGenerator(PUT_FILE, 'data');
export const deleteFile = fetchActionGenerator(DELETE_FILE, 'data');

//피드백 관련

export const postComment = fetchActionGenerator(POST_COMMENT, 'data');
export const putComment = fetchActionGenerator(PUT_COMMENT, 'data');
export const deleteComment = fetchActionGenerator(DELETE_COMMENT, 'data');
export const getCommentLists = fetchActionGenerator(GET_COMMENT_LISTS, 'data');
