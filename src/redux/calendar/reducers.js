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
  DELETE_CALENDAR_ERROR,
  CALENDAR_DATE,
  CALENDAR_EDIT_MODAL,
  CALENDAR_PLUS,
  CALENDAR_EVENT
} from '../../constants/actionTypes';

const initialState = {
  getListsRes: null,
  getListsState: false,
  getListRes: [],
  getListState: false,
  postRes: null,
  postState: false,
  putRes: null,
  putState: false,
  deleteRes: null,
  deleteState: false,
  getListPub: []
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
      return { ...state, getListRes: action.payload.response.message[0], getListPub: action.payload.response.message[1], getListState: true }
    case GET_CALENDAR_LIST_ERROR:
      return { ...state, getListState: false }
    case POST_CALENDAR:
      return { ...state, postState: false }
    case POST_CALENDAR_SUCCESS:
      return { ...state, putRes: action.payload.response.message, postState: true }
    case POST_CALENDAR_ERROR:
      return { ...state, postState: false }
    case PUT_CALENDAR:
      return { ...state, putState: false }
    case PUT_CALENDAR_SUCCESS:
      return { ...state, postRes: action.payload.response.message, putState: true }
    case PUT_CALENDAR_ERROR:
      return { ...state, putState: false }
    case DELETE_CALENDAR:
      return { ...state, deleteState: false }
    case DELETE_CALENDAR_SUCCESS:
      return { ...state, deleteRes: action.payload.response.message, deleteState: true }
    case DELETE_CALENDAR_ERROR:
      return { ...state, deleteState: false }
    //캘린더 날짜 상태
    case CALENDAR_DATE:
      return { ...state, ClickDate: action.payload }
    case CALENDAR_EDIT_MODAL:
      return { ...state, ModalVisible: action.payload }
    case CALENDAR_PLUS:
      return { ...state, CalendarPlus: action.payload }
    case CALENDAR_EVENT:
      return { ...state, CalendarEvent: action.payload }
    default:
      return { ...state };
  }
}
export default Calendar;