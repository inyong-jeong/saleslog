import {
  GET_CALENDAR_LISTS,
  GET_CALENDAR_LISTS_ERROR,
  GET_CALENDAR_LISTS_SUCCESS,
  GET_CALENDAR_LIST,
  GET_CALENDAR_LIST_ERROR,
  GET_CALENDAR_LIST_SUCCESS,
  POST_CALENDAR,
  POST_CALENDAR_SUCCESS,
  POST_CALENDAR_ERROR,
  PUT_CALENDAR,
  PUT_CALENDAR_SUCCESS,
  PUT_CALENDAR_ERROR,
  DELETE_CALENDAR,
  DELETE_CALENDAR_SUCCESS,
  DELETE_CALENDAR_ERROR
} from '../../constants/actionTypes';

const initialState = {
  getListsRes: null,
  getListsState: false,
  getListRes: null,
  getListState: false,
  postRes: null,
  postState: false,
  putRes: null,
  putState: false,
  deleteRes: null,
  deleteState: false,
}

const Calendar = (state = initialState, action) => {

  switch (String(action.type)) {
    case GET_CALENDAR_LISTS:
      return { ...state, getListsState: false }
    case GET_CALENDAR_LISTS_SUCCESS:
      return { ...state, getListsRes: action.payload.response.message, getListsState: true }
    case GET_CALENDAR_LISTS_ERROR:
      return { ...state, getListsState: false }
    case GET_CALENDAR_LIST:
      return { ...state, getListState: false }
    case GET_CALENDAR_LIST_SUCCESS:
      return { ...state, getListRes: action.payload.response.message, getListState: true }
    case GET_CALENDAR_LIST_ERROR:
      return { ...state, getListState: false }
    case POST_CALENDAR:
      return { ...state, postState: false }
    case POST_CALENDAR_SUCCESS:
      return { ...state, putRes: action.payload.response.message, postState: false }
    case POST_CALENDAR_ERROR:
      return { ...state, postState: false }
    case PUT_CALENDAR:
      return { ...state, putState: false }
    case PUT_CALENDAR_SUCCESS:
      return { ...state, postRes: action.payload.response.message, putState: false }
    case PUT_CALENDAR_ERROR:
      return { ...state, putState: false }
    case DELETE_CALENDAR:
      return { ...state, deleteState: false }
    case DELETE_CALENDAR_SUCCESS:
      return { ...state, deleteRes: action.payload.response.message, deleteState: false }
    case DELETE_CALENDAR_ERROR:
      return { ...state, deleteState: false }
    default:
      return { ...state };
  }
}
export default Calendar;