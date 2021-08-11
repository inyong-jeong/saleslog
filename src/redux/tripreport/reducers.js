import {
  GET_TRIPS_SALESLOG,
  POST_TRIP_SALESLOG,
  GET_TRIP_SALESLOG,
  PUT_TRIP_SALESLOG,
  DELETE_TRIP_SALESLOG,
} from '../../constants/actionTypes';

const INIT_STATE = {
  postTripSalesLogResponse: null,
  getTripsSalesLogList: [],
  tripsalesLogLoading: true,
  // tripSalesLog: []
};

const TripReport = (state = INIT_STATE, action) => {
  switch (String(action.type)) {
    case GET_TRIPS_SALESLOG:
      return { ...state, submitLoading: true };
    case 'GET_TRIPS_SALESLOG_SUCCESS':
      return { ...state, getTripsSalesLogList: action.payload.response, submitLoading: false };
    case 'GET_TRIPS_SALESLOG_ERROR':
      return { ...state, getTripsSalesLogError: action.payload.error, submitLoading: false };
    case POST_TRIP_SALESLOG:
      return { ...state, submitLoading: true };
    case 'POST_TRIP_SALESLOG_SUCCESS':
      return { ...state, postTripSalesLogResponse: action.payload.response, submitLoading: false };
    case 'POST_TRIP_SALESLOG_ERROR':
      return { ...state, postTripSalesLogError: action.payload.error, submitLoading: false };
    case GET_TRIP_SALESLOG:
      return { ...state, tripsalesLogLoading: true };
    case 'GET_TRIP_SALESLOG_SUCCESS':
      return { ...state, tripSalesLog: action.payload.response, tripsalesLogLoading: false };
    case 'GET_TRIP_SALESLOG_ERROR':
      return { ...state, getSalesLogError: action.payload.error, tripsalesLogLoading: false };
    case PUT_TRIP_SALESLOG:
      return { ...state, submitLoading: true };
    case 'PUT_TRIP_SALESLOG_SUCCESS':
      return { ...state, putTripSalesLogResponse: action.payload.response, submitLoading: false };
    case 'PUT_TRIP_SALESLOG_ERROR':
      return { ...state, putTripSalesLogError: action.payload.error, submitLoading: false };
    case DELETE_TRIP_SALESLOG:
      return { ...state, submitLoading: true };
    case 'DELETE_TRIP_SALESLOG_SUCCESS':
      return { ...state, deleteTripSalesLogResponse: action.payload.response, submitLoading: false };
    case 'DELETE_TRIP_SALESLOG_ERROR':
      return { ...state, deleteTripSalesLogError: action.payload.error, submitLoading: false };
    default:
      return { ...state };
  }
};

export default TripReport;