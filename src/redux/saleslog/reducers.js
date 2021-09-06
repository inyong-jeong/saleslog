import {
  POST_SALESLOG,
  POST_SALESLOG_SUCCESS,
  POST_SALESLOG_ERROR,
  POST_TEMPORARY_SALESLOG,
  POST_TEMPORARY_SALESLOG_SUCCESS,
  POST_TEMPORARY_SALESLOG_ERROR,
  SELECT_USER_LIST,
  SELECT_USER_LIST_SUCCESS,
  SELECT_USER_LIST_ERROR,
  GET_TEMPORARY_LISTS,
  GET_TEMPORARY_LISTS_SUCCESS,
  GET_TEMPORARY_LISTS_ERROR,
  GET_TEMPORARY_LIST,
  GET_TEMPORARY_LIST_SUCCESS,
  GET_TEMPORARY_LIST_ERROR,
  DELETE_TEMPORARY_LOG,
  DELETE_TEMPORARY_LOG_SUCCESS,
  DELETE_TEMPORARY_LOG_ERROR

} from '../../constants/actionTypes';

const INIT_STATE = {
  submitLoading: false,
  userlist: [],
  temporaryLoglists: [],
  temporaryLoglist: null,
  temporaryloglistresponse: false

};

const SalesLog = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    case POST_SALESLOG:
      return { ...state, submitLoading: true };
    case POST_SALESLOG_SUCCESS:
      return { ...state, postSalesLogResponse: action.payload.response, submitLoading: false };
    case POST_SALESLOG_ERROR:
      return { ...state, postSalesLogError: action.payload.error, submitLoading: false };
    case POST_TEMPORARY_SALESLOG:
      return { ...state, submitLoading: true };
    case POST_TEMPORARY_SALESLOG_SUCCESS:
      return { ...state, postTemporarySalesLogResponse: action.payload.response, submitLoading: false };
    case POST_TEMPORARY_SALESLOG_ERROR:
      return { ...state, postTemporarySalesLogError: action.payload.error, submitLoading: false };
    case SELECT_USER_LIST:
      return { ...state, submitLoading: true };
    case SELECT_USER_LIST_SUCCESS:
      return { ...state, userlist: action.payload.response.message, submitLoading: false };
    case SELECT_USER_LIST_ERROR:
      return { ...state, userlisterror: action.payload.error, submitLoading: false };
    case GET_TEMPORARY_LISTS:
      return { ...state };
    case GET_TEMPORARY_LISTS_SUCCESS:
      return { ...state, temporaryLoglists: action.payload.response.message };
    case GET_TEMPORARY_LISTS_ERROR:
      return { ...state, temporaryLoglisterror: action.payload.error };
    case GET_TEMPORARY_LIST:
      return { ...state, submitLoading: true };
    case GET_TEMPORARY_LIST_SUCCESS:
      return { ...state, temporaryLoglist: action.payload.response.message, temporaryloglistresponse: true };
    case GET_TEMPORARY_LIST_ERROR:
      return { ...state, temporaryLoglisterror: action.payload.error, submitLoading: false };
    case DELETE_TEMPORARY_LOG:
      return { ...state, submitLoading: true };
    case DELETE_TEMPORARY_LOG_SUCCESS:
      return { ...state, deletetemporaryLogresponse: action.payload.response.message.fieldCount };
    case DELETE_TEMPORARY_LOG_ERROR:
      return { ...state, };
    default:
      return { ...state };
  }
};

export default SalesLog;