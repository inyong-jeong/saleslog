import { getAccessToken, getUserId } from 'helpers/authUtils';
import { GET_USER_ACCOUNT } from '../base';
import { fetchConfig, passArgs } from '../utils';

export const getUserAccountsCall = async (id) => {
  const response = await fetch(passArgs(GET_USER_ACCOUNT, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200) {
    throw new Error();
  }
  const ret = await response.json();
  return ret;
}