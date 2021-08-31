import {
  POST_SALESLOG,
  POST_SALESLOG_SUCCESS,
  POST_SALESLOG_ERROR,
  POST_TEMPORARY_SALESLOG,
  POST_TEMPORARY_SALESLOG_SUCCESS,
  POST_TEMPORARY_SALESLOG_ERROR
} from '../../constants/actionTypes';

const INIT_STATE = {
  submitLoading: false,
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
    default:
      return { ...state };
  }
};

export default SalesLog;