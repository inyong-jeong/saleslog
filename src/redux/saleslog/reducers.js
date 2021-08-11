import {
  POST_SALESLOG,
  POST_TRIP_SALESLOG,
  PUT_SALESLOG,
  GET_SALESLOG,
  GET_SALESLOGS,
  GET_NOTABLE_SALESLOGS,
  CONCAT_LOG,
  GET_SALESLOG_COMMENT,
  POST_COMMENT,
  DELETE_SALESLOG,
  DELETE_GROUP_NOTIFICATION_SUCCESS,
  // POST_SALESLOG_FILE,
  // POST_SALESLOG_FILE_SUCCESS,
  CLEAR_SALESLOG,
  CLEAR_SALESLOGS,
  CLEAR_POST_SALESLOG_RESPONSE,
  SEARCH_SALESLOG,
  UPDATE_SEARCHED_SALESLOG_SUCCESS,
  GET_SEARCH_SALESLOG,
  GET_STAT_TYPE1,
  GET_STAT_TYPE2,
  GET_STAT_TYPE3,
  GET_STAT_TYPE4,
  GET_STAT_TYPE5,
  GET_USERS,
  PUT_SALESLOG_COUSER,
  // PUT_SALESLOG_COUSER_SUCCESS,
  // PUT_SALESLOG_COUSER_ERROR,
  PUT_SALESLOG_GUIDE,
  // PUT_SALESLOG_GUIDE_SUCCESS,
  // PUT_SALESLOG_GUIDE_ERROR,
  DELETE_SALESLOG_GUIDE,
  // DELETE_SALESLOG_SUCCESS,
  // DELETE_SALESLOG_GUIDE_ERROR,
  GET_SALESLOG_NEEDS,
  // GET_SALESLOG_NEEDS_SUCCESS,
  // GET_SALESLOG_NEEDS_ERROR

} from '../../constants/actionTypes';

const INIT_STATE = {
  commentLoading: true,
  selectedSalesLog: null,
  loading: true,
  submitLoading: false,
  salesLogLoading: true,
  salesLogListLoading: true,
  salesLogFilterLoading: true,
  salesLogSearchedList: [],
  notableSalesLogList: [],
  postSalesLogResponse: null,
  putSalesLogResponse: null,
  deleteSalesLogResponse: null,
  postCommentsResponse: null,
  notiDeleteResponse: null,
  comments: [],
  salesLogReport1: [],
  salesLogReport2: [],
  salesLogReport3: [],
  salesLogReport4: [],
  salesLogReport5: [],
  searchsalesLogList: null,
  userList: [],
  putSalesLogCoUserResponse: false,
  putSalesLogGuideResponse: null,
  deleteSalesLogGuideResponse: null
};

