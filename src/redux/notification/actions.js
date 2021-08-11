import {
  GET_NOTIFICATIONS,
  GET_ENTITY_NOTIFICATIONS,
  PUT_NOTIFICATION
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

// BUISNEES LOGIC
// NOTIFICATION
// - RETRIEVE
export const getNotifications = fetchActionGenerator(GET_NOTIFICATIONS, 'id', 'page');
export const putNotification = fetchActionGenerator(PUT_NOTIFICATION, 'id');
export const getEntityNotifications = fetchActionGenerator(GET_ENTITY_NOTIFICATIONS, 'id');
