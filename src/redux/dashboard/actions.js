import {
  GET_SALES_STAT,
  GET_LEAD_STAT
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const getsaleslogstat = fetchActionGenerator(GET_SALES_STAT, 'body');
export const getleadlogstat = fetchActionGenerator(GET_LEAD_STAT, 'body');
