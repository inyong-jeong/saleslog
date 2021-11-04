import {
  GET_NOTIFICATION,

} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getNotificationLists = fetchActionGenerator(GET_NOTIFICATION, 'body');