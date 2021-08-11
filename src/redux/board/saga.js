// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    REGISTER_ARTICLE,
    GET_ARTICLES,
    GET_ARTICLE,
    DELETE_ARTICLE,
    PUT_ARTICLE,
    POST_ARTICLE_COMMENT,
    GET_FILTER_ARTICLES
} from '../../constants/actionTypes';
import {
    registerArticles,
    getArticle,
    getArticles,
    deleteArticle,
    putArticle,
    postArticleComments,
    filterconcatLog,
    getFilterArticles
} from './actions';
import {
    registerArticlesCall,
    getArticleCall,
    getArticlesCall,
    deleteArticleCall,
    putArticleCall,
    postArticleCommentsCall,
    getFilterArticlesCall
} from 'model/board';



function* _registerArticleAsync({ payload: { Article } })
{ 
  try {
    const response = yield call(registerArticlesCall, Article);
    console.log(response);
    yield put(registerArticles.success(response));
    yield alert("게시글이 저장되었습니다.");
    console.log(response);
} catch (error) {
  console.log('errors');
  yield put(registerArticles.error(error));
}
}

function* _getArticlesAsync({ payload: { page, count } })
{ 
  try {
    const response = yield call(getArticlesCall, page, count);
    yield put(getArticles.success(response));
} catch (error) {
  console.log('errors');
}
}

function* _getArticleAsync({ payload: { id } })
{ 
  try {
    const response = yield call(getArticleCall, id);
    yield put(getArticle.success(response));
    // yield alert("게시글을 불러왔습니다.");
    console.log(response);
} catch (error) {
  console.log('errors');
}
}

function* _deleteArticleAsync( {payload: { id } })
{ 
  try {
    const response = yield call(deleteArticleCall, id);
    yield put(deleteArticle.success(response));
    yield alert("게시글이 삭제되었습니다.");
    console.log(response);
} catch (error) {
  console.log('errors');
}
}

function* _putArticleAsync({ payload: { id, body} })
{ 
  try {
    const response = yield call(putArticleCall, id, body);
    yield put(putArticle.success(response));
    yield alert("게시글이 수정되었습니다.");
    console.log(response);
} catch (error) {
  console.log('errors');
}
}

function* _postArticleCommentsAsync({ payload: { id, body} })
{ 
  try {
    const response = yield call(postArticleCommentsCall, id, body);
    yield put(postArticleComments.success(response));
    yield alert("댓글이 추가되었습니다.");
    console.log(response);
} catch (error) {
  console.log('errors');
}
}

function* _getFilterArticles({ payload: { params, concat } }) {
  try {

      const response = yield call(getFilterArticlesCall, params);
      if (concat)
          yield put(filterconcatLog(response));
      else
          yield put(getFilterArticles.success(response));
  } catch (error) {
      yield put(getFilterArticles.error(error));
  }
}


export function* watchregisterArticles() {
  yield takeEvery(REGISTER_ARTICLE, _registerArticleAsync);
}

export function* watchgetArticles() {
  yield takeEvery(GET_ARTICLES, _getArticlesAsync);
}

export function* watchgetArticle() {
  yield takeEvery(GET_ARTICLE, _getArticleAsync);
}

export function* watchdeleteArticle() {
  yield takeEvery(DELETE_ARTICLE, _deleteArticleAsync);
}

export function* watchputArticle() {
  yield takeEvery(PUT_ARTICLE, _putArticleAsync);
}

export function* watchpostArticleComments() {
  yield takeEvery(POST_ARTICLE_COMMENT, _postArticleCommentsAsync);
}

export function* watchGetFilterArticles() {
  yield takeEvery(GET_FILTER_ARTICLES, _getFilterArticles);
}

function* BoardSaga() {
    yield all([
        fork(watchregisterArticles),
        fork(watchgetArticles),
        fork(watchgetArticle),
        fork(watchdeleteArticle),
        fork(watchputArticle),
        fork(watchpostArticleComments),
        fork(watchGetFilterArticles)
    ]);
}

export default BoardSaga;