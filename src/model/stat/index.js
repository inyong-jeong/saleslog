import { getAccessToken, getUserId } from 'helpers/authUtils';
import { GET_DASHBOARD_STAT,
        GET_STAT_TYPE1,
        GET_STAT_TYPE2, 
        GET_STAT_TYPE3, 
        GET_STAT_TYPE4, 
        GET_STAT_TYPE5,
        GET_SALES_LOG_SHEET
      } from '../base';
const { fetchConfig, passQueryString } = require('../utils');

export const getDashBoardStatCall = async (fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_DASHBOARD_STAT, {fromDate: fromDate, toDate: toDate}), 
    fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getStatType1Call = async (type, fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_STAT_TYPE1, {statType: type, fromDate: fromDate, toDate: toDate}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getStatType2Call = async (type, fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_STAT_TYPE2, {statType: type, fromDate: fromDate, toDate: toDate}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getStatType3Call = async (type, fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_STAT_TYPE3, {statType: type, fromDate: fromDate, toDate: toDate}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getStatType4Call = async (type, fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_STAT_TYPE4, {statType: type, fromDate: fromDate, toDate: toDate}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getStatType5Call = async (type, fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_STAT_TYPE5, {statType: type, fromDate: fromDate, toDate: toDate}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getSalesLogSheetCall = async (year, month) => {
  const headers = {
      "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Authorization": getAccessToken(),
      "UserId": getUserId()
  };
  const response = await fetch(passQueryString(GET_SALES_LOG_SHEET, {year: year, month: month}), fetchConfig("GET", null, null, null, headers));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.blob();
  return ret;  
}