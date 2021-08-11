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
} from '../../constants/actionTypes';

const INIT_STATE = {
  boardRadiobox:null,
  registerArticleResponse:null,
  registerArticleLoading:false,
  getArticlesResponse:[],
  getArticleResponse:{},
  deleteArticleResponse:[],
  putArticleResponse:[],
  getArticleCommentsResponse:[]
}

const Board = (state=INIT_STATE, action) => {
switch (String(action.type)) {
  case REGISTER_ARTICLE:
    return {...state, registerArticleLoading:false};
  case 'REGISTER_ARTICLE_SUCCESS':
    return {...state, registerArticleResponse:action.payload.response, registerArticleLoading:true};
    case GET_ARTICLES:
    return {...state};
  case 'GET_ARTICLES_SUCCESS':
    return {...state, getArticlesResponse:action.payload.response};
  case GET_ARTICLE:
    return {...state};
  case 'GET_ARTICLE_SUCCESS':
    return {...state, getArticleResponse:action.payload.response, registerArticleLoading:false};
    case DELETE_ARTICLE:
    return {...state};
  case 'DELETE_ARTICLE_SUCCESS':
    return {...state, deleteArticleResponse:action.payload.response};
    case PUT_ARTICLE:
    return {...state};
  case 'PUT_ARTICLE_SUCCESS':
    return {...state, putArticleResponse:action.payload.response};
  case POST_ARTICLE_COMMENT:
    return {...state};
  case 'POST_ARTICLE_COMMENT_SUCCESS':
    return {...state, getArticleCommentsResponse:action.payload.response};
  case GET_FILTER_ARTICLES:
		return {...state};
	case 'GET_FILTER_ARTICLES_SUCCESS':		
		return {...state, getArticlesResponse: action.payload.response};
  case FILTER_CONCAT_LOG:
    return {...state, getArticlesResponse: [...state.getArticlesResponse].concat(action.payload.response)};     
  case CLEAR_FILTER_ARTICLES:
    return {...state, getArticlesResponse: []};
  case SET_BOARD_RADIOBOX:
    return {...state, boardRadiobox:action.payload.bool};
  default:
    return {...state};			
}
};

export default Board;