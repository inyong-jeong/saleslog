import { getAccessToken, getUserId } from 'helpers/authUtils';
import { GET_USER, GET_USER_TREE, GET_USERS } from '../base';
import { fetchConfig, passArgs } from '../utils';

export const getUserCall = async (id) => {
  const response = await fetch(passArgs(GET_USER, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  console.log(response)
  if (response.status !== 200) {
    const errorBody = await response.json();
    throw new Error(JSON.stringify(errorBody));
  }
  const ret = await response.json();
  return ret;
}

export const getUserTreeCall = async (id) => {
  const response = await fetch(passArgs(GET_USER_TREE, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200) {
    throw new Error();
  }
  const ret = await response.json();
  return ret;
}

export const getUserListCall = async (id) => {
  const response = await fetch(passArgs(GET_USERS, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200) {
    throw new Error();
  }
  const ret = await response.json();
  return ret;
}