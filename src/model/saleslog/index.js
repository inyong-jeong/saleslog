import { getAccessToken, getUserId } from 'helpers/authUtils';
import {
  GET_SALESLOGS,
  GET_NOTABLE_SALESLOGS,
  POST_SALESLOG_FILE,
  GET_SALESLOG,
  GET_COACHING,
  GET_NEEDS_DETAIL,
  GET_SALESLOG_FILE,
  DELETE_SALESLOG_FILE,
  GET_SEARCH_SALESLOG,
  PUT_SALESLOG_COUSER,
  PUT_NOTABLE_SALESLOGS,
  PUT_SALESLOG_GUIDE,
  DELETE_SALESLOG_GUIDE,
  GET_SALESLOG_NEEDS,
} from '../base';
import { fetchConfig, fetchConfigFile, passArgs, passQueryString } from '../utils';

export const postSalesLogCall = async (body) => {
  const response = await fetch(GET_SALESLOGS, fetchConfig("POST", body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}


export const putSalesLogCall = async (id, body, editFlag) => {
  const response = await fetch(passQueryString(passArgs(GET_SALESLOGS, id), { editFlag: editFlag }), fetchConfig("PUT", body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getSalesLogsCall = async (payload) => {
  const response = await fetch(passQueryString(GET_SALESLOGS, payload), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const getNotableSalesLogsCall = async (page) => {
  const response = await fetch(passQueryString(GET_NOTABLE_SALESLOGS, { page: page }), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const putNotableSalesLogCall = async (id, flag) => {
  const response = await fetch(passQueryString(passArgs(PUT_NOTABLE_SALESLOGS, id), { flag: flag }), fetchConfig("PUT", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const getSalesLogCall = async (id) => {
  const response = await fetch(passArgs(GET_SALESLOG, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const getSalesLogFileCall = async (id, fileName) => {
  const response = await fetch(passQueryString(passArgs(GET_SALESLOG_FILE, id), { fileName: fileName }), fetchConfig("GET", null, getAccessToken(), getUserId()));
  const ret = await response.json();
  window.open(ret);
  return ret;
}

export const deleteSalesLogCall = async (id) => {
  const response = await fetch(passArgs(GET_SALESLOG, id), fetchConfig("DELETE", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const postSalesLogFileCall = async (fileName, fileType, id, file) => {
  const fileUrlResponse = await fetch(passArgs(POST_SALESLOG_FILE, id), fetchConfig("POST", { fileName: fileName, fileType: fileType }, getAccessToken(), getUserId()))
  const url = await fileUrlResponse.json();
  const response = await fetch(url, fetchConfigFile("PUT", file, {}));
  return response;
}

export const deleteSalesLogFileCall = async (fileName, id) => {
  const response = await fetch(DELETE_SALESLOG_FILE.replace('{id}', id) + fileName, fetchConfig("DELETE", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;

}

export const getCoachingCall = async () => {
  const response = await fetch(GET_COACHING, fetchConfig("GET", null));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getNeedsDetailCall = async () => {
  const response = await fetch(GET_NEEDS_DETAIL, fetchConfig("GET", null));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}


export const getsearchsalesLogcall = async (keyword) => {
  const response = await fetch(passQueryString(GET_SEARCH_SALESLOG, { keyword: keyword }), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const putSalesLogCoUserCall = async (id, user_id) => {
  const response = await fetch(PUT_SALESLOG_COUSER.replace('{id}', id) + '?' + 'user_id' + '=' + user_id, fetchConfig("PUT", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const putSalesLogGuideCall = async (id, body) => {
  const response = await fetch(passArgs(PUT_SALESLOG_GUIDE, id), fetchConfig("PUT", body, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const deleteSalesLogGuideCall = async (id, needs_type, guide_type, index) => {
  const response = await fetch(DELETE_SALESLOG_GUIDE.replace('{id}', id) + '?' + 'needs_type' + '=' + needs_type + '&' + 'guide_type' + '=' + guide_type + '&' + 'index' + '=' + index, fetchConfig("DELETE", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const getSalesLogNeedsCall = async (needs, fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_SALESLOG_NEEDS, { needs: needs, fromDate: fromDate, toDate: toDate }), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}