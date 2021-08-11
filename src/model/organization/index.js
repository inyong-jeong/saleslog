import { getAccessToken, getUserId } from 'helpers/authUtils';
import { GET_ORGANIZATION, GET_USERS } from '../base';
import { fetchConfig, passArgs } from '../utils';


export const getOrganizationCall = async (id) => {
  const response = await fetch(passArgs(GET_ORGANIZATION, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}

export const getUsersCall = async (id) => {
  const response = await fetch(passArgs(GET_USERS, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}
