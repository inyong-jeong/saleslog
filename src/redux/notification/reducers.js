import {
  GET_NOTIFICATIONS
} from 'constants/actionTypes';

const INIT_STATE = {
  notifications: [],
  entityNoti: []
};

const Notification = (state=INIT_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state };
    case 'GET_NOTIFICATIONS_SUCCESS':
      return { ...state, notifications: action.payload.response };
    case 'GET_NOTIFICATIONS_ERROR':
      return { ...state, error: action.payload.error};
    case 'GET_ENTITY_NOTIFICATIONS_SUCCESS':
      return { ...state, entityNoti: action.payload.response };
    default:
      return { ...state };
  }
};

export default Notification;