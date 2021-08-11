import { getAccessToken, getUserId } from 'helpers/authUtils';
import { GET_NOTIFICATIONS, GET_ENTITY_NOTIFICATIONS, PUT_NOTIFICATION } from '../base';
const { fetchConfig, passQueryString, passArgs } = require('../utils');


export const getNotificationsCall = async (id, page) => {
  const response = await fetch(passQueryString(passArgs(GET_NOTIFICATIONS, id), {page: page}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const getEntityNotificationsCall = async (id) => {
  const response = await fetch(passArgs(GET_ENTITY_NOTIFICATIONS, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const putNotificationCall = async (id) => {
  const response = await fetch(passArgs(PUT_NOTIFICATION, id), fetchConfig("PUT", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}