import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_ERROR,
  GET_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_SETTING,
  POST_NOTIFICATION_SETTING_SUCCESS,
  POST_NOTIFICATION_SETTING_ERROR,
  POST_NOTIFICATION_BEDGE,
  POST_NOTIFICATION_BEDGE_SUCCESS,
  POST_NOTIFICATION_BEDGE_ERROR

} from '../../constants/actionTypes'

const initialState = {
  getNotificationsResponse: null,
  notificationLists: null,
  isLoading: false,
  postNotificationResponse: null,
  notiBadge: null
}

const Notification = (state = initialState, action) => {

  switch (String(action.type)) {
    case GET_NOTIFICATION:
      return { ...state, getNotificationsResponse: null, isLoading: true }
    case GET_NOTIFICATION_SUCCESS:
      return { ...state, getNotificationsResponse: true, notificationLists: action.payload.response.message, isLoading: false }
    case GET_NOTIFICATION_ERROR:
      return { ...state, getNotificationsResponse: false, isLoading: false }

    case POST_NOTIFICATION_SETTING:
      return { ...state, postNotificationResponse: null, isLoading: true }
    case POST_NOTIFICATION_SETTING_SUCCESS:
      return { ...state, postNotificationResponse: true, isLoading: false }
    case POST_NOTIFICATION_SETTING_ERROR:
      return { ...state, postNotificationResponse: null, isLoading: false }

    case POST_NOTIFICATION_BEDGE:
      return { ...state, notiBadge: null, isLoading: true }
    case POST_NOTIFICATION_BEDGE_SUCCESS:
      return { ...state, notiBadge: action.payload.response.message[0], isLoading: false }
    case POST_NOTIFICATION_BEDGE_ERROR:
      return { ...state, notiBadge: null, isLoading: false }

    default: return { ...state }
  }
}
export default Notification;
