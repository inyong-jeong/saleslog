import {
  GET_CALENDAR_LISTS,
  GET_CALENDAR_LIST,
  POST_CALENDAR,
  PUT_CALENDAR,
  DELETE_CALENDAR

} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getCalendarLists = fetchActionGenerator(GET_CALENDAR_LISTS, 'body');
export const getCalendarList = fetchActionGenerator(GET_CALENDAR_LIST, 'body');
export const postCalendar = fetchActionGenerator(POST_CALENDAR, 'body');
export const putCalendar = fetchActionGenerator(PUT_CALENDAR, 'body');
export const deleteCalendar = fetchActionGenerator(DELETE_CALENDAR, 'body');