const SalesLog = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    case POST_SALESLOG:
      return { ...state, submitLoading: true };
    case 'POST_SALESLOG_SUCCESS':
      return { ...state, postSalesLogResponse: action.payload.response, submitLoading: false };
    case 'POST_SALESLOG_ERROR':
      return { ...state, postSalesLogError: action.payload.error, submitLoading: false };
    case POST_TRIP_SALESLOG:
      return { ...state, submitLoading: true };
    case 'POST_TRIP_SALESLOG_SUCCESS':
      return { ...state, postSalesLogResponse: action.payload.response, submitLoading: false };
    case 'POST_TRIP_SALESLOG_ERROR':
      return { ...state, postSalesLogError: action.payload.error, submitLoading: false };
    case PUT_SALESLOG:
      return { ...state, submitLoading: true };
    case 'PUT_SALESLOG_SUCCESS':
      return { ...state, putSalesLogResponse: action.payload.response, submitLoading: false };
    case GET_SALESLOGS:
      return { ...state, salesLogListLoading: true };
    case 'GET_SALESLOGS_SUCCESS':
      return { ...state, salesLogList: action.payload.response, salesLogListLoading: false };
    case CONCAT_LOG:
      return { ...state, salesLogList: [...state.salesLogList].concat(action.payload.response), salesLogListLoading: false };
    case GET_SALESLOG:
      return { ...state, salesLogLoading: true };
    case 'GET_SALESLOG_SUCCESS':
      return { ...state, salesLog: action.payload.response, salesLogLoading: false };
    case 'GET_SALESLOG_ERROR':
      return { ...state, salesLogError: action.payload.error, salesLogLoading: false };
    case GET_NOTABLE_SALESLOGS:
      return { ...state };
    case 'GET_NOTABLE_SALESLOGS_SUCCESS':
      return { ...state, notableSalesLogList: action.payload.response };
    case 'GET_NOTABLE_SALESLOGS_ERROR':
      return { ...state, notableSalesLogError: action.payload.error };
    case GET_SALESLOG_COMMENT:
      return { ...state, commentLoading: true };
    case 'GET_SALESLOG_COMMENT_SUCCESS':
      return { ...state, comments: action.payload.response, commentLoading: false };
    case DELETE_SALESLOG:
      return { ...state, deleteLoading: true };
    case 'DELETE_SALESLOG_SUCCESS':
      return { ...state, deleteSalesLogResponse: true, deleteLoading: false };
    case POST_COMMENT:
      return { ...state };
    case 'POST_COMMENT_SUCCESS':
      return { ...state, postCommentsResponse: action.payload.response };
    case DELETE_GROUP_NOTIFICATION_SUCCESS:
      return { ...state, notiDeleteResponse: action.payload.response };
    case 'POST_SALESLOG_FILE_SUCCESS':
      return { ...state, postFileResponse: action.payload.response };
    case 'POST_SALESLOG_FILE_ERROR':
      return { ...state, postFileError: action.payload.error };
    case 'POST_SALESLOG_FILE_URL_SUCCESS':
      return { ...state, postFileUrl: action.payload.response };
    case 'POST_SALESLOG_FILE_URL_ERROR':
      return { ...state, postFileUrlError: action.payload.error };
    case GET_STAT_TYPE1:
      return { ...state, salesLogReportLoading: true };
    case 'GET_STAT_TYPE1_SUCCESS':
      return { ...state, salesLogReport1: action.payload.response, salesLogReportLoading: false };
    case GET_STAT_TYPE2:
      return { ...state, salesLogReportLoading: true };
    case 'GET_STAT_TYPE2_SUCCESS':
      return { ...state, salesLogReport2: action.payload.response, salesLogReportLoading: false };
    case GET_STAT_TYPE3:
      return { ...state, salesLogReportLoading: true };
    case 'GET_STAT_TYPE3_SUCCESS':
      return { ...state, salesLogReport3: action.payload.response, salesLogReportLoading: false };
    case GET_STAT_TYPE4:
      return { ...state, salesLogReportLoading: true };
    case 'GET_STAT_TYPE4_SUCCESS':
      return { ...state, salesLogReport4: action.payload.response, salesLogReportLoading: false };
    case GET_STAT_TYPE5:
      return { ...state, salesLogReportLoading: true };
    case 'GET_STAT_TYPE5_SUCCESS':
      return { ...state, salesLogReport5: action.payload.response, salesLogReportLoading: false };
    case CLEAR_SALESLOG:
      return { ...state, salesLog: undefined, salesLogLoading: true };
    case CLEAR_POST_SALESLOG_RESPONSE:
      return { ...state, postSalesLogResponse: null }
    case CLEAR_SALESLOGS:
      return { ...state, salesLogList: [], salesLogLoading: true };
    case SEARCH_SALESLOG:
      return { ...state, keyword: action.payload.keyword };
    case UPDATE_SEARCHED_SALESLOG_SUCCESS:
      return { ...state, salesLogSearchedList: action.payload.salesLogSearchedList }
    case GET_SEARCH_SALESLOG:
      return { ...state };
    case 'GET_SEARCH_SALESLOG_SUCCESS':
      return { ...state, searchsalesLogList: action.payload.response };
    case 'GET_SEARCH_SALESLOG_ERROR':
      return { ...state, searchsalesLogList: action.payload.error };
    case GET_USERS:
      return { ...state };
    case 'GET_USERS_SUCCESS':
      return { ...state, userList: action.payload.response };
    case 'GET_USERS_ERROR':
      return { ...state, userList: action.payload.error };
    case PUT_SALESLOG_COUSER:
      return { ...state };
    case 'PUT_SALESLOG_COUSER_SUCCESS':
      return { ...state, putSalesLogCoUserResponse: true };
    case 'PUT_SALESLOG_COUSER_ERROR':
      return { ...state, putSalesLogCoUserResponse: action.payload.error };
    case PUT_SALESLOG_GUIDE:
      return { ...state };
    case 'PUT_SALESLOG_GUIDE_SUCCESS':
      return { ...state, putSalesLogGuideResponse: action.payload.response };
    case 'PUT_SALESLOG_GUIDE_ERROR':
      return { ...state, putSalesLogGuideResponse: action.payload.error };
    case DELETE_SALESLOG_GUIDE:
      return { ...state };
    case 'DELETE_SALESLOG_GUIDE_SUCCESS':
      return { ...state, deleteSalesLogGuideResponse: action.payload.response };
    case 'DELETE_SALESLOG_GUIDE_ERROR':
      return { ...state, deleteSalesLogGuideResponse: action.payload.error };
    case GET_SALESLOG_NEEDS:
      return { ...state };
    case 'GET_SALESLOG_NEEDS_SUCCESS':
      return { ...state, getSalesLogNeedsResponse: action.payload.response };
    case 'GET_SALESLOG_NEEDS_ERROR':
      return { ...state, getSalesLogNeedsResponse: action.payload.error };
    default:
      return { ...state };
  }
};

export default SalesLog;