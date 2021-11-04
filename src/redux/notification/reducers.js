import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_ERROR,
  GET_NOTIFICATION_SUCCESS
} from '../../constants/actionTypes'

const initialState = {
  getNotificationsResponse: null,
  notificationLists: null,
  isLoading: false,
}

const Notification = (state = initialState, action) => {

  switch (String(action.type)) {
    case GET_NOTIFICATION:
      return { ...state, getNotificationsResponse: null, isLoading: true }
    case GET_NOTIFICATION_SUCCESS:
      return { ...state, getNotificationsResponse: true, notificationLists: action.payload.response.message, isLoading: false }
    case GET_NOTIFICATION_ERROR:
      return { ...state, getNotificationsResponse: false, notificationLists: null, isLoading: false }

    default: return { ...state }
  }
}
export default Notification;
