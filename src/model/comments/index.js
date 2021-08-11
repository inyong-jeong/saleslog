import { getAccessToken, getUserId } from 'helpers/authUtils';
import { COMMENTS, POST_COMMENTS } from '../base';
import { fetchConfig, passArgs } from '../utils';

export const postCommentsCall = async (body) => {
  const response = await fetch(POST_COMMENTS, fetchConfig("POST", body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}

export const getSalesLogCommentsCall = async (id) => {
  const response = await fetch(passArgs(COMMENTS, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}