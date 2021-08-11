
import {
  GET_TRIPS_SALESLOG,
  POST_TRIP_SALESLOG,
  GET_TRIP_SALESLOG,
  PUT_TRIP_SALESLOG,
  DELETE_TRIP_SALESLOG
} from 'constants/actionTypes';

import { fetchActionGenerator } from '../utils';

// BUISNEES LOGIC
// SALES_LOG

// - CREATE
export const getTripsSalesLog = fetchActionGenerator(GET_TRIPS_SALESLOG, 'fromDate', 'toDate');
export const postTripSalesLog = fetchActionGenerator(POST_TRIP_SALESLOG, 'body');
export const getTripSalesLog = fetchActionGenerator(GET_TRIP_SALESLOG, 'id');
export const putTripSalesLog = fetchActionGenerator(PUT_TRIP_SALESLOG, 'body');
export const deleteTripSalesLog = fetchActionGenerator(DELETE_TRIP_SALESLOG, 'id');
