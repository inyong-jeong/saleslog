import { getAccessToken, getUserId } from 'helpers/authUtils';
import { ARTICLE, ARTICLES, POST_ARTICLE_COMMENTS, COMMENTS, FILTER_ARTICLES} from '../base';
import { fetchConfig, passArgs, passQueryString } from '../utils';

export const registerArticlesCall = async (body) => {
  const response = await fetch(ARTICLES, fetchConfig("POST", body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
export const getArticlesCall = async (page, count) => {
  const response = await fetch(passQueryString(ARTICLES, {page:page, count:count}), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
export const getArticleCall = async (id) => {
  const response = await fetch(passArgs(ARTICLE, id), fetchConfig("GET", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
export const deleteArticleCall = async (id) => {
  const response = await fetch(passArgs(ARTICLE, id), fetchConfig("DELETE", null, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
export const putArticleCall = async (id, body) => {
  const response = await fetch(passArgs(ARTICLE, id), fetchConfig("PUT",body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
export const postArticleCommentsCall = async (id, body) => {
  const response = await fetch(passArgs(POST_ARTICLE_COMMENTS, id, COMMENTS), fetchConfig("POST",body, getAccessToken(), getUserId()));
  if (response.status !== 200)
    throw new Error("");
  const ret = await response.json();
  return ret;
}
export const getFilterArticlesCall = async (payload) => {
  const response = await fetch(passQueryString(FILTER_ARTICLES, payload), fetchConfig("GET", null, getAccessToken(), getUserId()));
  let status = response.status;
  const ret = await response.json();
  if (status !== 200)
    throw new Error("");
  return ret;
}