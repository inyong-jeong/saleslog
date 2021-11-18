import {
  GET_NOTIFICATION,
  POST_NOTIFICATION_SETTING,
  POST_NOTIFICATION_BEDGE

} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getNotificationLists = fetchActionGenerator(GET_NOTIFICATION, 'body');
export const postNotificationSetting = fetchActionGenerator(POST_NOTIFICATION_SETTING, 'body')
export const postNotificationBadge = fetchActionGenerator(POST_NOTIFICATION_BEDGE)