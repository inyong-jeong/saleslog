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
  DELETE_TEMPORARY_LOG_ERROR,
  GET_SALESLOGS,
  GET_SALESLOGS_SUCCESS,
  GET_SALESLOGS_ERROR,
  SEARCH_SALESLOG_LIST,
  SEARCH_SALESLOG_LIST_SUCCESS,
  SEARCH_SALESLOG_LIST_ERROR,
  GET_SALESLOG,
  GET_SALESLOG_SUCCESS,
  GET_SALESLOG_ERROR,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  PUT_COMMENT,
  PUT_COMMENT_SUCCESS,
  PUT_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  GET_COMMENT_LISTS,
  GET_COMMENT_LISTS_SUCCESS,
  GET_COMMENT_LISTS_ERROR,
  PUT_FILE,
  PUT_FILE_SUCCESS,
  PUT_FILE_ERROR,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR


} from '../../constants/actionTypes';



const INIT_STATE = {
  submitLoading: false,
  userlist: [],
  temporaryLoglists: [],
  temporaryLoglist: null,
  temporaryloglistresponse: false,
  loglist: null,
  loglistcount: null,
  searchloglist: null,
  // logresponse: false,
  //영업일지 불러오기 관련
  loadLogsLoading: false,
  loadLogsDone: false,
  loadSearchsLoading: false,
  loadSearchsDone: false,
  // hasMoreLogs: true,
  log: null,
  logneeds: null,
  logcouser: null,
  commentlists: null,
  comment: null,
  commentchange: null,
  commentdelete: null,
  getloglistloading: false,
  putfileloading: false,
  putfileuploading: false,
  deletefileloading: false,
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
    //영업일지 불러오기 관련
    case GET_SALESLOGS:
      return { ...state, loadLogsLoading: true, loadLogsDone: false };
    case GET_SALESLOGS_SUCCESS:
      return { ...state, loadLogsLoading: false, loadLogsDone: true, loglist: action.payload.response.message[0], loglistcount: action.payload.response.message[1][0].totalCnt };
    case GET_SALESLOGS_ERROR:
      return { ...state, loadLogsLoading: false, logresponse: false };
    case SEARCH_SALESLOG_LIST:
      return { ...state, loadLogsLoading: true, loadLogsDone: false };
    case SEARCH_SALESLOG_LIST_SUCCESS:
      return { ...state, loglist: action.payload.response.message, loadLogsLoading: false, loadLogsDone: true };
    case SEARCH_SALESLOG_LIST_ERROR:
      return { ...state, loadLogsLoading: false, loadLogsDone: false };
    case GET_SALESLOG:
      return { ...state, getloglistloading: true };
    case GET_SALESLOG_SUCCESS:
      return { ...state, getloglistloading: false, log: action.payload.response.message[0][0], logcouser: action.payload.response.message[1], logneeds: action.payload.response.message[2] };
    case GET_SALESLOG_ERROR:
      return { ...state, getloglistloading: false };
    //피드백 관련
    case POST_COMMENT:
      return { ...state };
    case POST_COMMENT_SUCCESS:
      return { ...state, comment: action.payload.response.message.insertId };
    case POST_COMMENT_ERROR:
      return { ...state };
    case PUT_COMMENT:
      return { ...state };
    case PUT_COMMENT_SUCCESS:
      return { ...state, commentchange: action.payload.response.message };
    case PUT_COMMENT_ERROR:
      return { ...state };
    case DELETE_COMMENT:
      return { ...state };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, commentdelete: action.payload.response.message };
    case DELETE_COMMENT_ERROR:
      return { ...state };
    case GET_COMMENT_LISTS:
      return { ...state };
    case GET_COMMENT_LISTS_SUCCESS:
      return { ...state, commentlists: action.payload.response.message };
    case GET_COMMENT_LISTS_ERROR:
      return { ...state };
    //첨부파일
    case PUT_FILE:
      return { ...state, putfileloading: false };
    case PUT_FILE_SUCCESS:
      return { ...state, putfileloading: true };
    case PUT_FILE_ERROR:
      return { ...state, putfileloading: false };
    case DELETE_FILE:
      return { ...state, deletefileloading: false };
    case DELETE_FILE_SUCCESS:
      return { ...state, deletefileloading: true };
    case DELETE_FILE_ERROR:
      return { ...state, deletefileloading: false };
    default:
      return { ...state };
  }
};

export default SalesLog;