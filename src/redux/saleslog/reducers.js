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
  DELETE_FILE_ERROR,
  CLEAR_SALESLOG,
  CLEAR_TEMP_LOG,
  POST_AUTO_SALESLOG,
  POST_AUTO_SALESLOG_SUCCESS,
  POST_AUTO_SALESLOG_ERROR,
  DELETE_SALESLOG,
  DELETE_SALESLOG_SUCCESS,
  DELETE_SALESLOG_ERROR,
  PUT_SALESLOG,
  PUT_SALESLOG_SUCCESS,
  PUT_SALESLOG_ERROR,
  SET_SALES_GB,
  PUT_COUSER,
  PUT_COUSER_SUCCESS,
  PUT_COUSER_ERROR,
  DELETE_COUSER,
  DELETE_COUSER_SUCCESS,
  DELETE_COUSER_ERROR,
  SET_KEYWORD
} from '../../constants/actionTypes';

const INIT_STATE = {
  StoredData: null,
  StoredDataResponse: false,
  posttempres: false,
  submitLoading: false,
  userlist: [],
  temporaryLoglists: [],
  temporaryLoglist: null,
  temporaryloglistresponse: false,
  tempodone: false,
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
  //피드백 변경
  commentchange: null,
  comcgresponse: false,
  commentdelete: null,
  getloglistloading: false,
  putfileloading: false,
  putfileuploading: false,
  deletefileloading: false,
  autoresponse: null,
  postautoresponse: null,
  //피드백 반응
  commentres: false,
  //일지 삭제 response
  deletelog: false,
  //일지수정 response
  putlog: false,
  //일지 작성 response
  postlog: false,
  //공동작성자 관련 response,
  putcouser: false,
  deletecouser: false,
  //임시저장 삭제 response
  deletetempresponse: false,
  salesgb: '0010001',
  keyword: '',
  userlistresponse: false
};

const SalesLog = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    case SET_KEYWORD:
      return { ...state, keyword: action.payload };
    case CLEAR_SALESLOG:
      return { ...state, log: null };
    case CLEAR_TEMP_LOG:
      return { ...state, temporaryLoglist: null };
    case SET_SALES_GB:
      return { ...state, salesgb: action.payload };
    case POST_SALESLOG:
      return { ...state, submitLoading: true, postlog: false };
    case POST_SALESLOG_SUCCESS:
      return { ...state, postSalesLogResponse: action.payload.response, submitLoading: false, postlog: true };
    case POST_SALESLOG_ERROR:
      return { ...state, postlog: false };
    case PUT_SALESLOG:
      return { ...state, submitLoading: true, putlog: false };
    case PUT_SALESLOG_SUCCESS:
      return { ...state, putlog: true, submitLoading: false };
    case PUT_SALESLOG_ERROR:
      return { ...state, putlog: false };
    case DELETE_SALESLOG:
      return { ...state, submitLoading: true, deletelog: false };
    case DELETE_SALESLOG_SUCCESS:
      return { ...state, submitLoading: false, deletelog: true };
    case DELETE_SALESLOG_ERROR:
      return { ...state, submitLoading: false, deletelog: false };
    case POST_AUTO_SALESLOG:
      return { ...state, submitLoading: true, postautoresponse: true };
    case POST_AUTO_SALESLOG_SUCCESS:
      return { ...state, autoresponse: action.payload.response, submitLoading: false, postautoresponse: false };
    case POST_AUTO_SALESLOG_ERROR:
      return { ...state, postSalesLogError: action.payload.error, submitLoading: false, postautoresponse: false };
    case POST_TEMPORARY_SALESLOG:
      return { ...state, submitLoading: true, posttempres: true };
    case POST_TEMPORARY_SALESLOG_SUCCESS:
      return { ...state, postTemporarySalesLogResponse: action.payload.response, submitLoading: false, posttempres: false };
    case POST_TEMPORARY_SALESLOG_ERROR:
      return { ...state, postTemporarySalesLogError: action.payload.error, submitLoading: false, posttempres: false };
    case SELECT_USER_LIST:
      return { ...state, submitLoading: true, userlistresponse: false };
    case SELECT_USER_LIST_SUCCESS:
      return { ...state, userlist: action.payload.response.message, submitLoading: false, userlistresponse: true };
    case SELECT_USER_LIST_ERROR:
      return { ...state, userlisterror: action.payload.error, submitLoading: false, userlistresponse: false };
    case GET_TEMPORARY_LISTS:
      return { ...state };
    case GET_TEMPORARY_LISTS_SUCCESS:
      return { ...state, temporaryLoglists: action.payload.response.message };
    case GET_TEMPORARY_LISTS_ERROR:
      return { ...state, temporaryLoglisterror: action.payload.error };
    case GET_TEMPORARY_LIST:
      return { ...state, submitLoading: true, temporaryloglistresponse: true, tempodone: true };
    case GET_TEMPORARY_LIST_SUCCESS:
      return { ...state, temporaryLoglist: action.payload.response.message[0][0], temporaryloglistresponse: false, tempodone: true };
    case GET_TEMPORARY_LIST_ERROR:
      return { ...state, temporaryLoglisterror: action.payload.error, submitLoading: false, temporaryloglistresponse: false, tempodone: false };
    case DELETE_TEMPORARY_LOG:
      return { ...state, submitLoading: true, deletetempresponse: false };
    case DELETE_TEMPORARY_LOG_SUCCESS:
      return { ...state, deletetemporaryLogresponse: action.payload.response.message.fieldCount, deletetempresponse: true };
    case DELETE_TEMPORARY_LOG_ERROR:
      return { ...state, deletetempresponse: false };
    //영업일지 불러오기 관련
    case GET_SALESLOGS:
      return { ...state, loadLogsLoading: true, loadLogsDone: false, StoredData: action.payload };
    case GET_SALESLOGS_SUCCESS:
      return { ...state, loadLogsLoading: false, loadLogsDone: true, loglist: action.payload.response.message[0], loglistcount: action.payload.response.message[1][0].totalCnt };
    case GET_SALESLOGS_ERROR:
      return { ...state, loadLogsLoading: false, logresponse: false, loadLogsDone: false };
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
      return { ...state, commentres: false };
    case POST_COMMENT_SUCCESS:
      return { ...state, comment: action.payload.response.message.insertId, commentres: true };
    case POST_COMMENT_ERROR:
      return { ...state, commentres: false };
    case PUT_COMMENT:
      return { ...state, comcgresponse: false };
    case PUT_COMMENT_SUCCESS:
      return { ...state, commentchange: action.payload.response.message, comcgresponse: true };
    case PUT_COMMENT_ERROR:
      return { ...state, comcgresponse: false };
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
    //공동작성자
    case PUT_COUSER:
      return { ...state, putcouserloading: false, putcouser: false };
    case PUT_COUSER_SUCCESS:
      return { ...state, putcouserloading: true, putcouser: true };
    case PUT_COUSER_ERROR:
      return { ...state, putcouserloading: false, putcouser: false };
    case DELETE_COUSER:
      return { ...state, deletecouserloading: false, deletecouser: false };
    case DELETE_COUSER_SUCCESS:
      return { ...state, deletecouserloading: true, deletecouser: true };
    case DELETE_COUSER_ERROR:
      return { ...state, deletecouserloading: false, deletecouser: false };

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