import {
  GET_NOTIFICATION,
  POST_NOTIFICATION_SETTING

} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getNotificationLists = fetchActionGenerator(GET_NOTIFICATION, 'body');
export const postNotificationSetting = fetchActionGenerator(POST_NOTIFICATION_SETTING, 'body')