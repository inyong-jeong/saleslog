import {
  REGISTER_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE,
  DELETE_ARTICLE,
  PUT_ARTICLE,
  POST_ARTICLE_COMMENT,
  GET_FILTER_ARTICLES,
  FILTER_CONCAT_LOG,
  CLEAR_FILTER_ARTICLES,
  SET_BOARD_RADIOBOX
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

// BUISNEES LOGIC
// COMMENT
// - CREATE
// export const postComments = fetchActionGenerator(POST_COMMENT, 'comments');
// // - RETRIEVE
// export const getSalesLogComments = fetchActionGenerator(GET_SALESLOG_COMMENT, 'id');
//BOARD
// export const registerArticles = (body) => ({
  
//   type: REGISTER_ARTICLE,
//   payload: body,

// });
export const registerArticles = fetchActionGenerator(REGISTER_ARTICLE, 'Article');
export const getArticles = fetchActionGenerator(GET_ARTICLES,'page', 'count');
export const getArticle = fetchActionGenerator(GET_ARTICLE,'id');
export const deleteArticle =fetchActionGenerator(DELETE_ARTICLE,'id');
export const putArticle =fetchActionGenerator(PUT_ARTICLE,'id', 'body');
export const postArticleComments =fetchActionGenerator(POST_ARTICLE_COMMENT,'id', 'body');
export const getFilterArticles = fetchActionGenerator(GET_FILTER_ARTICLES,'params', 'concat');

export const filterconcatLog = (response) => ({
  type: FILTER_CONCAT_LOG,
  payload: { response }
});

export const clearfilterarticles = () => ({
  type: CLEAR_FILTER_ARTICLES,
})


export const setBoardRadiobox = (bool) => ({
  type: SET_BOARD_RADIOBOX,
  payload: { bool } 
});
// // APPLICATION LOGIC
// export const concatLog = (response) => ({
//   type: CONCAT_LOG,
//   payload: { response }
// });

// export const clearSalesLog = () => ({
//   type: CLEAR_SALESLOG,
// });


// export const searchSalesLog = (salesLogList, keywords) => ({
//   type: SEARCH_SALESLOG,
//   payload: { salesLogList, keywords }
// });
