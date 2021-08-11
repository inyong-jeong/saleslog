import { getAccessToken, getUserId } from 'helpers/authUtils';
import {
  GET_TRIP_SALESLOG,
  POST_TRIP_SALESLOG,
  GET_TRIPS_SALESLOG,
  PUT_TRIP_SALESLOG,
  DELETE_TRIP_SALESLOG,
} from '../base';
import { fetchConfig, fetchConfigFile, passArgs, passQueryString } from '../utils';

export const getTripsSalesLogCall = async (fromDate, toDate) => {
  const response = await fetch(passQueryString(GET_TRIPS_SALESLOG, { fromDate: fromDate, toDate: toDate }), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const postTripSalesLogCall = async (body) => {
  const response = await fetch(POST_TRIP_SALESLOG, fetchConfig("POST", body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getTripSalesLogCall = async (id) => {
  const response = await fetch(GET_TRIP_SALESLOG.replace('{id}', id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const putTripSalesLogCall = async (body) => {
  const response = await fetch(PUT_TRIP_SALESLOG, fetchConfig("PUT", body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const deleteTripSalesLogCall = async (id) => {
  const response = await fetch(DELETE_TRIP_SALESLOG.replace('{id}', id), fetchConfig("DELETE", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
